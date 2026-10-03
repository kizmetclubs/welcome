"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Email waitlist for people outside the pilot cities. Posts to /api/waitlist, which
 * validates, rate-limits and upserts into Supabase. The optional free-text place is stored
 * as `other_place` (city bucket "other") so we can see which cities to open next.
 */
export function WaitlistForm({ submitLabel }: { submitLabel: string }) {
  const [email, setEmail] = useState("");
  const [place, setPlace] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [confirmSent, setConfirmSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const startedAt = useRef<number>(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const honeypot = new FormData(event.currentTarget).get("company");

    if (!EMAIL_RE.test(email)) return setError("Please enter a valid email address.");
    if (!consent) return setError("Please tick the box so we can email you.");

    setError(null);
    setStatus("submitting");
    const otherPlace = place.trim();
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          consent,
          city: otherPlace ? "other" : null,
          otherPlace: otherPlace || null,
          startedAt: startedAt.current,
          company: honeypot ?? "",
        }),
      });
      if (res.ok) {
        const ok = (await res.json().catch(() => null)) as { state?: string } | null;
        setConfirmSent(ok?.state === "confirm_sent");
        setStatus("success");
        track("waitlist_submit", { state: ok?.state ?? "joined" });
        return;
      }
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      setError(data?.error ?? "Something went wrong. Please try again.");
      setStatus("error");
    } catch {
      setError("Couldn't reach the server. Please try again.");
      setStatus("error");
    }
  }

  const busy = status === "submitting";
  const done = status === "success";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="stack"
      style={{ gap: 14, width: "100%", maxWidth: 440, textAlign: "left" }}
    >
      {/* honeypot — hidden from people, keyboards and assistive tech */}
      <div aria-hidden="true" className="hp">
        <label htmlFor="waitlist-company">Company</label>
        <input id="waitlist-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="f">
        Email address
        <div className="row" style={{ gap: 10, flexWrap: "nowrap" }}>
          <input
            className="inp"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="btn tomato" type="submit" disabled={busy || done}>
            {busy ? "One sec…" : submitLabel}
          </button>
        </div>
      </label>

      <label className="f">
        Where are you? (optional)
        <input
          className="inp"
          placeholder="City"
          maxLength={80}
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        />
      </label>

      <label className="chk">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        <span>
          Email me when Kizmet opens near me. I can unsubscribe any time, and my email is never
          sold. See the <Link href="/privacy">privacy note</Link>.
        </span>
      </label>

      {error ? (
        <p role="alert" className="small danger">
          {error}
        </p>
      ) : null}

      {done ? (
        <p className="small" role="status" aria-live="polite" style={{ fontWeight: 700 }}>
          {confirmSent
            ? "Almost there. Check your inbox to confirm."
            : "Got it. We'll be in touch."}{" "}
          <span className="e" aria-hidden="true" style={{ fontSize: 18, verticalAlign: "-.15em" }}>
            k
          </span>
        </p>
      ) : null}
    </form>
  );
}
