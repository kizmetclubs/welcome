import type { CityPilot, CitySlug } from "./types";

/**
 * The pilots, one club per city (from the pilot planning doc, Sep 2026). Barcelona is one
 * group on two Saturdays, its time and spot still to be announced (the spot is emailed to
 * people who sign up). San Francisco runs two groups, each meeting twice at its own
 * venue; the form asks which one. Change anything here and every page and form updates.
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
    time: "TBA",
    place: "Location to be revealed by email",
    cap: "Under 10 people",
    cost: "Free — you just bring your own supplies",
    avatar: { src: "/cities/barcelona.png", monogram: "BCN" },
    status: "Starts November 14",
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
    dates: ["October 22 & 29", "November 2 & 9"],
    time: "7–8:30pm",
    place: "Haight-Ashbury or Polk Gulch",
    cohorts: [
      {
        id: "group-1",
        label: "Group 1",
        dates: ["Thursday, October 22", "Thursday, October 29"],
        short: "Oct 22 & 29",
        time: "7–8:30pm",
        venue: "The Green Heron",
        neighborhood: "Haight-Ashbury",
      },
      {
        id: "group-2",
        label: "Group 2",
        dates: ["Monday, November 2", "Monday, November 9"],
        short: "Nov 2 & 9",
        time: "7–8:30pm",
        venue: "Robber Baron",
        neighborhood: "Polk Gulch",
      },
    ],
    cap: "Under 10 people",
    cost: "Free — bring a deck if you have one",
    // Placeholder tile until there's an original SF mark (no third-party logos).
    avatar: { monogram: "SF" },
    status: "Starts October 22",
    stat: "Roughly 1 in 3 US adults say they're lonely.",
  },
};

/** The group with this id in this city, if the city has groups. */
export function findCohort(city: CitySlug, id: string | null | undefined) {
  return pilots[city].cohorts?.find((cohort) => cohort.id === id);
}

export const CITY_SLUGS = Object.keys(pilots) as CitySlug[];

export function isCitySlug(value: string): value is CitySlug {
  return value in pilots;
}
