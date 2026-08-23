/**
 * Canonical list of every design token (CSS custom property) a theme MUST define.
 *
 * This is the single source of truth the completeness test checks tokens.css against
 * (src/themes/tokens.test.ts). Add a token here + in tokens.css together, and the test
 * guarantees no [data-theme] block silently forgets one.
 */
export const REQUIRED_TOKENS = [
  // palette
  "--nf-brand",
  "--nf-brand-ink",
  "--nf-accent-warm",
  "--nf-accent-warm-ink",
  "--nf-accent-gold",
  "--nf-accent-sky",
  "--nf-accent-berry",
  "--nf-accent-pink",
  "--nf-accent-coral",
  "--nf-accent-lime",
  "--nf-accent-olive",
  // surfaces
  "--nf-canvas",
  "--nf-surface",
  "--nf-cream",
  "--nf-muted",
  "--nf-muted-soft",
  // ink
  "--nf-ink",
  "--nf-ink-soft",
] as const;

export type RequiredToken = (typeof REQUIRED_TOKENS)[number];
