"use client";

import { useEffect, useState } from "react";
import { type NavVariant, site } from "@/content/site";

const FROM_PARAM: Record<string, NavVariant> = {
  a: "header",
  b: "bar",
  c: "jump",
  header: "header",
  bar: "bar",
  jump: "jump",
};

/**
 * The navigation mockup to render: `site.navVariant`, unless the URL carries ?nav=a|b|c
 * (for comparing options on a preview). Read after mount so the static pages stay static.
 */
export function useNavVariant(): { variant: NavVariant; reviewing: boolean } {
  const [state, setState] = useState({ variant: site.navVariant, reviewing: false });
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("nav")?.toLowerCase();
    if (param && FROM_PARAM[param]) setState({ variant: FROM_PARAM[param], reviewing: true });
  }, []);
  return state;
}

/** Nav links for the current page: hash-only on landing pages, "/#…" anywhere else. */
export function navLinks(onLanding: boolean) {
  return site.nav.map((link) => ({ ...link, href: onLanding ? link.href : `/${link.href}` }));
}
