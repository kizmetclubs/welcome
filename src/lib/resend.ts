import { Resend } from "resend";

/**
 * Sends the double-opt-in confirmation email (spec §6.3). Best-effort: if Resend isn't
 * configured (no API key), it no-ops and reports it, so a signup is still captured even
 * when email isn't wired up yet. Gated by WAITLIST_DOUBLE_OPTIN in the route — off until
 * a domain + verified sender exist.
 */
export interface SendResult {
  sent: boolean;
  reason?: string;
}

export async function sendConfirmationEmail(params: {
  to: string;
  token: string;
  siteUrl: string;
}): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return { sent: false, reason: "not_configured" };

  const from = process.env.RESEND_FROM?.trim() || "Kizmet <onboarding@resend.dev>";
  const confirmUrl = `${params.siteUrl}/confirm?token=${encodeURIComponent(params.token)}`;

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: params.to,
    subject: "Confirm your spot on the Kizmet waitlist",
    text: `You're almost in. Confirm your email to lock in your spot on the Kizmet waitlist:\n\n${confirmUrl}\n\nIf you didn't sign up, you can ignore this email.`,
    html: `<div style="font-family:system-ui,sans-serif;max-width:480px;margin:0 auto;color:#1c2b28">
      <h1 style="font-size:22px">You're almost in.</h1>
      <p>Confirm your email to lock in your spot on the Kizmet waitlist.</p>
      <p><a href="${confirmUrl}" style="display:inline-block;background:#cd500d;color:#fff;padding:12px 22px;border-radius:999px;text-decoration:none;font-weight:700">Confirm my spot</a></p>
      <p style="color:#6d7e79;font-size:13px">If you didn't sign up, you can ignore this email.</p>
    </div>`,
  });

  if (error) return { sent: false, reason: error.message };
  return { sent: true };
}
