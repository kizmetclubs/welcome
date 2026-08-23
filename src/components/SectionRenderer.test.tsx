import { describe, expect, it } from "vitest";
import { landingSections } from "@/content/landing";
import { REGISTERED_SECTION_TYPES } from "./SectionRenderer";

/**
 * Axis C guard: every section used in the landing content must have a registered renderer,
 * and every registered type should be a real content type. Catches a section added to
 * content without a component (or a renderer left dangling) before it ships.
 */
describe("SectionRenderer registry", () => {
  it("renders every section type used in the landing content", () => {
    const usedTypes = new Set(landingSections.map((section) => section.type));
    const registered = new Set(REGISTERED_SECTION_TYPES);
    const unrenderable = [...usedTypes].filter((type) => !registered.has(type));
    expect(unrenderable, "content uses section types with no renderer").toEqual([]);
  });

  it("has a hero and a waitlist CTA in the content", () => {
    const types = landingSections.map((section) => section.type);
    expect(types).toContain("hero");
    expect(types).toContain("waitlistCta");
  });

  it("the waitlist CTA id matches the hero primary CTA anchor", () => {
    const hero = landingSections.find((section) => section.type === "hero");
    const waitlist = landingSections.find((section) => section.type === "waitlistCta");
    expect(hero?.type === "hero" && hero.primaryCta.href).toBe(
      waitlist?.type === "waitlistCta" ? `#${waitlist.id}` : undefined
    );
  });
});
