import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Mock the server Supabase lib so no real network/DB is touched.
const upsertMock = vi.fn();
vi.mock("@/lib/supabase", () => ({
  isWaitlistConfigured: vi.fn(() => true),
  getServiceClient: vi.fn(() => ({ from: () => ({ upsert: upsertMock }) })),
}));

// Mock the email sender (deferred reference, matching the supabase pattern above).
const sendEmailMock = vi.fn();
vi.mock("@/lib/resend", () => ({
  sendConfirmationEmail: (...args: unknown[]) => sendEmailMock(...args),
}));

import { __resetRateLimit } from "@/lib/ratelimit";
import * as supabase from "@/lib/supabase";
import { POST } from "./route";

function post(body: unknown, headers: Record<string, string> = {}) {
  return POST(
    new Request("http://localhost/api/waitlist", {
      method: "POST",
      headers: { "content-type": "application/json", ...headers },
      body: JSON.stringify(body),
    })
  );
}

const valid = { email: "a@b.com", consent: true, city: "barcelona" };

beforeEach(() => {
  __resetRateLimit();
  upsertMock.mockReset().mockResolvedValue({ error: null });
  sendEmailMock.mockReset().mockResolvedValue({ sent: true });
  vi.mocked(supabase.isWaitlistConfigured).mockReturnValue(true);
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("POST /api/waitlist", () => {
  it("stores a valid signup", async () => {
    const res = await post(valid, { "x-forwarded-for": "1.1.1.1" });
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toMatchObject({ ok: true });
    expect(upsertMock).toHaveBeenCalledOnce();
  });

  it("rejects false consent (422) without inserting", async () => {
    const res = await post({ email: "a@b.com", consent: false }, { "x-forwarded-for": "2.2.2.2" });
    expect(res.status).toBe(422);
    expect(upsertMock).not.toHaveBeenCalled();
  });

  it("rejects an invalid email (422)", async () => {
    const res = await post({ email: "nope", consent: true }, { "x-forwarded-for": "3.3.3.3" });
    expect(res.status).toBe(422);
  });

  it("silently accepts a honeypot hit without inserting", async () => {
    const res = await post({ ...valid, company: "spam-bot" }, { "x-forwarded-for": "4.4.4.4" });
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toMatchObject({ ok: true });
    expect(upsertMock).not.toHaveBeenCalled();
  });

  it("returns 503 when the waitlist isn't configured", async () => {
    vi.mocked(supabase.isWaitlistConfigured).mockReturnValue(false);
    const res = await post(valid, { "x-forwarded-for": "5.5.5.5" });
    expect(res.status).toBe(503);
    expect(upsertMock).not.toHaveBeenCalled();
  });

  it("single opt-in (default): stores confirmed and returns state 'joined'", async () => {
    const res = await post(valid, { "x-forwarded-for": "8.8.8.8" });
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toMatchObject({ ok: true, state: "joined" });
    expect(upsertMock.mock.calls[0][0]).toMatchObject({ confirmed: true });
    expect(sendEmailMock).not.toHaveBeenCalled();
  });

  it("double opt-in (flag on): stores unconfirmed, emails a token, returns 'confirm_sent'", async () => {
    vi.stubEnv("WAITLIST_DOUBLE_OPTIN", "true");
    const res = await post({ email: "c@d.com", consent: true }, { "x-forwarded-for": "9.9.9.9" });
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toMatchObject({ ok: true, state: "confirm_sent" });
    const row = upsertMock.mock.calls[0][0];
    expect(row).toMatchObject({ email: "c@d.com", confirmed: false });
    expect(typeof row.confirm_token).toBe("string");
    expect(sendEmailMock).toHaveBeenCalledOnce();
  });

  it("rate-limits repeated attempts from the same IP (429)", async () => {
    const ip = { "x-forwarded-for": "6.6.6.6" };
    for (let i = 0; i < 5; i++) {
      const ok = await post(valid, ip);
      expect(ok.status).toBe(200);
    }
    const blocked = await post(valid, ip);
    expect(blocked.status).toBe(429);
  });
});
