/**
 * Content model. The page is DATA, not markup: landing.ts builds an ordered list of these
 * sections and <SectionRenderer> maps each `type` to a component. Reordering, adding, or
 * removing a whole section is a one-line edit; rewriting copy never touches a component.
 */

export type CitySlug = "barcelona" | "sanfrancisco";

/** Accent used for a club's checker band and button (design system category fills). */
export type ClubTone = "mustard" | "teal";

/** Section background ("base" is the cream page). */
export type Ground = "base" | "white" | "mustard" | "teal" | "chartreuse";

/**
 * What sits between a section and the one before it. Never a plain line: an animated
 * ribbon, a scalloped edge (from the ground above into the ground below), or the
 * signature checker band.
 */
export type Edge =
  | { kind: "ribbon"; tone: "chartreuse" | "coral"; reverse?: boolean }
  | { kind: "scallop"; from: Ground; to: Ground }
  | { kind: "checker" };

interface SectionBase {
  id?: string;
  /** Rendered by <SectionRenderer> just above the section, so edges follow the order. */
  edgeBefore?: Edge;
}

export interface CtaLink {
  label: string;
  /** In-page anchor (e.g. "#signup") or a path/URL. */
  href: string;
  external?: boolean;
}

/** Plain string, or runs where some parts are links. */
export type RichText = string | Array<string | { text: string; href: string }>;

export interface FaqItem {
  q: string;
  /** One entry per paragraph. */
  a: RichText[];
}

export interface TeamMember {
  name: string;
  role: string;
  location: CitySlug;
  detail: string;
  /** Square photo under /public/team. */
  photo?: string;
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
    blurb: string;
    tone: ClubTone;
  };
  dates: string[];
  time: string;
  place: string;
  cap: string;
  cost: string;
  /** City avatar: `src` under /public/cities; `monogram` is the fallback tile. */
  avatar: { src?: string; monogram: string };
  /** Short launch note ("Starts in November"). Shown on the city page, not the club cards. */
  status: string;
  /** City-appropriate loneliness stat from the pilot doc (never mixed across borders). */
  stat: string;
}

/* ── section variants (discriminated union on `type`) ─────────────────────── */

export interface HeroSection extends SectionBase {
  type: "hero";
  eyebrow?: string;
  headline: string;
  subheadline: string;
  primaryCta: CtaLink;
  /** Text link beside the CTA ("Be my best friend."). */
  scribble?: CtaLink;
  stats: string[];
  /** Small link under the stats, e.g. to the app waitlist. */
  footLink?: CtaLink;
}

export interface CityPickerSection extends SectionBase {
  type: "cityPicker";
  eyebrow?: string;
  heading: string;
  intro?: string;
  cities: CityPilot[];
  footnote?: string;
}

export interface PilotSection extends SectionBase {
  type: "pilot";
  eyebrow?: string;
  heading: string;
  intro: string;
  pilot: CityPilot;
}

export interface PilotSignupSection extends SectionBase {
  type: "pilotSignup";
  id: string;
  heading: string;
  body?: string;
  stepsHeading?: string;
  steps?: Step[];
  /** Pre-selected city (from the route); the visitor can still change it. */
  city?: CitySlug;
  /** Reassuring aside shown with a smiley ("Everyone's new the first time."). */
  aside?: string;
  submitLabel: string;
  /** Replaces the form once it's sent. */
  success: SuccessMessage;
}

/** Shown in place of a form after it's submitted. */
export interface SuccessMessage {
  heading: string;
  body: string;
  /** Small print under the message, e.g. what to do if nothing arrives. */
  note?: string;
}

export interface WaitlistContent {
  id: string;
  heading: string;
  body?: string;
  submitLabel: string;
  success: SuccessMessage;
  /** Shown instead of `success` when double opt-in sends a confirmation email. */
  confirmSent: SuccessMessage;
}

/**
 * "Pilot now, app next": what we do by hand for the pilot, what the app will do after it,
 * and the app waitlist for people who can't make the pilot.
 */
export interface NowNextSection extends SectionBase {
  type: "nowNext";
  id: string;
  eyebrow?: string;
  heading: string;
  intro?: string;
  now: { label: string; heading: string; body: string; points: string[]; cta: CtaLink };
  next: { label: string; heading: string; body: string };
  waitlist: WaitlistContent;
}

export interface Belief {
  title: string;
  body: string;
}

export interface BeliefsSection extends SectionBase {
  type: "beliefs";
  heading: string;
  beliefs: Belief[];
}

export interface StorySection extends SectionBase {
  type: "story";
  eyebrow: string;
  heading: string;
  then: { label: string; body: string; punch: string };
  now: { label: string; before: string; bubble: string; after: string };
  quoteIntro: string;
  quote: string;
  problem: string;
  chores: string[];
  choresSticker: string;
  answerHeading: string;
  answerBody: string;
  closing: { before: string; highlight: string; after: string };
}

export interface TeamSection extends SectionBase {
  type: "team";
  heading: string;
  members: TeamMember[];
  closing?: { heading: string; body: string };
}

export interface SafetySection extends SectionBase {
  type: "safety";
  heading: string;
  body: string[];
}

export interface ClosingCtaSection extends SectionBase {
  type: "closingCta";
  heading: string;
  body: string[];
  kicker: string;
  cta: CtaLink;
}

export interface FaqSection extends SectionBase {
  type: "faq";
  heading: string;
  items: FaqItem[];
}

export type Section =
  | HeroSection
  | CityPickerSection
  | PilotSection
  | PilotSignupSection
  | NowNextSection
  | BeliefsSection
  | StorySection
  | TeamSection
  | SafetySection
  | ClosingCtaSection
  | FaqSection;

export type SectionType = Section["type"];
