/**
 * Cookieless analytics wrapper (spec §8). Umami is the provider; this thin layer keeps it
 * swappable and safe to call when analytics isn't loaded (dev, or env unset) — it no-ops.
 * No PII is ever passed as event data.
 */
type UmamiWindow = Window & {
  umami?: { track: (event: string, data?: Record<string, unknown>) => void };
};

export function track(event: string, data?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  (window as UmamiWindow).umami?.track(event, data);
}
