import { clubs } from "./clubs";
import { faq } from "./faq";
import type { Section } from "./types";

/**
 * The landing page, as data. Order here IS the page order. Copy hews to the website-copy
 * doc, re-pointed so the app waitlist is the primary ask and the in-person pilot is an
 * honest secondary. [bracketed] bits are TODOs for the founders to fill in.
 */
export const landingSections: Section[] = [
  {
    type: "hero",
    eyebrow: "An early pilot, run entirely by hand, no app yet",
    headline: "Clubs are back.",
    subheadline:
      "Small groups. Same people. Every week. Pick something you actually want to do — pastry night, a walking group, a book club — and we'll handle getting everyone there.",
    primaryCta: { label: "Join the waitlist", href: "#waitlist" },
    secondaryCta: {
      label: "Running a pilot near you? Join it →",
      href: "PILOT_FORM",
      external: true,
    },
    note: "The waitlist is for the app we're building. The clubs below are real pilots happening right now — you can join one of those today through a separate form.",
    stats: ["Barcelona & San Francisco", "Pilot open now", "Clubs capped at 10"],
  },
  {
    type: "howItWorks",
    eyebrow: "How it works",
    heading: "You get the club. You don't get the admin.",
    intro:
      "This is the app we're building. Right now we run it by hand in small pilots, so we're sure the format works before we automate any of it.",
    steps: [
      {
        title: "Find a club near you",
        body: "Something you'd actually show up for — pastry night, a walk, a book club — close to home.",
      },
      {
        title: "Join a small group",
        body: "Capped at 10, the same people each week. You'll know whether it's brand new or already going before you commit.",
      },
      {
        title: "We keep it meeting",
        body: "Nearfolk does the organizing — proposes the time and place, sends the nudges — so no single person gets stuck running it.",
      },
      {
        title: "Just show up",
        body: "That's the whole point. The club keeps happening without anyone having to carry it.",
      },
    ],
    note: "For now, that organizing is genuinely just us — texting and emailing to make sure everyone shows up.",
  },
  {
    type: "clubs",
    eyebrow: "What's running in the pilots",
    heading: "Come eat pastries with your neighbors.",
    intro: "Kept casual and cheap, in parks and public spaces around the city.",
    clubs,
    suggestion: {
      label: "Something else you'd actually show up for? Tell us →",
      href: "PILOT_FORM",
      external: true,
    },
  },
  {
    type: "beliefs",
    heading: "What we believe",
    beliefs: [
      "Small groups, not big rooms.",
      "The same people, more than once.",
      "Someone else does the planning, not you — that's us, for now, by hand.",
      "Co-ed, built around the activity. Not a dating app.",
      "Honest about being early. No app yet, no big promises — just real clubs meeting this week.",
    ],
  },
  {
    type: "safety",
    heading: "A note on safety",
    body: [
      "Right now, since this is a small, hands-on pilot, we're personally reviewing everyone who signs up before placing them in a group. As this grows into a real app, that becomes proper ID verification and a formal code of conduct for every member — but for now it's genuinely just us, paying attention to who's signing up.",
      "If a club isn't the right fit, tell us and we'll sort it out. Easy, no guilt trip.",
    ],
  },
  {
    type: "team",
    heading: "Why we're doing this",
    intro: [
      "[First pass — replace the specifics with the real story.] I've spent most of my career in public health, which means I read the loneliness statistics for years before they meant much to me personally. Then [insert the real moment] and it stopped being a line in a report and started being my actual Tuesdays.",
      "Daniela and Ash had their own versions of hitting the same wall. [Add the real story here if there is one.] Three people who each ran into the same problem separately, and figured that was annoying enough to do something about together.",
    ],
    members: [
      {
        name: "[Your name]",
        location: "San Francisco",
        role: "Public health",
        detail: "About a decade in institutional partnerships before this. [One real detail.]",
      },
      {
        name: "Daniela",
        location: "Barcelona",
        role: "Engineering",
        detail: "[Her background, one real detail.]",
      },
      {
        name: "Ash",
        location: "Barcelona",
        role: "Design",
        detail: "[Her background, one real detail.]",
      },
    ],
    closing:
      "None of us had built a company before this one. We each got tired of the same problem separately, and figured three of us complaining about it together was more useful than one of us complaining alone.",
  },
  {
    type: "faq",
    heading: "Questions",
    items: faq,
  },
  {
    type: "waitlistCta",
    id: "waitlist",
    heading: "Be first to know when Nearfolk opens.",
    body: "Small groups. Same people. Every week. Leave your email and we'll tell you the moment the app is ready.",
    submitLabel: "Join the waitlist",
    note: "Barcelona and San Francisco for now. More cities soon. We'll only email you about Nearfolk.",
  },
];
