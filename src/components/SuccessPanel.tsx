"use client";

import { useEffect, useRef } from "react";
import type { SuccessMessage } from "@/content/types";

/**
 * Replaces a form once it's sent, so there's no doubt it went through: a big smiley, a
 * heading, what happens next. On mount it scrolls itself into view and takes focus, so
 * keyboard and screen-reader users land on it too.
 */
export function SuccessPanel({ message, name }: { message: SuccessMessage; name?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.focus({ preventScroll: true });
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  const heading = name
    ? message.heading.replace("{name}", name)
    : message.heading.replace(", {name}", "");

  return (
    <div ref={ref} className="done stack" role="status" aria-live="polite" tabIndex={-1}>
      <span className="done-face e" aria-hidden="true">
        k
      </span>
      <h3 className="h3">{heading}</h3>
      <p>{message.body}</p>
      {message.note ? <p className="small muted">{message.note}</p> : null}
    </div>
  );
}
