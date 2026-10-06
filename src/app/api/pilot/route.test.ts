import { beforeEach, describe, expect, it, vi } from "vitest";

const upsertMock = vi.fn();
vi.mock("@/lib/supabase", () => ({
  isWaitlistConfigured: vi.fn(() => true),
  getServiceClient: vi.fn(() => ({ from: () => ({ upsert: upsertMock }) })),
}));

import { pilots } from "@/content/pilot";
import { __resetRateLimit } from "@/lib/ratelimit";
import * as supabase from "@/lib/supabase";
import { POST } from "./route";

function post(body: unknown, ip = "1.1.1.1") {
  return POST(
    new Request("http://localhost/api/pilot", {
      method: "POST",
      headers: { "content-type": "application/json", "x-forwarded-for": ip },
      body: JSON.stringify(body),
    })
  );
}

const valid = {
  firstName: "Ana",
  email: "Ana@Example.com",
  whatsapp: "+34 600 000 000",
  city: "barcelona",
  neighborhood: "Gràcia",
  bothDates: true,
  consent: true,
  source: "flyer-gracia",
};

beforeEach(() => {
  __resetRateLimit();
  upsertMock.mockReset().mockResolvedValue({ error: null });
  vi.mocked(supabase.isWaitlistConfigured).mockReturnValue(true);
});

describe("POST /api/pilot", () => {
  it("stores a valid sign-up with the city's club and the channel", async () => {
    const res = await post(valid);
    expect(res.status).toBe(200);
    const row = upsertMock.mock.calls[0][0];
    expect(row).toMatchObject({
      first_name: "Ana",
      email: "ana@example.com",
      city: "barcelona",
      club: pilots.barcelona.club.name,
      both_dates: true,
      source: "flyer-gracia",
    });
    expect(upsertMock.mock.calls[0][1]).toMatchObject({ onConflict: "email,city" });
  });

  it("rejects a missing city (422) without inserting", async () => {
    const res = await post({ ...valid, city: "paris" }, "2.2.2.2");
    expect(res.status).toBe(422);
    expect(upsertMock).not.toHaveBeenCalled();
  });

  it("rejects false consent and a bad WhatsApp number (422)", async () => {
    expect((await post({ ...valid, consent: false }, "3.3.3.3")).status).toBe(422);
    expect((await post({ ...valid, whatsapp: "call me" }, "3.3.3.4")).status).toBe(422);
  });

  it("silently accepts a honeypot hit without inserting", async () => {
    const res = await post({ ...valid, company: "bot" }, "4.4.4.4");
    expect(res.status).toBe(200);
    expect(upsertMock).not.toHaveBeenCalled();
  });

  it("returns 503 when Supabase isn't configured", async () => {
    vi.mocked(supabase.isWaitlistConfigured).mockReturnValue(false);
    expect((await post(valid, "5.5.5.5")).status).toBe(503);
  });

  it("rate-limits repeated attempts from one IP (429)", async () => {
    for (let i = 0; i < 5; i++) expect((await post(valid, "6.6.6.6")).status).toBe(200);
    expect((await post(valid, "6.6.6.6")).status).toBe(429);
  });
});
