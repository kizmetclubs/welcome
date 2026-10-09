"use client";

import { useEffect, useState } from "react";
import { navLinks, useNavVariant } from "./useNavVariant";

/**
 * Option A: section links in the header. Inline on wide screens; on phones a "Menu" button
 * opens them as a drop-down panel under the header.
 */
export function HeaderNav({ onLanding }: { onLanding: boolean }) {
  const { variant } = useNavVariant();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (variant !== "header") return null;
  const links = navLinks(onLanding);

  return (
    <>
      <nav aria-label="Sections" className="navlinks">
        {links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
      <button
        type="button"
        className="btn sm menu-btn"
        aria-expanded={open}
        aria-controls="section-menu"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "Close" : "Menu"}
      </button>
      {open ? (
        <nav id="section-menu" aria-label="Sections" className="menu-panel">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>
      ) : null}
    </>
  );
}
