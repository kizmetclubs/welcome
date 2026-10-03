import { faq } from "./faq";
import { CITY_SLUGS, pilots } from "./pilot";
import type { CitySlug, Section } from "./types";

/**
 * The landing page, as data. `buildSections(city)` returns the ordered section list for a
 * city page (/barcelona, /sanfrancisco); with no city it returns the home page, which lets
 * the visitor pick one. Copy hews to the pilot planning doc.
 */

const howItWorks: Section = {
  type: "howItWorks",
  eyebrow: "How it works",
  heading: "You show up. We do the rest.",
  intro:
    "Kizmet is small, recurring clubs that meet in person, on a schedule we handle for you. Right now that's just us — no app yet, just a few of us suggesting a spot and sending the reminder.",
  steps: [
    {
      title: "Sign up",
      body: "Join a small club around what you already love doing.",
    },
    {
      title: "Get placed",
      body: "We pick the time and place for your neighborhood ",
    },
    {
      title: "Show up twice",
      body: "Same people. No organizer burnout.",
    },
    {
      title: "Tell us how it went",
      body: "A short form after the second session. Two minutes, tops.",
    },
  ],
};

const beliefs: Section = {
  type: "beliefs",
  heading: "What we believe",
  beliefs: [
    "Small groups, not big rooms.",
    "The same people, more than once.",
    "Someone else does the planning. That's us, for now, by hand.",
    "Co-ed, built around the activity. Not a dating app.",
    "Honest about being early. No app, no big promises — just a real club, meeting twice.",
  ],
};

const safety: Section = {
  type: "safety",
  heading: "A note on safety",
  body: [
    "You're meeting people you don't know yet, so we personally review everyone who signs up before placing them in a group. We're not running background checks at this stage, but we're paying attention to who's signing up.",
    "On the day of the pilot, we will be there to welcome you with name tags, and a quick in-person check against your sign-up. If something isn't right, just talk to us and we'll sort it out together.",
  ],
};

const team: Section = {
  type: "team",
  heading: "Why we're doing this",
  intro: [
    "Adult friendship doesn't happen by accident anymore. Nothing forces you into the same room with the same people the way school or a first job once did, and the apps built for this treat friendship like dating: one match, one hangout, then it's on you to keep it going. That's the part everyone struggles with. Now making friends somehow involves calendar coordination, WhatsApp logistics and saying \"we should do something!\" for six months.",
    "Before writing a line of code, we ran listening sessions with hundreds of neighbors. The pattern was clear: people didn't lack interest in making friends—they were just exhausted by the coordination. The thing that quietly killed groups wasn't a lack of chemistry; it was one person ending up as the default organizer and getting burnt out. Having one good hangout is easy. Making sure the second one actually happens is the hard part.",
    "Kizmet is our simple answer: recurring small clubs where someone else handles the schedule, the spot, and the reminders. No organizer burnout, no endless group chats. We're testing it completely by hand, in a park near you, before we build anything else.",
  ],
  members: [
    {
      name: "Sam",
      role: "Strategy & vision",
      location: "San Francisco",
      detail:
        "Public health background, a decade in institutional partnerships. Read the loneliness statistics for years before building Kizmet.",
    },
    {
      name: "Daniela",
      role: "Engineering",
      location: "Barcelona",
      detail: "Builds the thing. Right now that mostly means this page and a spreadsheet.",
    },
    {
      name: "Ash",
      role: "Design",
      location: "Barcelona",
      detail: "Everything you're looking at. Warm, a little whimsical, friendship-forward.",
    },
    {
      name: "Cindy",
      role: "Partnerships & Community",
      location: "Barcelona",
      detail:
        "Gets the word out and finds the local groups already gathering people, so a club has neighbors in it, not just strangers from the internet.",
    },
  ],
  closing:
    "None of us have built a company before this one. We're learning as we go, and we want to build something with the community, not just for the community.",
};

const faqSection: Section = { type: "faq", heading: "Questions", items: faq };

const waitlist: Section = {
  type: "waitlistCta",
  id: "waitlist",
  heading: "Not in Barcelona or San Francisco?",
  body: "Leave your email and we'll tell you when Kizmet comes to your city.",
  submitLabel: "Join",
  note: "We'll only email you about Kizmet. Unsubscribe anytime.",
};

export function buildSections(city?: CitySlug): Section[] {
  if (city) {
    const pilot = pilots[city];
    return [
      {
        type: "hero",
        eyebrow: `${pilot.name} · ${pilot.status}`,
        headline: pilot.club.name,
        subheadline: `One small club, ${pilot.cap.toLowerCase()}, that meets twice, on two Saturdays, in ${pilot.name}. We pick the day and the place. You just show up.`,
        primaryCta: { label: "Join the pilot", href: "#signup" },
        scribble: "Be my best friend.",
        stats: [pilot.dates.join(" & "), pilot.place, pilot.cost],
      },
      {
        type: "pilot",
        id: "details",
        eyebrow: "The pilot",
        heading: `What's happening in ${pilot.name}`,
        intro: pilot.stat,
        pilot,
      },
      howItWorks,
      {
        type: "pilotSignup",
        id: "signup",
        heading: "Want in?",
        body: "Six quick questions. We'll place you by hand and send the details.",
        city,
        note: "We personally review every sign-up. No cost, no app, no pressure.",
        aside: "Everyone's new the first time.",
      },
      beliefs,
      safety,
      team,
      faqSection,
      waitlist,
    ];
  }

  return [
    {
      type: "hero",
      eyebrow: "An early pilot, run entirely by hand, no app yet",
      headline: "Clubs are back.",
      subheadline:
        "Small, recurring clubs for adults who want more things to do with people nearby.",
      primaryCta: { label: "I'm in", href: "#signup" },
      scribble: "Find your club.",
      stats: ["Barcelona & San Francisco", "Capped under 10", "Free"],
    },
    howItWorks,
    {
      type: "cityPicker",
      heading: "One club per city, to start.",
      intro:
        "Barcelona and San Francisco pilots will start in November. After that, we'll work together with the community to build out more clubs based on feedback from these pilots.",
      cities: CITY_SLUGS.map((slug) => pilots[slug]),
    },
    {
      type: "pilotSignup",
      id: "signup",
      heading: "Want in?",
      body: "Six quick questions. Pick your city, and we'll place you by hand.",
      note: "We personally review every sign-up. No cost, no app, no pressure.",
      aside: "Everyone's new the first time.",
    },
    beliefs,
    safety,
    team,
    faqSection,
    waitlist,
  ];
}

/** Home page sections (kept as a constant for tests and the registry guard). */
export const landingSections: Section[] = buildSections();
