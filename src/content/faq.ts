import type { FaqItem } from "./types";

/** FAQ for the pilot. Each answer is a list of paragraphs; runs can carry links. */
export const faq: FaqItem[] = [
  {
    q: "What am I actually signing up for?",
    a: [
      "A small club that meets a few times with the same people. You'll see all the dates upfront, so pick a club you can make every time. The whole idea is to keep showing up.",
    ],
  },
  {
    q: "Is there an app?",
    a: [
      "Not yet. For the pilot, we're organizing everything ourselves: picking the dates, finding the spot and sending the reminders.",
      [
        "After the pilots, we'll build the Kizmet app to do that organizing for you. ",
        { text: "Join the app waitlist", href: "#waitlist" },
        " to hear when it launches.",
      ],
    ],
  },
  {
    q: "Do I need to know anyone?",
    a: ["Absolutely not. That's kind of the point."],
  },
  {
    q: "What if I don't like everyone?",
    a: [
      "Congratulations, you're a person.",
      "You probably won't become best friends with everyone, and that's okay. Come do something fun, keep showing up, and see who you click with.",
    ],
  },
  {
    q: "Is this a dating thing?",
    a: [
      "Nope. Kizmet is about meeting people through things you actually want to do.",
      "If you happen to meet the love of your life along the way, that's between you and the universe.",
    ],
  },
  {
    q: "Does it cost anything?",
    a: [
      "Nope. This first round is free.",
      "Depending on the club, we might ask you to bring something you already have, like a tarot deck or craft supplies.",
    ],
  },
  {
    q: "What if the club I want is full?",
    a: [
      "We're keeping these first clubs small, so we may have more sign-ups than spots. If that happens, we'll add you to the waitlist and make sure you hear about the next round.",
    ],
  },
  {
    q: "What if it's not my thing?",
    a: [
      "Tell us! This is our first pilot, and knowing what you didn't like is useful too.",
      "No awkward breakup speech required.",
    ],
  },
  {
    q: "I'm not in Barcelona or San Francisco. Can I still join?",
    a: [
      [
        "These are our first two cities, but definitely not our last. ",
        { text: "Join the app waitlist", href: "#waitlist" },
        " and we'll let you know when Kizmet gets closer to you.",
      ],
    ],
  },
  {
    q: "What happens after the pilot?",
    a: [
      "We learn from it and keep going. We'll use what we learn from these first clubs to make the next round better, then build the Kizmet app so clubs can run in more cities, shaped by the people who join them.",
    ],
  },
];
