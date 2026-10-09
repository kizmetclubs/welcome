import { faq } from "./faq";
import { CITY_SLUGS, pilots } from "./pilot";
import type { CitySlug, Section, Step } from "./types";

/**
 * The landing page, as data. `buildSections(city)` returns the ordered section list for a
 * city page (/barcelona, /sanfrancisco); with no city it returns the home page, which lets
 * the visitor pick a club. Each section's `edgeBefore` is the ribbon, scallop or checker
 * band drawn above it, so reordering sections means checking those edges too: adjacent
 * grounds alternate so a scallop stays visible.
 */

const steps: Step[] = [
  { title: "Find your thing", body: "Pick a club that sounds fun and check the dates." },
  { title: "Save your spot", body: "Tell us a little about yourself and you're in." },
  {
    title: "Show up & hang out",
    body: "Same small group, a few times, so you actually get a chance to know each other.",
  },
  {
    title: "Give us the scoop",
    body: "Tell us what you loved, what you didn't, and what we could do better.",
  },
];

const signup = {
  type: "pilotSignup",
  id: "signup",
  edgeBefore: { kind: "scallop", from: "base", to: "mustard" },
  heading: "Want in?",
  body: "Pick a club that sounds fun, tell us a little about yourself, and we'll handle the rest.",
  stepsHeading: "You show up. We do the rest.",
  steps,
  aside: "Free to join. Come as you are. Everyone's new the first time.",
  submitLabel: "I'm in",
  success: {
    heading: "You're in, {name}!",
    body: "We got your sign-up. We'll look it over by hand and message you by email or WhatsApp before November with the dates, the meeting spot and what to bring.",
    note: "Nothing from us by November? Check your spam folder, or write to hello@kizmetclubs.com.",
  },
} satisfies Section;

const appWaitlistLink = {
  label: "Can't make the pilot? Get notified when the app launches →",
  href: "#waitlist",
};

const nowNext: Section = {
  type: "nowNext",
  id: "how",
  edgeBefore: { kind: "checker" },
  eyebrow: "How it works",
  heading: "Pilot first. App next.",
  intro:
    "Kizmet will be an app that organizes your club for you. Before we build it, we're running the first clubs ourselves to learn what actually works.",
  now: {
    label: "Now: the pilot",
    heading: "This November, we organize everything by hand.",
    body: "No app to download yet. The four of us are the app for now.",
    points: [
      "We pick the dates and find the spot",
      "We send the reminders",
      "We're there in person to welcome you",
    ],
    cta: { label: "I'm in", href: "#signup" },
  },
  next: {
    label: "Next: the app",
    heading: "After the pilots, the app takes over.",
    body: "We'll turn what we learn into the Kizmet app, so clubs can keep meeting in more cities without anyone having to become The Organizer™.",
  },
  waitlist: {
    id: "waitlist",
    heading: "Can't make the pilot?",
    body: "Get an email when the Kizmet app launches. That's the only email we'll send.",
    submitLabel: "Notify me",
    success: {
      heading: "You're on the list!",
      body: "We'll email you as soon as the Kizmet app launches. Until then, we won't fill your inbox.",
    },
    confirmSent: {
      heading: "Almost there!",
      body: "Check your inbox and click the link to confirm, and you're on the list for the app launch.",
    },
  },
};

const beliefs: Section = {
  type: "beliefs",
  edgeBefore: { kind: "scallop", from: "mustard", to: "teal" },
  heading: "What we believe",
  beliefs: [
    {
      title: "Small groups make it easier to actually connect.",
      body: "Enough people to meet someone new. Small enough to actually get to know them.",
    },
    {
      title: "Friendship takes more than one hangout.",
      body: "Getting people together once is a start. Seeing the same people again is where friendship has a chance to happen.",
    },
    {
      title: "Friendship shouldn't feel like another thing to manage.",
      body: "Finding a time, picking a place, sending the reminders. We think someone else can handle that part.",
    },
    {
      title: "It's easier to connect when you're doing something together.",
      body: 'A shared activity takes some of the pressure off and gives everyone a reason to be there besides "I\'m here to make friends."',
    },
    {
      title: "Technology should help us spend more time together, not more time online.",
      body: "We want to use technology to make real-life connection easier, and then get out of the way.",
    },
  ],
};

const story: Section = {
  type: "story",
  id: "about",
  edgeBefore: { kind: "ribbon", tone: "coral", reverse: true },
  eyebrow: "Why we're doing this",
  heading: "Making friends shouldn't require a project manager.",
  then: {
    label: "Back then",
    body: "A lot of our friendships started just because we kept seeing the same people. School made that easy. Sometimes work did too. Eventually the small talk turned into inside jokes and, somewhere along the way:",
    punch: "oh, we're friends.",
  },
  now: {
    label: "Now",
    before: "Adult life is...less helpful. You meet someone you genuinely like, say",
    bubble: "we should do this again!",
    after: "...and then spend six months trying to find a Tuesday that works.",
  },
  quoteIntro: "When we started talking to people about this, we kept hearing the same thing:",
  quote: '"People want more community, but they don\'t want another thing to organize."',
  problem:
    "And that's the tricky part. Seeing the same people regularly is how you actually get to know them, but making that happen takes work. Someone has to…",
  chores: ["Pick the dates", "Find the places", "Send the reminders", "Become The Organizer™"],
  choresSticker: "We've got these",
  answerHeading: "That's where Kizmet comes in.",
  answerBody:
    "We make small clubs around things people like doing, bring the same group together regularly, and handle the coordination.",
  closing: {
    before: "We handle the logistics. ",
    highlight: "You just keep showing up.",
    after: " Let friendship do its thing.",
  },
};

const team: Section = {
  type: "team",
  heading: "The people behind it",
  members: [
    {
      name: "Sam",
      role: "Strategy & ops",
      location: "sanfrancisco",
      detail:
        "A decade in public health partnerships. Read the loneliness stats for years, then decided to do something about them.",
      photo: "/team/sam.webp",
    },
    {
      name: "Daniela",
      role: "Engineering",
      location: "barcelona",
      detail: "Builds the thing. Right now that mostly means this page and a spreadsheet.",
      photo: "/team/daniela.webp",
    },
    {
      name: "Ash",
      role: "Design",
      location: "barcelona",
      detail: "Everything you're looking at. Warm, a little whimsical, friendship-forward.",
      photo: "/team/ash.webp",
    },
    {
      name: "Cindy",
      role: "Partnerships & marketing",
      location: "barcelona",
      detail:
        "Finds the groups already gathering people, so your club starts with neighbors, not strangers.",
      photo: "/team/cindy.webp",
    },
  ],
  closing: {
    heading: "We're figuring this out as we go, on purpose.",
    body: "We want to build Kizmet alongside the people actually using it: try things, learn what works, change what doesn't, and let the community shape where this goes.",
  },
};

const safety: Section = {
  type: "safety",
  id: "safety",
  edgeBefore: { kind: "checker" },
  heading: "A note on safety",
  body: [
    "Meeting new people can feel a little vulnerable, and we want everyone to feel comfortable showing up.",
    "For this pilot, everyone signs up in advance and we review sign-ups before putting groups together. We're not conducting background checks, so this isn't a formal screening process, but these aren't open, drop-in events either.",
    "We'll also be there in person to welcome everyone and check people in.",
    "We expect everyone who joins a Kizmet club to be kind, respectful, and mindful of other people's boundaries. Harassment, discrimination, unwanted advances, or behavior that makes someone feel unsafe isn't welcome here.",
    "If something happens that makes you uncomfortable, please come talk to us. We'll take it seriously.",
  ],
};

const closingCta: Section = {
  type: "closingCta",
  edgeBefore: { kind: "scallop", from: "white", to: "chartreuse" },
  heading: "This is just the beginning.",
  body: [
    "We're starting Kizmet with a few small clubs in San Francisco and Barcelona. It's our first pilot, a chance to try the idea in real life, learn what works, and make it better before we grow.",
    "For now, we're running these first clubs ourselves and learning as we go. What happens here will help us figure out what Kizmet looks like next.",
  ],
  kicker: "Come be part of the first round.",
  cta: { label: "I'm in", href: "#signup" },
};

const faqSection: Section = {
  type: "faq",
  id: "faq",
  edgeBefore: { kind: "checker" },
  heading: "Questions",
  items: faq,
};

export function buildSections(city?: CitySlug): Section[] {
  // Shared by home and city pages, in this order, after each page's own opening sections.
  const rest = (signupCity?: CitySlug): Section[] => [
    nowNext,
    { ...signup, city: signupCity },
    beliefs,
    story,
    team,
    safety,
    closingCta,
    faqSection,
  ];

  if (city) {
    const pilot = pilots[city];
    return [
      {
        type: "hero",
        eyebrow: `${pilot.name} · ${pilot.status}`,
        headline: pilot.club.name,
        subheadline: `One small club, ${pilot.cap.toLowerCase()}, that meets twice, on two Saturdays, in ${pilot.name}. We pick the day and the place. You just show up.`,
        primaryCta: { label: "I'm in", href: "#signup" },
        scribble: { label: "Be my best friend.", href: "#signup" },
        stats: [pilot.dates.join(" & "), pilot.place, pilot.cost],
        footLink: appWaitlistLink,
      },
      {
        type: "pilot",
        id: "details",
        edgeBefore: { kind: "ribbon", tone: "chartreuse" },
        eyebrow: "The pilot",
        heading: `What's happening in ${pilot.name}`,
        intro: pilot.stat,
        pilot,
      },
      ...rest(city),
    ];
  }

  return [
    {
      type: "hero",
      headline: "Clubs are back.",
      subheadline:
        "Small, recurring clubs for adults who want more fun things to do with people nearby.",
      primaryCta: { label: "Find your club →", href: "#clubs" },
      scribble: { label: "Be my best friend.", href: "#signup" },
      stats: ["Barcelona + San Francisco", "10 people max", "Free to join"],
      footLink: appWaitlistLink,
    },
    {
      type: "cityPicker",
      id: "clubs",
      edgeBefore: { kind: "ribbon", tone: "chartreuse" },
      eyebrow: "First up: Barcelona + San Francisco",
      heading: "One club in each city, starting this November.",
      intro:
        "We're keeping the first round small, then we'll take what we learn and grow from there.",
      cities: CITY_SLUGS.map((slug) => pilots[slug]),
      footnote:
        "Every club is capped at 10 neighbors. Members are matched by neighborhood and individually reviewed before every group launches. No random algorithm, no huge crowds, just a small group of adults living near you.",
    },
    ...rest(),
  ];
}

/** Home page sections (kept as a constant for tests and the registry guard). */
export const landingSections: Section[] = buildSections();
