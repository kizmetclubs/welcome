/**
 * Resolve the canonical site URL, robustly. Order of preference:
 *   1. NEXT_PUBLIC_SITE_URL (explicit; wins once a real domain is set)
 *   2. VERCEL_PROJECT_PRODUCTION_URL / VERCEL_URL (auto-provided by Vercel builds)
 *   3. http://localhost:3000 (local dev)
 *
 * Guards against the empty-string case: `??` only catches null/undefined, so an env var
 * set to "" on Vercel used to slip through and blow up `new URL("")`. This never returns
 * an empty or invalid value.
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return stripTrailingSlash(explicit);

  const vercelHost =
    process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim() || process.env.VERCEL_URL?.trim();
  if (vercelHost) return `https://${stripTrailingSlash(vercelHost)}`;

  return "http://localhost:3000";
}

function stripTrailingSlash(value: string): string {
  return value.replace(/\/+$/, "");
}
