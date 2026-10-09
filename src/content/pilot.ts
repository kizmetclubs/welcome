import type { CityPilot, CitySlug } from "./types";

/**
 * The pilots, one club per city (from the pilot planning doc, Sep 2026). Both meet on two
 * Saturdays; the meeting spot is emailed to people who sign up. The time block is still a
 * [bracketed] placeholder. Change anything here and every page and form updates.
 */
export const pilots: Record<CitySlug, CityPilot> = {
  barcelona: {
    slug: "barcelona",
    name: "Barcelona",
    club: {
      name: "Arts & crafts club",
      blurb:
        "Bring your own supplies and make something in the park, or just show up and get inspired. Extra supplies available.",
      tone: "mustard",
    },
    dates: ["November 14", "November 21"],
    time: "[time block]",
    place: "Location to be revealed by email",
    cap: "Under 10 people",
    cost: "Free — you just bring your own supplies",
    avatar: { src: "/cities/barcelona.png", monogram: "BCN" },
    status: "Starts in November",
    stat: "Spain's own Barómetro found 20.2% of people here report chronic loneliness, and Cruz Roja puts that number at 44% among people who've recently migrated.",
  },
  sanfrancisco: {
    slug: "sanfrancisco",
    name: "San Francisco",
    club: {
      name: "Oracle & tarot club",
      blurb:
        "Bring a deck or borrow one. Pull cards, swap readings, and practice interpreting the cards with new friends.",
      tone: "teal",
    },
    dates: ["November 14", "November 21"],
    time: "[time block]",
    place: "Location to be revealed by email",
    cap: "Under 10 people",
    cost: "Free — bring a deck if you have one",
    // Placeholder tile until there's an original SF mark (no third-party logos).
    avatar: { monogram: "SF" },
    status: "Starts in November",
    stat: "Roughly 1 in 3 US adults say they're lonely.",
  },
};

export const CITY_SLUGS = Object.keys(pilots) as CitySlug[];

export function isCitySlug(value: string): value is CitySlug {
  return value in pilots;
}
