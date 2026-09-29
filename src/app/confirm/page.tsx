import type { Metadata } from "next";
import Link from "next/link";
import { ConfirmTracker } from "@/components/ConfirmTracker";
import { Container, Heading, Section, Text } from "@/components/primitives";
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
    <main>
      <Section tone="canvas" spacing="lg">
        <Container size="prose" className="text-center">
          {confirmed ? (
            <>
              <ConfirmTracker />
              <Heading level={1}>You&apos;re confirmed 🎉</Heading>
              <Text size="lg" className="mx-auto mt-4 max-w-md">
                Your spot on the Kizmet waitlist is locked in. We&apos;ll email you the moment the
                app opens.
              </Text>
            </>
          ) : (
            <>
              <Heading level={1}>This link looks expired</Heading>
              <Text size="lg" className="mx-auto mt-4 max-w-md">
                It may have already been used, or the link was incomplete. Try joining the waitlist
                again and we&apos;ll send a fresh confirmation.
              </Text>
            </>
          )}
          <Text className="mt-8">
            <Link href="/" className="text-brand font-semibold underline-offset-4 hover:underline">
              ← Back to kizmet
            </Link>
          </Text>
        </Container>
      </Section>
    </main>
  );
}
