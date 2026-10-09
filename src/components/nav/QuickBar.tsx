"use client";

import { useEffect, useState } from "react";
import { navLinks, useNavVariant } from "./useNavVariant";

/**
 * Option B: a sticky row of quick links under the header. Scrolls sideways on phones and
 * highlights the section you're reading.
 */
export function QuickBar({ onLanding }: { onLanding: boolean }) {
  const { variant } = useNavVariant();
  const [active, setActive] = useState<string | null>(null);
  const show = variant === "bar";

  useEffect(() => {
    if (!show || !onLanding) return;
    // Anchors land below the taller header.
    document.documentElement.style.scrollPaddingTop = "136px";
    const ids = navLinks(true).map((link) => link.href.slice(1));
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.35;
      // The section whose top is closest above the line (nav order isn't page order).
      let current: string | null = null;
      let best = -Infinity;
      for (const id of ids) {
        const top = document.getElementById(id)?.getBoundingClientRect().top;
        if (top !== undefined && top < line && top > best) {
          best = top;
          current = id;
        }
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.documentElement.style.scrollPaddingTop = "";
    };
  }, [show, onLanding]);

  if (!show) return null;
  return (
    <nav aria-label="Sections" className="quickbar">
      <div className="in">
        {navLinks(onLanding).map((link) => (
          <a
            key={link.href}
            href={link.href}
            aria-current={active && link.href === `#${active}` ? "true" : undefined}
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
