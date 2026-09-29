import localFont from "next/font/local";

/**
 * Typography tokens (spec §4, Axis A), exposed as CSS variables that tokens.css references
 * through --nf-font-display / --nf-font-body.
 *
 * Self-hosted via next/font/local from the @fontsource-variable packages (OFL). Previously
 * these came from next/font/google, which fetches Google's font CSS at build time and
 * intermittently crashed CI ("Cannot read properties of null (reading '1')" in the Google
 * loader) when that request was rate-limited. Local files remove the network dependency:
 * the build is deterministic and no request ever goes to Google — at build or runtime.
 *
 * Swapping to Ash's final faces = change the two `src` paths here; nothing else references
 * a font family directly.
 */
export const fontDisplay = localFont({
  src: "../../node_modules/@fontsource-variable/fredoka/files/fredoka-latin-wght-normal.woff2",
  weight: "300 700",
  variable: "--font-display",
  display: "swap",
});

export const fontBody = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource-variable/nunito/files/nunito-latin-wght-normal.woff2",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource-variable/nunito/files/nunito-latin-wght-italic.woff2",
      style: "italic",
    },
  ],
  weight: "200 1000",
  variable: "--font-body",
  display: "swap",
});

export const fontVariables = `${fontDisplay.variable} ${fontBody.variable}`;
