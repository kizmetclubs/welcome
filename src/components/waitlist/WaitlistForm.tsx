"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Button, Input, Text } from "@/components/primitives";

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CITY_OPTIONS = [
  { value: "", label: "Where are you? (optional)" },
  { value: "barcelona", label: "Barcelona" },
  { value: "san_francisco", label: "San Francisco" },
  { value: "other", label: "Somewhere else" },
] as const;

/**
 * Waitlist form (spec §6.2). Posts to /api/waitlist, which validates, rate-limits, and
 * upserts into Supabase. Includes a honeypot + submit-time stamp for spam mitigation.
 */
export function WaitlistForm({ submitLabel }: { submitLabel: string }) {
  const emailId = useId();
  const cityId = useId();
  const consentId = useId();
  const statusId = useId();

  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const startedAt = useRef<number>(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const honeypot = new FormData(event.currentTarget).get("company");

    if (!EMAIL_RE.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!consent) {
      setError("Please tick the box so we can email you.");
      return;
    }

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
          startedAt: startedAt.current,
          company: honeypot ?? "",
        }),
      });
      if (res.ok) {
        setStatus("success");
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
        <Text size="lg" tone="ink" className="font-display font-semibold">
          You&apos;re on the list 🎉
        </Text>
        <Text size="sm" tone="muted" className="mt-1">
          We&apos;ll email you the moment Nearfolk opens.
        </Text>
      </div>
    );
  }

  const busy = status === "submitting";

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md text-left" noValidate>
      {/* honeypot — visually hidden, off keyboard + AT */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <label htmlFor={emailId} className="mb-2 block">
        <Text size="sm" tone="soft" as="span">
          Email address
        </Text>
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Input
          id={emailId}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? statusId : undefined}
          required
        />
        <Button type="submit" variant="primary" disabled={busy}>
          {busy ? "One sec…" : submitLabel}
        </Button>
      </div>

      <div className="mt-3">
        <label htmlFor={cityId} className="sr-only">
          Where are you?
        </label>
        <select
          id={cityId}
          name="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="rounded-pill border-muted-soft bg-surface font-body text-ink focus:border-brand h-11 w-full border-2 px-4 text-sm focus:outline-none"
        >
          {CITY_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <label htmlFor={consentId} className="mt-4 flex items-start gap-3">
        <input
          id={consentId}
          name="consent"
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-5 w-5 shrink-0 accent-[var(--nf-brand)]"
        />
        <Text size="sm" tone="muted" as="span">
          Email me when Nearfolk opens. I can unsubscribe anytime, and my email is never sold — see
          the{" "}
          <a className="underline" href="/privacy">
            privacy note
          </a>
          .
        </Text>
      </label>

      {error ? (
        <p id={statusId} role="alert" className="font-body text-accent-berry mt-3 text-sm">
          {error}
        </p>
      ) : null}
    </form>
  );
}
