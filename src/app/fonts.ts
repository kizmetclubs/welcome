import localFont from "next/font/local";

/**
 * The four Kizmet faces (design system: tokens/typography.css), all self-hosted via
 * next/font/local so the build never calls Google and nothing loads from a third party.
 *
 *  - Instrument Serif — H1–H3, hero, wordmark        (@fontsource, OFL)
 *  - 42dot Sans       — H4–H6, body, UI, numbers     (@fontsource-variable, OFL)
 *  - Pixel Arial 14   — captions and metadata        (src/app/fonts, FontStruct free licence)
 *  - EmojiFont        — smileys j k l, sparkles and hearts M N R Q D B, ribbon W
 *                                                    (src/app/fonts, MIT)
 *
 * Each exposes a CSS variable (--ff-*) that src/styles/tokens.css maps onto the design
 * system's --font-display / --font-sans / --font-mono-code / --font-dingbat-emoji.
 */
export const fontDisplay = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--ff-display",
  display: "swap",
});

export const fontSans = localFont({
  src: "../../node_modules/@fontsource-variable/42dot-sans/files/42dot-sans-latin-wght-normal.woff2",
  weight: "300 800",
  variable: "--ff-sans",
  display: "swap",
});

export const fontPixel = localFont({
  src: "./fonts/PixelArial14.otf",
  weight: "400",
  variable: "--ff-pixel",
  display: "swap",
  adjustFontFallback: false,
});

// display: "block" — a dingbat face must never flash its fallback letters (j, k, M…).
export const fontEmoji = localFont({
  src: "./fonts/EmojiFont.ttf",
  weight: "400",
  variable: "--ff-emoji",
  display: "block",
  adjustFontFallback: false,
});

export const fontVariables = [fontDisplay, fontSans, fontPixel, fontEmoji]
  .map((font) => font.variable)
  .join(" ");
