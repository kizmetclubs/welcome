/**
 * Theme registry — the named skins the site can wear (spec §4, Axis A).
 *
 * A theme is: a `data-theme` value (whose CSS variables live in tokens.css) plus
 * non-CSS config (which motif pack, a human label). The active theme is chosen by
 * NEXT_PUBLIC_THEME and applied as `data-theme` on <html> in layout.tsx.
 */

export type ThemeName = "default" | "alt";

export interface ThemeConfig {
  /** value written to <html data-theme="…"> */
  dataTheme: ThemeName;
  /** shown in the theme switcher / design tooling */
  label: string;
  /** which motif pack to render (hand-drawn SVGs); wired up in M1 */
  motifPack: "kizmet" | "minimal";
}

export const THEMES: Record<ThemeName, ThemeConfig> = {
  default: {
    dataTheme: "default",
    label: "Kizmet (mint)",
    motifPack: "kizmet",
  },
  alt: {
    dataTheme: "alt",
    label: "Warm cream",
    motifPack: "kizmet",
  },
};

export const THEME_NAMES = Object.keys(THEMES) as ThemeName[];

export const DEFAULT_THEME: ThemeName = "default";

/** Resolve a theme name from an untrusted string (env var, query param), safely. */
export function resolveTheme(value: string | undefined | null): ThemeName {
  if (value && value in THEMES) {
    return value as ThemeName;
  }
  return DEFAULT_THEME;
}
