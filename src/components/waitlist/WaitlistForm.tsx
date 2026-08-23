"use client";

import { useId, useState } from "react";
import { Button, Input, Text } from "@/components/primitives";

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Waitlist form UI. In M1 the submit is a client-side STUB (no network) so the closing CTA
 * is complete and testable. M2 (task 2.5) replaces `submit()` with a POST to /api/waitlist
 * and adds the optional city field; the markup, validation, and states stay as-is.
 */
export function WaitlistForm({ submitLabel }: { submitLabel: string }) {
  const emailId = useId();
  const consentId = useId();
  const statusId = useId();

  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function submit(formData: FormData) {
    // Honeypot: real users never fill a hidden field.
    if (formData.get("company")) return;

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
    // TODO(M2): POST { email, consent, city } to /api/waitlist and handle the response.
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div
        id={statusId}
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

  return (
    <form action={submit} className="mx-auto max-w-md text-left" noValidate>
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
        <Button type="submit" variant="primary" disabled={status === "submitting"}>
          {status === "submitting" ? "One sec…" : submitLabel}
        </Button>
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
