import type { Metadata } from "next";
import Link from "next/link";
import { ConfirmTracker } from "@/components/ConfirmTracker";
import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";
import { getServiceClient, isWaitlistConfigured } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Confirm your email",
  robots: { index: false, follow: false },
};

/**
 * Double-opt-in confirmation landing (spec §6.3). Clicking the emailed link lands here;
 * we flip the matching row to confirmed and clear the single-use token. Reachable only
 * when WAITLIST_DOUBLE_OPTIN is on.
 */
async function confirmToken(token: string): Promise<boolean> {
  if (!token || !isWaitlistConfigured()) return false;
  const supabase = getServiceClient();
  if (!supabase) return false;
  const { data, error } = await supabase
    .from("waitlist_signups")
    .update({ confirmed: true, confirmed_at: new Date().toISOString(), confirm_token: null })
    .eq("confirm_token", token)
    .select("id");
  return !error && Array.isArray(data) && data.length > 0;
}

export default async function ConfirmPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string | string[] }>;
}) {
  const params = await searchParams;
  const token = typeof params.token === "string" ? params.token : "";
  const confirmed = await confirmToken(token);

  return (
    <>
      <SiteHeader />
      <main id="top">
        <section style={{ padding: "56px 0 96px" }}>
          <div className="in">
            {/* A confirmation is a celebration: the signature checker, copy on white. */}
            <div className="ck plate">
              <div
                className="card stack"
                style={{
                  position: "relative",
                  maxWidth: 640,
                  margin: "0 auto",
                  padding: "clamp(32px,6vw,64px) clamp(24px,5vw,56px)",
                  gap: 20,
                  alignItems: "center",
                  textAlign: "center",
                  boxShadow: "none",
                }}
              >
                {confirmed ? (
                  <>
                    <ConfirmTracker />
                    <span className="e tw sparkle" aria-hidden="true">
                      M
                    </span>
                    <h1 className="h1" style={{ fontSize: "clamp(44px,7vw,64px)" }}>
                      You&apos;re confirmed{" "}
                      <span className="e" aria-hidden="true" style={{ fontSize: ".8em" }}>
                        k
                      </span>
                    </h1>
                    <p className="lead" style={{ maxWidth: 440 }}>
                      Your spot on the Kizmet waitlist is locked in. We&apos;ll email you the moment
                      the app opens.
                    </p>
                  </>
                ) : (
                  <>
                    <h1 className="h1" style={{ fontSize: "clamp(44px,7vw,64px)" }}>
                      This link looks expired
                    </h1>
                    <p className="lead" style={{ maxWidth: 440 }}>
                      It may have already been used, or the link was incomplete. Try joining the
                      waitlist again and we&apos;ll send a fresh confirmation.
                    </p>
                  </>
                )}
                <Link className="btn" href="/">
                  ← Back to kizmet
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
