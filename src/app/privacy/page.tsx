import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What Kizmet collects on the waitlist, why, and how it's handled.",
  alternates: { canonical: "/privacy" },
};

// Plain-language privacy note (spec §7). Written before we collect any real signup.
const LAST_UPDATED = "23 August 2026";

const ITEMS: { heading: string; body: React.ReactNode }[] = [
  {
    heading: "What we collect",
    body: (
      <>
        Your email address, an optional city (Barcelona, San Francisco, or &ldquo;somewhere
        else&rdquo;), and the fact that you ticked the consent box. That&apos;s it — no name, no
        precise location, no tracking of who you are.
      </>
    ),
  },
  {
    heading: "Why we collect it",
    body: (
      <>
        Only to email you when Kizmet opens, and the optional city helps us know which places have
        the most interest. We don&apos;t use it for anything else.
      </>
    ),
  },
  {
    heading: "Where it lives",
    body: (
      <>
        In a database hosted in the EU (Frankfurt). We don&apos;t use cookies that need a banner,
        and if we add analytics they&apos;re cookieless and never tied to your identity. No
        third-party advertising trackers, ever.
      </>
    ),
  },
  {
    heading: "We never sell it",
    body: <>Your email is never sold, rented, or shared for marketing. Full stop.</>,
  },
  {
    heading: "Leaving the list",
    body: (
      <>
        Want off the list, or want your data deleted? Email us and we&apos;ll remove you — no
        questions, no hoops. Every email we send will also include an unsubscribe link.
      </>
    ),
  },
  {
    heading: "Your rights",
    body: (
      <>
        Kizmet is being built by a team in the EU and the US, so we follow GDPR: you can ask what we
        hold about you, have it corrected, or have it deleted. Just get in touch.
      </>
    ),
  },
  {
    heading: "Contact",
    body: (
      <>
        Questions about any of this?{" "}
        <a href={`mailto:${site.footer.contactEmail}`}>{site.footer.contactEmail}</a>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <section>
          <div className="in">
            <div className="stack nar" style={{ gap: 18, margin: "0 auto" }}>
              <span className="pill stk bg-pink" style={{ alignSelf: "flex-start" }}>
                Last updated: {LAST_UPDATED}
              </span>
              <h1 className="h1" style={{ fontSize: "clamp(44px,7vw,64px)" }}>
                Privacy, in plain language
              </h1>
              <p className="lead">
                This covers the Kizmet <strong>waitlist</strong> — the email form on this site. It
                doesn&apos;t cover the in-person pilots (those run through a separate Google form)
                or the future app, which will have its own policy.
              </p>
              <div className="card stack" style={{ padding: 32, gap: 28, marginTop: 22 }}>
                {ITEMS.map((item) => (
                  <div key={item.heading} className="stack" style={{ gap: 8 }}>
                    <h2 className="h3">{item.heading}</h2>
                    <p>{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
