/**
 * Hand-drawn motif pack (spec §4). Decorative only — always aria-hidden. These are clean
 * placeholders approximating the mood board; Ash's real SVGs drop in here without touching
 * any section. They inherit color via `currentColor`, so tone follows the theme.
 */
export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 60"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M6 42c26 6 62-2 96-30" />
      <path d="M78 4c8 4 16 6 24 8-6 6-11 13-14 22" />
    </svg>
  );
}
