import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Container, Heading, Section, Text } from "@/components/primitives";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What Kizmet collects on the waitlist, why, and how it's handled.",
  alternates: { canonical: "/privacy" },
};

// Plain-language privacy note (spec §7). Written before we collect any real signup.
const LAST_UPDATED = "23 August 2026";

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <Section tone="canvas" spacing="lg">
          <Container size="prose">
            <Heading level={1}>Privacy, in plain language</Heading>
            <Text size="sm" tone="muted" className="mt-2">
              Last updated: {LAST_UPDATED}
            </Text>
            <Text size="lg" className="mt-6">
              This covers the Kizmet <strong>waitlist</strong> — the email form on this site. It
              doesn&apos;t cover the in-person pilots (those run through a separate Google form) or
              the future app, which will have its own policy.
            </Text>

            <div className="mt-10 space-y-8">
              <section>
                <Heading level={3} as="h2">
                  What we collect
                </Heading>
                <Text className="mt-2">
                  Your email address, an optional city (Barcelona, San Francisco, or
                  &ldquo;somewhere else&rdquo;), and the fact that you ticked the consent box.
                  That&apos;s it — no name, no precise location, no tracking of who you are.
                </Text>
              </section>

              <section>
                <Heading level={3} as="h2">
                  Why we collect it
                </Heading>
                <Text className="mt-2">
                  Only to email you when Kizmet opens, and the optional city helps us know which
                  places have the most interest. We don&apos;t use it for anything else.
                </Text>
              </section>

              <section>
                <Heading level={3} as="h2">
                  Where it lives
                </Heading>
                <Text className="mt-2">
                  In a database hosted in the EU (Frankfurt). We don&apos;t use cookies that need a
                  banner, and if we add analytics they&apos;re cookieless and never tied to your
                  identity. No third-party advertising trackers, ever.
                </Text>
              </section>

              <section>
                <Heading level={3} as="h2">
                  We never sell it
                </Heading>
                <Text className="mt-2">
                  Your email is never sold, rented, or shared for marketing. Full stop.
                </Text>
              </section>

              <section>
                <Heading level={3} as="h2">
                  Leaving the list
                </Heading>
                <Text className="mt-2">
                  Want off the list, or want your data deleted? Email us and we&apos;ll remove you —
                  no questions, no hoops. Every email we send will also include an unsubscribe link.
                </Text>
              </section>

              <section>
                <Heading level={3} as="h2">
                  Your rights
                </Heading>
                <Text className="mt-2">
                  Kizmet is being built by a team in the EU and the US, so we follow GDPR: you can
                  ask what we hold about you, have it corrected, or have it deleted. Just get in
                  touch.
                </Text>
              </section>

              <section>
                <Heading level={3} as="h2">
                  Contact
                </Heading>
                <Text className="mt-2">
                  Questions about any of this? {site.footer.contactEmail}
                </Text>
              </section>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
