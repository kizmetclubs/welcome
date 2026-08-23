/**
 * Content model — Axis C of the swappability system (spec §4).
 *
 * The page is DATA, not markup: landing.ts exports an ordered list of these sections and
 * <SectionRenderer> maps each `type` to a component. Reordering, adding, or removing a
 * whole section is a one-line edit here; rewriting copy never touches a component.
 */

export interface CtaLink {
  label: string;
  /** In-page anchor (e.g. "#waitlist") or an external URL. */
  href: string;
  /** Set for external links (pilot form) so the renderer opens a new tab. */
  external?: boolean;
}

export interface Club {
  emoji: string;
  name: string;
  blurb: string;
  /** Placeholder until the pilot schedule is locked. */
  when: string;
  where: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface TeamMember {
  name: string;
  location: string;
  role: string;
  /** May contain [bracketed] TODOs for the founders to fill in. */
  detail: string;
}

export interface Step {
  title: string;
  body: string;
}

/* ── section variants (discriminated union on `type`) ─────────────────────── */

export interface HeroSection {
  type: "hero";
  eyebrow: string;
  headline: string;
  subheadline: string;
  primaryCta: CtaLink;
  /** Rendered only when its href resolves (pilot form URL may be unset). */
  secondaryCta?: CtaLink;
  note?: string;
  stats: string[];
}

export interface HowItWorksSection {
  type: "howItWorks";
  eyebrow?: string;
  heading: string;
  intro?: string;
  steps: Step[];
  note?: string;
}

export interface ClubsSection {
  type: "clubs";
  eyebrow?: string;
  heading: string;
  intro?: string;
  clubs: Club[];
  suggestion?: CtaLink;
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

export interface WaitlistCtaSection {
  type: "waitlistCta";
  /** Anchor target for the hero's primary CTA. */
  id: string;
  heading: string;
  body?: string;
  submitLabel: string;
  note?: string;
}

export type Section =
  | HeroSection
  | HowItWorksSection
  | ClubsSection
  | BeliefsSection
  | SafetySection
  | TeamSection
  | FaqSection
  | WaitlistCtaSection;

export type SectionType = Section["type"];
