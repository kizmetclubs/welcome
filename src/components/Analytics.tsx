import Script from "next/script";

/**
 * Loads Umami (cookieless, GDPR-friendly) only when configured. Umami auto-tracks page
 * views and any element with a data-umami-event attribute; custom events go through
 * lib/analytics `track()`. Renders nothing when the env vars are unset.
 */
export function Analytics() {
  const src = process.env.NEXT_PUBLIC_UMAMI_SRC;
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  if (!src || !websiteId) return null;
  return <Script defer src={src} data-website-id={websiteId} strategy="afterInteractive" />;
}
