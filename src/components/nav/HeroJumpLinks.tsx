"use client";

import { navLinks, useNavVariant } from "./useNavVariant";

/** Option C: a "Jump to" row of links at the bottom of the hero card. Nothing sticky. */
export function HeroJumpLinks() {
  const { variant } = useNavVariant();
  if (variant !== "jump") return null;
  return (
    <nav aria-label="Jump to a section" className="jump">
      <span className="eyebrow">Jump to</span>
      {navLinks(true).map((link) => (
        <a key={link.href} href={link.href}>
          {link.label}
        </a>
      ))}
    </nav>
  );
}
