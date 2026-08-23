"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/primitives";
import { DEFAULT_THEME, THEMES, THEME_NAMES, type ThemeName } from "@/themes/registry";

/**
 * Dev/design tool: flip the live `data-theme` on <html> with no reload, proving that a
 * full re-skin is a token swap (spec §4, Axis A). Shipped only on the kitchen-sink page.
 */
export function ThemeSwitcher() {
  const [active, setActive] = useState<ThemeName>(DEFAULT_THEME);

  useEffect(() => {
    const current = document.documentElement.dataset.theme as ThemeName | undefined;
    if (current && current in THEMES) setActive(current);
  }, []);

  function apply(name: ThemeName) {
    document.documentElement.dataset.theme = name;
    // Persist so the choice carries to the landing page (read by <ThemeInit> before paint).
    try {
      localStorage.setItem("nf-theme", name);
    } catch {
      // ignore (private mode / storage disabled)
    }
    setActive(name);
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {THEME_NAMES.map((name) => (
        <Button
          key={name}
          size="sm"
          variant={active === name ? "primary" : "ghost"}
          aria-pressed={active === name}
          onClick={() => apply(name)}
        >
          {THEMES[name].label}
        </Button>
      ))}
    </div>
  );
}
