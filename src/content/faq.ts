import type { FaqItem } from "./types";

/**
 * FAQ (adapted from the website-copy doc), re-pointed so answers clearly distinguish the
 * app waitlist (this page's primary ask) from the in-person pilots (a separate form).
 */
export const faq: FaqItem[] = [
  {
    q: "Wait, is there actually an app?",
    a: "Not yet. Right now this is a pilot we're running entirely by hand — real people, real clubs, coordinated by email and text instead of an app. Joining the waitlist is how you'll hear the moment the app is ready.",
  },
  {
    q: "What's the difference between the waitlist and the pilot?",
    a: "The waitlist is for the app we're building — leave your email and we'll tell you when it launches. The pilots are small in-person clubs happening right now in Barcelona and San Francisco, and you join those through a separate form.",
  },
  {
    q: "Does this cost anything?",
    a: "The waitlist is free. The pilots are kept genuinely cheap. The eventual app will have a paid membership, but that doesn't exist yet.",
  },
  {
    q: "Do I need to already know someone in a group?",
    a: "No. Most people show up knowing nobody. That's the point.",
  },
  {
    q: "Is this a dating app?",
    a: "No. Co-ed, built around the activity, nobody's swiping.",
  },
  {
    q: "What happens after I join the waitlist?",
    a: "We build the real app using what we learn from the pilots. You'll be the first to know.",
  },
];
