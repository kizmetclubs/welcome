import { describe, expect, it } from "vitest";
import { buildSections, landingSections } from "@/content/landing";
import { CITY_SLUGS } from "@/content/pilot";
import { REGISTERED_SECTION_TYPES } from "./SectionRenderer";

/**
 * Axis C guard: every section used in the content (home + each city page) must have a
 * registered renderer, and the hero must point at a real sign-up section.
 */
const pages = [
  { name: "home", sections: landingSections },
  ...CITY_SLUGS.map((city) => ({ name: city, sections: buildSections(city) })),
];

describe("SectionRenderer registry", () => {
  for (const page of pages) {
    it(`renders every section type used on the ${page.name} page`, () => {
      const registered = new Set(REGISTERED_SECTION_TYPES);
      const unrenderable = page.sections
        .map((section) => section.type)
        .filter((type) => !registered.has(type));
      expect(unrenderable, "content uses section types with no renderer").toEqual([]);
    });

    it(`${page.name}: hero CTA targets the pilot sign-up section`, () => {
      const hero = page.sections.find((s) => s.type === "hero");
      const signup = page.sections.find((s) => s.type === "pilotSignup");
      expect(hero?.type === "hero" && hero.primaryCta.href).toBe(
        signup?.type === "pilotSignup" ? `#${signup.id}` : undefined
      );
    });
  }

  it("city pages pre-fill their own city in the form", () => {
    for (const city of CITY_SLUGS) {
      const signup = buildSections(city).find((s) => s.type === "pilotSignup");
      expect(signup?.type === "pilotSignup" && signup.city).toBe(city);
    }
  });

  it("home page has the city picker and an email waitlist fallback", () => {
    const types = landingSections.map((s) => s.type);
    expect(types).toContain("cityPicker");
    expect(types).toContain("waitlistCta");
  });
});
