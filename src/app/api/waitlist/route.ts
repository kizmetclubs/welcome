import { createHash, randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/ratelimit";
import { sendConfirmationEmail } from "@/lib/resend";
import { getSiteUrl } from "@/lib/siteUrl";
import { getServiceClient, isWaitlistConfigured } from "@/lib/supabase";
import { waitlistSchema } from "@/lib/validation";

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

  // Honeypot: a hidden field only bots fill. Pretend success so we don't tip them off.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true, state: "joined" });
  }

  // Min time-to-submit: a form completed in under 2s is almost certainly automated.
  const startedAt = Number(body.startedAt);
  if (Number.isFinite(startedAt) && Date.now() - startedAt < 2000) {
    return NextResponse.json({ ok: true, state: "joined" });
  }

  const parsed = waitlistSchema.safeParse(body);
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Please check your details.";
    return NextResponse.json({ ok: false, error: message }, { status: 422 });
  }

  const limit = rateLimit(`waitlist:${clientIpHash(req)}`);
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Please try again in a moment." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } }
    );
  }

  // Built but not yet wired to a Supabase project — don't 500, tell the visitor kindly.
  if (!isWaitlistConfigured()) {
    return NextResponse.json(
      { ok: false, error: "The waitlist isn't open just yet — check back soon." },
      { status: 503 }
    );
  }

  const supabase = getServiceClient();
  if (!supabase) {
    return NextResponse.json({ ok: false, error: "Waitlist unavailable." }, { status: 503 });
  }

  const { email, consent, city } = parsed.data;
  // Only keep the free-text place when the visitor actually picked "Somewhere else".
  const otherPlace = city === "other" ? parsed.data.otherPlace : null;
  const doubleOptIn = process.env.WAITLIST_DOUBLE_OPTIN === "true";

  if (doubleOptIn) {
    // Store unconfirmed with a fresh single-use token, then email a confirmation link.
    const token = randomUUID();
    const { error } = await supabase.from("waitlist_signups").upsert(
      {
        email,
        consent,
        city: city ?? null,
        other_place: otherPlace,
        source: "landing",
        confirmed: false,
        confirm_token: token,
      },
      { onConflict: "email" }
    );
    if (error) {
      console.error("waitlist insert error", error);
      return NextResponse.json(
        { ok: false, error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }
    // Best-effort: the signup is captured even if the email fails to send.
    const result = await sendConfirmationEmail({ to: email, token, siteUrl: getSiteUrl() });
    if (!result.sent) console.warn("confirmation email not sent:", result.reason);
    return NextResponse.json({ ok: true, state: "confirm_sent" });
  }

  // Single opt-in: explicit consent is the lawful basis; store as confirmed immediately.
  const { error } = await supabase.from("waitlist_signups").upsert(
    {
      email,
      consent,
      city: city ?? null,
      other_place: otherPlace,
      source: "landing",
      confirmed: true,
    },
    { onConflict: "email", ignoreDuplicates: true } // duplicate signup = idempotent no-op
  );
  if (error) {
    console.error("waitlist insert error", error);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, state: "joined" });
}
