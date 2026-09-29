import type { CityPilot, CitySlug } from "./types";

/**
 * The pilots, one club per city (from the pilot planning doc, Sep 2026). Dates, time and
 * meeting spot are [bracketed] placeholders — fill them in here once they're locked and
 * every page/form updates.
 */
export const pilots: Record<CitySlug, CityPilot> = {
  barcelona: {
    slug: "barcelona",
    name: "Barcelona",
    club: {
      name: "Arts & Crafts Club",
      emoji: "🎨",
      blurb: "Bring your own supplies and make something in the park. Talent not required.",
      tone: "lime",
    },
    dates: ["[Saturday, date 1]", "[Saturday, date 2]"],
    time: "[time block]",
    place: "[park, neighborhood]",
    cap: "Under 10 people",
    cost: "Free — you just bring your own supplies",
    status: "Starts in November",
    stat: "Spain's own Barómetro found 20.2% of people here report chronic loneliness, and Cruz Roja puts that number at 44% among people who've recently migrated.",
  },
  sanfrancisco: {
    slug: "sanfrancisco",
    name: "San Francisco",
    club: {
      name: "Oracle & Tarot Club",
      emoji: "🔮",
      blurb: "Bring a deck, or borrow one. Pull cards, swap readings. No belief required.",
      tone: "sky",
    },
    dates: ["[Saturday, date 1]", "[Saturday, date 2]"],
    time: "[time block]",
    place: "[park, neighborhood]",
    cap: "Under 10 people",
    cost: "Free — bring a deck if you have one",
    status: "Starts shortly after Barcelona",
    stat: "Roughly 1 in 3 US adults say they're lonely.",
  },
};

export const CITY_SLUGS = Object.keys(pilots) as CitySlug[];

export function isCitySlug(value: string): value is CitySlug {
  return value in pilots;
}
