import { Fragment, type JSX } from "react";
import { RiseObserver } from "@/components/RiseObserver";
import { SectionEdge } from "@/components/SectionEdge";
import {
  Beliefs,
  CityPicker,
  ClosingCta,
  Faq,
  Hero,
  NowNext,
  Pilot,
  PilotSignup,
  Safety,
  Story,
  Team,
} from "@/components/sections";
import type { Section, SectionType } from "@/content/types";

/**
 * Maps each section `type` to its component. `satisfies` guarantees at compile time that
 * EVERY section variant has a renderer, so adding a section type without wiring it up is a
 * build error. Each section's `edgeBefore` (ribbon, scallop or checker band) is drawn here,
 * so edges follow the content order. Also mounts the scroll observer that plays the cards'
 * settle-in animation.
 */
const REGISTRY = {
  hero: Hero,
  cityPicker: CityPicker,
  pilot: Pilot,
  pilotSignup: PilotSignup,
  nowNext: NowNext,
  beliefs: Beliefs,
  story: Story,
  team: Team,
  safety: Safety,
  closingCta: ClosingCta,
  faq: Faq,
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
        return (
          <Fragment key={`${section.type}-${i}`}>
            <SectionEdge edge={section.edgeBefore} />
            <Component {...section} />
          </Fragment>
        );
      })}
      <RiseObserver />
    </>
  );
}

export const REGISTERED_SECTION_TYPES = Object.keys(REGISTRY) as SectionType[];
