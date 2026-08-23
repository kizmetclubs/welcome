/**
 * Minimal in-memory sliding-window rate limiter — defense-in-depth alongside the honeypot,
 * min-submit-time check, and unique-email idempotency.
 *
 * NOTE (spec §3): this is per-instance and resets on cold start, which is fine for MVP
 * anti-spam. The durable upgrade is Upstash Ratelimit or a Postgres counter keyed by the
 * hashed IP — swap the body here without touching callers.
 */
type Window = { count: number; resetAt: number };

const store = new Map<string, Window>();

export interface RateLimitResult {
  ok: boolean;
  retryAfter: number; // seconds
}

export function rateLimit(
  key: string,
  { limit = 5, windowMs = 60_000 }: { limit?: number; windowMs?: number } = {}
): RateLimitResult {
  const now = Date.now();
  const win = store.get(key);

  if (!win || win.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }
  if (win.count >= limit) {
    return { ok: false, retryAfter: Math.ceil((win.resetAt - now) / 1000) };
  }
  win.count += 1;
  return { ok: true, retryAfter: 0 };
}

/** Test helper — clear all windows. */
export function __resetRateLimit(): void {
  store.clear();
}
