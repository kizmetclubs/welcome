import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { pilots } from "@/content/pilot";
import { rateLimit } from "@/lib/ratelimit";
import { getServiceClient, isWaitlistConfigured } from "@/lib/supabase";
import { pilotSignupSchema } from "@/lib/validation";

export const runtime = "nodejs";

/** Hash the client IP so we never log or key on the raw address (privacy, spec §6). */
function clientIpHash(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for") ?? "";
  const ip = fwd.split(",")[0]?.trim() || "unknown";
  return createHash("sha256").update(ip).digest("hex").slice(0, 32);
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot + min time-to-submit: same bot defenses as the waitlist. Pretend success.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }
  const startedAt = Number(body.startedAt);
  if (Number.isFinite(startedAt) && Date.now() - startedAt < 3000) {
    return NextResponse.json({ ok: true });
  }

  const parsed = pilotSignupSchema.safeParse(body);
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Please check your details.";
    return NextResponse.json({ ok: false, error: message }, { status: 422 });
  }

  const limit = rateLimit(`pilot:${clientIpHash(req)}`);
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Please try again in a moment." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } }
    );
  }

  if (!isWaitlistConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Sign-ups aren't open just yet — check back soon." },
      { status: 503 }
    );
  }
  const supabase = getServiceClient();
  if (!supabase) {
    return NextResponse.json({ ok: false, error: "Sign-ups unavailable." }, { status: 503 });
  }

  const d = parsed.data;
  const { error } = await supabase.from("pilot_signups").upsert(
    {
      first_name: d.firstName,
      email: d.email,
      whatsapp: d.whatsapp,
      city: d.city,
      neighborhood: d.neighborhood,
      club: pilots[d.city].club.name,
      both_dates: d.bothDates,
      consent: d.consent,
      source: d.source ?? null,
    },
    { onConflict: "email,city" } // re-submitting updates the same row
  );

  if (error) {
    console.error("pilot signup insert error", error);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
