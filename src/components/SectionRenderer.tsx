import type { JSX } from "react";
import {
  Beliefs,
  CityPicker,
  Faq,
  Hero,
  HowItWorks,
  Pilot,
  PilotSignup,
  Safety,
  Team,
  WaitlistCta,
} from "@/components/sections";
import type { Section, SectionType } from "@/content/types";

/**
 * The registry — Axis C of the swappability model. Maps each section `type` to its
 * component. `satisfies` guarantees at compile time that EVERY section variant has a
 * renderer, so adding a section type without wiring it up is a build error.
 */
const REGISTRY = {
  hero: Hero,
  cityPicker: CityPicker,
  pilot: Pilot,
  howItWorks: HowItWorks,
  beliefs: Beliefs,
  safety: Safety,
  team: Team,
  faq: Faq,
  pilotSignup: PilotSignup,
  waitlistCta: WaitlistCta,
} satisfies Record<SectionType, (props: never) => JSX.Element>;

export function SectionRenderer({ sections }: { sections: Section[] }) {
  return (
    <>
      {sections.map((section, i) => {
        const Component = REGISTRY[section.type] as (props: Section) => JSX.Element;
        if (!Component) {
          // Fails loudly in dev; in prod we skip rather than crash the whole page.
          if (process.env.NODE_ENV !== "production") {
            throw new Error(`No renderer registered for section type "${section.type}"`);
          }
          return null;
        }
        return <Component key={`${section.type}-${i}`} {...section} />;
      })}
    </>
  );
}

export const REGISTERED_SECTION_TYPES = Object.keys(REGISTRY) as SectionType[];
