/**
 * Site-level content: brand wordmark, header/footer chrome. Kept out of the section list
 * because it frames every page rather than being one section of the landing narrative.
 */
export type NavVariant = "header" | "bar" | "jump";

export const site = {
  wordmark: "kizmet",
  tagline: "Clubs for adults. Same people, every week.",
  ctaLabel: "Find your club",
  // Absolute so the header CTA works from any page (/privacy, /confirm), not just home.
  ctaHref: "/#clubs",
  /**
   * Quick links to the page's sections. Hash-only on the landing pages (home and each city
   * page share these sections); prefixed with "/" elsewhere.
   */
  nav: [
    { label: "How it works", href: "#how" },
    { label: "Who we are", href: "#about" },
    { label: "Safety", href: "#safety" },
    { label: "FAQ", href: "#faq" },
    { label: "App waitlist", href: "#waitlist" },
  ],
  /**
   * Which navigation mockup to show: "header" (links in the header, menu on phones), "bar"
   * (a sticky row of quick links under the header) or "jump" (jump links in the hero).
   * Reviewers can override it with ?nav=a|b|c. Pick one, then delete the other two.
   */
  navVariant: "header" as NavVariant,
  footer: {
    /** Forwarded via Porkbun email forwarding on kizmetclubs.com. */
    contactEmail: "hello@kizmetclubs.com",
    cityNote: "Barcelona and San Francisco for now. More cities soon.",
    links: [
      { label: "Barcelona", href: "/barcelona" },
      { label: "San Francisco", href: "/sanfrancisco" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
} as const;
