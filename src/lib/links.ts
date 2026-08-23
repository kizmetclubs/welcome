/**
 * Resolve the "PILOT_FORM" sentinel used in content to the real Google Form URL from
 * NEXT_PUBLIC_PILOT_FORM_URL. Content stays env-agnostic; if the form URL is unset, the
 * link resolves to null and the component hides its pilot CTA.
 */
export const PILOT_FORM_TOKEN = "PILOT_FORM";

export function resolveHref(href: string): string | null {
  if (href === PILOT_FORM_TOKEN) {
    const url = process.env.NEXT_PUBLIC_PILOT_FORM_URL;
    return url && url.length > 0 ? url : null;
  }
  return href;
}
