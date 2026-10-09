"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SuccessPanel } from "@/components/SuccessPanel";
import type { WaitlistContent } from "@/content/types";
import { track } from "@/lib/analytics";

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CITY_OPTIONS = [
  { value: "", label: "Pick one" },
  { value: "barcelona", label: "Barcelona" },
  { value: "san_francisco", label: "San Francisco" },
  { value: "other", label: "Somewhere else" },
] as const;

/**
 * App waitlist for people who can't make the pilot. Posts to /api/waitlist, which
 * validates, rate-limits and upserts into Supabase. Picking "Somewhere else" reveals a
 * free-text field, stored as `other_place`, so we can see which cities to open next.
 */
export function WaitlistForm({
  submitLabel,
  success,
  confirmSent: confirmMessage,
}: Pick<WaitlistContent, "submitLabel" | "success" | "confirmSent">) {
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [otherPlace, setOtherPlace] = useState("");
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
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          consent,
          city: city || null,
          otherPlace: city === "other" ? otherPlace : null,
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

  if (status === "success") {
    return <SuccessPanel message={confirmSent ? confirmMessage : success} />;
  }

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
          <button className="btn coral" type="submit" disabled={busy}>
            {busy ? "One sec…" : submitLabel}
          </button>
        </div>
      </label>

      <label className="f">
        Where are you? (optional)
        <select className="inp" value={city} onChange={(e) => setCity(e.target.value)}>
          {CITY_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      {city === "other" ? (
        <label className="f">
          Which city or area?
          <input
            className="inp"
            placeholder="e.g. Madrid, Oakland"
            maxLength={80}
            value={otherPlace}
            onChange={(e) => setOtherPlace(e.target.value)}
          />
        </label>
      ) : null}

      <label className="chk">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        <span>
          Email me when the Kizmet app launches. I can unsubscribe any time. See the{" "}
          <Link href="/privacy">privacy note</Link>.
        </span>
      </label>

      {error ? (
        <p role="alert" className="small danger">
          {error}
        </p>
      ) : null}
    </form>
  );
}
