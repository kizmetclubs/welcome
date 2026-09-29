/**
 * Content model — Axis C of the swappability system (spec §4).
 *
 * The page is DATA, not markup: landing.ts builds an ordered list of these sections and
 * <SectionRenderer> maps each `type` to a component. Reordering, adding, or removing a
 * whole section is a one-line edit; rewriting copy never touches a component.
 */

export type CitySlug = "barcelona" | "sanfrancisco";

export interface CtaLink {
  label: string;
  /** In-page anchor (e.g. "#signup") or a path/URL. */
  href: string;
  external?: boolean;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface TeamMember {
  name: string;
  role: string;
  location?: string;
  detail: string;
}

export interface Step {
  title: string;
  body: string;
}

/** One city's pilot. Dates/venue are [bracketed] placeholders until locked. */
export interface CityPilot {
  slug: CitySlug;
  name: string;
  club: {
    name: string;
    emoji: string;
    blurb: string;
    /** Badge color for the city chip. */
    tone: "gold" | "sky" | "lime" | "pink";
  };
  dates: string[];
  time: string;
  place: string;
  cap: string;
  cost: string;
  /** Short launch note ("first, in November"). */
  status: string;
  /** City-appropriate loneliness stat from the pilot doc (never mixed across borders). */
  stat: string;
}

/* ── section variants (discriminated union on `type`) ─────────────────────── */

export interface HeroSection {
  type: "hero";
  eyebrow: string;
  headline: string;
  subheadline: string;
  primaryCta: CtaLink;
  /** Handwritten accent line beside the CTA. */
  scribble?: string;
  stats: string[];
}

export interface CityPickerSection {
  type: "cityPicker";
  heading: string;
  intro?: string;
  cities: CityPilot[];
}

export interface PilotSection {
  type: "pilot";
  id?: string;
  eyebrow?: string;
  heading: string;
  intro: string;
  pilot: CityPilot;
}

export interface HowItWorksSection {
  type: "howItWorks";
  eyebrow?: string;
  heading: string;
  intro?: string;
  steps: Step[];
  note?: string;
}

export interface BeliefsSection {
  type: "beliefs";
  heading: string;
  beliefs: string[];
}

export interface SafetySection {
  type: "safety";
  heading: string;
  body: string[];
}

export interface TeamSection {
  type: "team";
  heading: string;
  intro: string[];
  members: TeamMember[];
  closing?: string;
}

export interface FaqSection {
  type: "faq";
  heading: string;
  items: FaqItem[];
}

export interface PilotSignupSection {
  type: "pilotSignup";
  id: string;
  heading: string;
  body?: string;
  /** Pre-selected city (from the route); the visitor can still change it. */
  city?: CitySlug;
  note?: string;
}

export interface WaitlistCtaSection {
  type: "waitlistCta";
  id: string;
  heading: string;
  body?: string;
  submitLabel: string;
  note?: string;
}

export type Section =
  | HeroSection
  | CityPickerSection
  | PilotSection
  | HowItWorksSection
  | BeliefsSection
  | SafetySection
  | TeamSection
  | FaqSection
  | PilotSignupSection
  | WaitlistCtaSection;

export type SectionType = Section["type"];
