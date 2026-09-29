/**
 * Site-level content: brand wordmark, header/footer chrome. Kept out of the section list
 * because it frames every page rather than being one section of the landing narrative.
 */
export const site = {
  wordmark: "kizmet",
  tagline: "Small groups. Same people. Every week.",
  // Absolute so the header CTA works from any page (/privacy, /confirm), not just home.
  waitlistAnchor: "/#waitlist",
  footer: {
    /** TODO(founders): set a real contact address once the domain lands. */
    contactEmail: "[add contact email]",
    cityNote: "Barcelona and San Francisco for now. More cities soon.",
    links: [
      { label: "Privacy", href: "/privacy", external: false },
      { label: "Join a pilot", href: "PILOT_FORM", external: true },
    ],
  },
} as const;
