import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { THEME_NAMES } from "./registry";
import { REQUIRED_TOKENS } from "./tokens";

/**
 * Swap-contract guard: every theme in the registry must define every required token in
 * tokens.css. If a redesign adds a [data-theme] block that forgets a token, this fails
 * loudly instead of shipping a half-skinned page.
 */
const cssPath = join(process.cwd(), "src/themes/tokens.css");
const css = readFileSync(cssPath, "utf8");

/** Extract the body of a `[data-theme="name"]` (or :root) block from the CSS. */
function blockFor(theme: string): string {
  // default theme shares the `:root, [data-theme="default"]` selector
  const selector =
    theme === "default"
      ? /:root,\s*\[data-theme="default"\]\s*\{([\s\S]*?)\}/
      : new RegExp(`\\[data-theme="${theme}"\\]\\s*\\{([\\s\\S]*?)\\}`);
  const match = css.match(selector);
  return match?.[1] ?? "";
}

describe("design tokens", () => {
  it("registry lists at least the default and an alternate theme", () => {
    expect(THEME_NAMES).toContain("default");
    expect(THEME_NAMES.length).toBeGreaterThanOrEqual(2);
  });

  for (const theme of THEME_NAMES) {
    it(`theme "${theme}" defines every required token`, () => {
      const body = blockFor(theme);
      expect(body, `no [data-theme="${theme}"] block found in tokens.css`).not.toBe("");
      const missing = REQUIRED_TOKENS.filter((token) => !body.includes(`${token}:`));
      expect(missing, `missing tokens in "${theme}"`).toEqual([]);
    });
  }
});
