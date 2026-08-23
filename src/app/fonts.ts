import { Fredoka, Nunito } from "next/font/google";

/**
 * Typography tokens (spec §4, Axis A). Loaded via next/font (self-hosted, no layout
 * shift, no external request at runtime) and exposed as CSS variables that tokens.css
 * references through --nf-font-display / --nf-font-body.
 *
 * These are warm, friendly PLACEHOLDERS approximating the mood board. Swapping to Ash's
 * final faces = change the imports here; nothing else references a font family directly.
 */
export const fontDisplay = Fredoka({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const fontBody = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const fontVariables = `${fontDisplay.variable} ${fontBody.variable}`;
