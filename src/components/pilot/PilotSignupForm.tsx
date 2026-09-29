"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { Button, Input, Text } from "@/components/primitives";
import { pilots } from "@/content/pilot";
import type { CitySlug } from "@/content/types";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";

type Status = "idle" | "submitting" | "success" | "error";

const CITY_OPTIONS: { value: CitySlug; label: string }[] = [
  { value: "barcelona", label: "Barcelona" },
  { value: "sanfrancisco", label: "San Francisco" },
];

const selectClass =
  "rounded-pill border-muted-soft bg-surface font-body text-ink focus:border-brand h-12 w-full border-2 px-5 text-base focus:outline-none";

/**
 * Pilot sign-up (pilot doc, "short" field set). Posts to /api/pilot. The city pre-fills
 * from the route (`city` prop) but stays editable; the recruitment channel is captured
 * automatically from ?src= / utm_source on the URL.
 */
export function PilotSignupForm({ city: initialCity }: { city?: CitySlug }) {
  const ids = {
    name: useId(),
    email: useId(),
    whatsapp: useId(),
    city: useId(),
    hood: useId(),
    dates: useId(),
    consent: useId(),
    status: useId(),
  };

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

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-card border-muted-soft bg-surface shadow-card border p-6 text-center"
      >
        <p className="font-display text-ink text-2xl font-semibold">You&apos;re in 🎉</p>
        <Text className="mt-3">
          Well, nearly — we place everyone by hand. Keep an eye on your inbox and WhatsApp for the
          details{pilot ? ` for ${pilot.club.name}` : ""}.
        </Text>
      </div>
    );
  }

  const busy = status === "submitting";
  const field = "block";
  const label = "font-body text-ink mb-1.5 block text-sm font-bold";

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-4">
      {/* honeypot — visually hidden, off keyboard + AT */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className={field}>
          <label htmlFor={ids.name} className={label}>
            First name
          </label>
          <Input
            id={ids.name}
            autoComplete="given-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className={field}>
          <label htmlFor={ids.email} className={label}>
            Email
          </label>
          <Input
            id={ids.email}
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className={field}>
          <label htmlFor={ids.whatsapp} className={label}>
            WhatsApp number
          </label>
          <Input
            id={ids.whatsapp}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+34 …"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            required
          />
        </div>
        <div className={field}>
          <label htmlFor={ids.city} className={label}>
            City
          </label>
          <select
            id={ids.city}
            value={city}
            onChange={(e) => setCity(e.target.value as CitySlug | "")}
            className={selectClass}
            required
          >
            <option value="" disabled>
              Pick one
            </option>
            {CITY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={field}>
        <label htmlFor={ids.hood} className={label}>
          Neighborhood
        </label>
        <Input
          id={ids.hood}
          placeholder={city === "sanfrancisco" ? "e.g. the Mission" : "e.g. Gràcia"}
          value={neighborhood}
          onChange={(e) => setNeighborhood(e.target.value)}
          required
        />
      </div>

      <fieldset>
        <legend className={label}>
          Can you make both Saturdays?{pilot ? ` (${pilot.dates.join(" & ")})` : ""}
        </legend>
        <div className="flex gap-2">
          {(["yes", "no"] as const).map((value) => (
            <label
              key={value}
              className={cn(
                "rounded-pill border-muted-soft font-body flex-1 cursor-pointer border-2 py-2.5 text-center text-base font-bold",
                bothDates === value ? "border-brand bg-brand text-brand-ink" : "bg-surface text-ink"
              )}
            >
              <input
                type="radio"
                name="bothDates"
                value={value}
                checked={bothDates === value}
                onChange={() => setBothDates(value)}
                className="sr-only"
              />
              {value === "yes" ? "Yes" : "No"}
            </label>
          ))}
        </div>
      </fieldset>

      <label htmlFor={ids.consent} className="flex items-start gap-3">
        <input
          id={ids.consent}
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-5 w-5 shrink-0 accent-[var(--nf-brand)]"
        />
        <Text size="sm" tone="muted" as="span">
          Kizmet can contact me by email or WhatsApp about the pilot. My details are never sold —
          see the{" "}
          <Link className="underline" href="/privacy">
            privacy note
          </Link>
          .
        </Text>
      </label>

      {error ? (
        <p
          id={ids.status}
          role="alert"
          className="font-body text-accent-berry text-sm font-semibold"
        >
          {error}
        </p>
      ) : null}

      <Button type="submit" size="lg" disabled={busy} className="mt-2 w-full sm:w-auto">
        {busy ? "One sec…" : "Join the pilot"}
      </Button>
    </form>
  );
}
