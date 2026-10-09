import { describe, expect, it } from "vitest";
import { buildSections, landingSections } from "@/content/landing";
import { CITY_SLUGS } from "@/content/pilot";
import { site } from "@/content/site";
import { REGISTERED_SECTION_TYPES } from "./SectionRenderer";

/**
 * Axis C guard: every section used in the content (home + each city page) must have a
 * registered renderer, and the hero CTA must point at a real section on the same page
 * (home → the club cards, city pages → the sign-up form).
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

    it(`${page.name}: hero CTA targets a section on the same page`, () => {
      const hero = page.sections.find((s) => s.type === "hero");
      const ids = page.sections.map((s) => s.id).filter(Boolean);
      expect(hero?.type).toBe("hero");
      expect(ids).toContain(hero?.type === "hero" && hero.primaryCta.href.replace(/^#/, ""));
    });
  }

  it("city pages pre-fill their own city in the form", () => {
    for (const city of CITY_SLUGS) {
      const signup = buildSections(city).find((s) => s.type === "pilotSignup");
      expect(signup?.type === "pilotSignup" && signup.city).toBe(city);
    }
  });

  for (const page of pages) {
    it(`${page.name}: every nav link points at a section on the page`, () => {
      const ids = new Set(
        page.sections.flatMap((s) => [s.id, s.type === "nowNext" ? s.waitlist.id : undefined])
      );
      const missing = site.nav.map((link) => link.href.slice(1)).filter((id) => !ids.has(id));
      expect(missing).toEqual([]);
    });
  }

  it("home page has the city picker and the app waitlist", () => {
    const types = landingSections.map((s) => s.type);
    expect(types).toContain("cityPicker");
    expect(types).toContain("nowNext");
  });
});
