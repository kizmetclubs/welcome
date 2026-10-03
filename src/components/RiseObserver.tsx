"use client";

import { useEffect } from "react";

/**
 * Plays the "settle in" animation the first time each `.rise` element scrolls into view
 * (design artifact: kz-settle). Mounted once per page; renders nothing. Mirrors the
 * artifact's script, including the fallback that reveals anything already on screen.
 */
export function RiseObserver() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".rise"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("on");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" }
    );

    const onEnd = (event: AnimationEvent) => {
      if (event.animationName === "kz-settle") {
        (event.currentTarget as HTMLElement).classList.remove("rise", "on");
      }
    };
    for (const el of elements) {
      observer.observe(el);
      el.addEventListener("animationend", onEnd);
    }

    const fallback = window.setTimeout(() => {
      for (const el of document.querySelectorAll<HTMLElement>(".rise:not(.on)")) {
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("on");
      }
    }, 1500);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
      for (const el of elements) el.removeEventListener("animationend", onEnd);
    };
  }, []);

  return null;
}
