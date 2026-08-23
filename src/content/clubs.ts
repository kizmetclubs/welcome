import type { Club } from "./types";

/**
 * The pilot clubs (from the website-copy doc). Day/time and neighborhood are [bracketed]
 * placeholders until each pilot's schedule is locked — kept visible on purpose.
 */
export const clubs: Club[] = [
  {
    emoji: "🥐",
    name: "Pastry Club",
    blurb: "Bring butter, leave with friends and more croissants than one person should own.",
    when: "[Day / time]",
    where: "[Neighborhood]",
  },
  {
    emoji: "🚶",
    name: "Walk & Talk",
    blurb: "A walk with conversation prompts on hand, so it's never just weather talk.",
    when: "[Day / time]",
    where: "[Neighborhood]",
  },
  {
    emoji: "📖",
    name: "Reading Club",
    blurb: "Bring whatever you're reading. No assigned book.",
    when: "[Day / time]",
    where: "[Neighborhood]",
  },
  {
    emoji: "🎨",
    name: "Arts & Crafts",
    blurb: "Talent not required.",
    when: "[Day / time]",
    where: "[Neighborhood]",
  },
  {
    emoji: "🗣️",
    name: "Spanish Conversation",
    blurb: "Practice with people who won't judge your subjunctive — at least not out loud.",
    when: "[Day / time]",
    where: "[Neighborhood]",
  },
];
