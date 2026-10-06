"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { pilots } from "@/content/pilot";
import type { CitySlug } from "@/content/types";
import { track } from "@/lib/analytics";

type Status = "idle" | "submitting" | "success" | "error";

const CITY_OPTIONS: { value: CitySlug; label: string }[] = [
  { value: "barcelona", label: "Barcelona" },
  { value: "sanfrancisco", label: "San Francisco" },
];

/**
 * Pilot sign-up (pilot doc, "short" field set). Posts to /api/pilot. The city pre-fills
 * from the route (`city` prop) but stays editable; the recruitment channel is captured
 * automatically from ?src= / utm_source on the URL.
 */
export function PilotSignupForm({
  city: initialCity,
  submitLabel,
  successMessage,
}: {
  city?: CitySlug;
  submitLabel: string;
  successMessage: { strong: string; rest: string };
}) {
  const datesId = useId();
  const statusId = useId();

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [city, setCity] = useState<CitySlug | "">(initialCity ?? "");
  const [neighborhood, setNeighborhood] = useState("");
  const [bothDates, setBothDates] = useState<"" | "yes" | "no">("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const startedAt = useRef(0);
  const source = useRef<string | null>(null);

  useEffect(() => {
    startedAt.current = Date.now();
    const params = new URLSearchParams(window.location.search);
    source.current = params.get("src") ?? params.get("utm_source");
  }, []);

  const pilot = city ? pilots[city] : null;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const honeypot = new FormData(event.currentTarget).get("company");

    if (!city) return setError("Please pick your city.");
    if (!bothDates) return setError("Let us know if you can make both dates.");
    if (!consent) return setError("Please tick the box so we can contact you about the pilot.");

    setError(null);
    setStatus("submitting");
    try {
      const res = await fetch("/api/pilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          email,
          whatsapp,
          city,
          neighborhood,
          bothDates: bothDates === "yes",
          consent,
          source: source.current,
          startedAt: startedAt.current,
          company: honeypot ?? "",
        }),
      });
      if (res.ok) {
        setStatus("success");
        track("pilot_signup", { city });
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
      className="card callout stack"
      style={{ padding: 32, gap: 20 }}
    >
      {/* honeypot — hidden from people, keyboards and assistive tech */}
      <div aria-hidden="true" className="hp">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="g2" style={{ gap: 20 }}>
        <label className="f">
          First name
          <input
            className="inp"
            autoComplete="given-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label className="f">
          Email
          <input
            className="inp"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
      </div>

      <div className="g2" style={{ gap: 20 }}>
        <label className="f">
          WhatsApp number
          <input
            className="inp"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder={city === "sanfrancisco" ? "+1 …" : "+34 …"}
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            required
          />
        </label>
        <label className="f">
          City
          <select
            className="inp"
            value={city}
            onChange={(e) => setCity(e.target.value as CitySlug | "")}
            required
          >
            <option value="">Pick one</option>
            {CITY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="f">
        Neighborhood
        <input
          className="inp"
          placeholder={city === "sanfrancisco" ? "e.g. the Mission" : "e.g. Gràcia"}
          value={neighborhood}
          onChange={(e) => setNeighborhood(e.target.value)}
          required
        />
      </label>

      <div className="stack" style={{ gap: 8 }}>
        <span className="flabel" id={datesId}>
          Can you make both Saturdays?{pilot ? ` (${pilot.dates.join(" & ")})` : ""}
        </span>
        <div className="seg" role="group" aria-labelledby={datesId}>
          {(["yes", "no"] as const).map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={bothDates === value}
              onClick={() => setBothDates(value)}
            >
              {value === "yes" ? "Yes" : "No"}
            </button>
          ))}
        </div>
      </div>

      <label className="chk">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        <span>
          Kizmet can contact me by email or WhatsApp about the pilot. My details are never sold. See
          the <Link href="/privacy">privacy note</Link>.
        </span>
      </label>

      {error ? (
        <p id={statusId} role="alert" className="small danger">
          {error}
        </p>
      ) : null}

      <button className="btn coral lg full" type="submit" disabled={busy || done}>
        {busy ? "One sec…" : submitLabel}
      </button>

      {done ? (
        <div className="okbox" role="status" aria-live="polite">
          <span className="e" aria-hidden="true" style={{ fontSize: 24 }}>
            k
          </span>
          <span>
            <b>{successMessage.strong}</b> {successMessage.rest}
          </span>
        </div>
      ) : null}
    </form>
  );
}
