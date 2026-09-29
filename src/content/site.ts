/**
 * Site-level content: brand wordmark, header/footer chrome. Kept out of the section list
 * because it frames every page rather than being one section of the landing narrative.
 */
export const site = {
  wordmark: "kizmet",
  tagline: "Clubs for adults. Same people, every week.",
  ctaLabel: "Join the pilot",
  // Absolute so the header CTA works from any page (/privacy, /confirm), not just home.
  signupAnchor: "/#signup",
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
