import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "What Kizmet collects when you sign up for a pilot or the waitlist, why, and how it's handled.",
  alternates: { canonical: "/privacy" },
};

// Plain-language privacy note. Keep this in step with what the two forms actually collect
// (src/lib/validation.ts) — update LAST_UPDATED whenever it changes.
const LAST_UPDATED = "3 October 2026";

const ITEMS: { heading: string; body: React.ReactNode }[] = [
  {
    heading: "What we collect",
    body: (
      <>
        <strong>If you sign up for a pilot:</strong> your first name, email address, WhatsApp
        number, city, neighborhood, whether you can make both Saturdays, and the fact that you
        ticked the consent box. If you arrived through one of our links or QR codes, we also note
        which one, so we can tell which flyers and posts actually reach people.
        <br />
        <br />
        <strong>If you join the email waitlist:</strong> your email address, an optional city (and
        the place you type if you pick &ldquo;Somewhere else&rdquo;), and the fact that you ticked
        the consent box.
        <br />
        <br />
        That&apos;s it. No last name, no street address, no date of birth, no ID, and nothing pulled
        in from other accounts.
      </>
    ),
  },
  {
    heading: "Why we collect it",
    body: (
      <>
        For the pilot: to place you in a small club near you, send you the details, and reach you
        about your sessions by email or WhatsApp. Your neighborhood is only used to group people who
        live close to each other. For the waitlist: only to email you when Kizmet opens, and to see
        which cities have the most interest. We don&apos;t use any of it for anything else.
      </>
    ),
  },
  {
    heading: "Who sees it",
    body: (
      <>
        Only the four of us running Kizmet. Because a club is people meeting in person, the others
        in your group will learn your first name. If your club coordinates in a WhatsApp group,
        members of that group can see your number, as in any WhatsApp group — tell us if you&apos;d
        rather be contacted another way.
      </>
    ),
  },
  {
    heading: "Where it lives",
    body: (
      <>
        In a database hosted in the EU (Frankfurt). The site uses no cookies that need a banner. We
        count page visits with cookieless analytics that aren&apos;t tied to your identity. No
        advertising trackers, ever.
      </>
    ),
  },
  {
    heading: "How long we keep it",
    body: (
      <>
        Pilot sign-ups are kept for the pilot and the follow-up afterwards, then deleted or stripped
        of anything that identifies you. Waitlist emails are kept until Kizmet opens in your city or
        you ask us to remove you, whichever comes first.
      </>
    ),
  },
  {
    heading: "We never sell it",
    body: <>Your details are never sold, rented, or shared for marketing. Full stop.</>,
  },
  {
    heading: "Leaving, or deleting your data",
    body: (
      <>
        Want out of a pilot, off the waitlist, or your data deleted? Email us and we&apos;ll remove
        you — no questions, no hoops. Every email we send will also include an unsubscribe link.
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
                This covers the two forms on this site: the <strong>pilot sign-up</strong> and the{" "}
                <strong>email waitlist</strong>. It doesn&apos;t cover the future app, which will
                have its own policy.
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
