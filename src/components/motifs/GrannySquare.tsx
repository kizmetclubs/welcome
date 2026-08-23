/** Granny-square / friendship-bracelet motif (from the mood board). Decorative, aria-hidden. */
export function GrannySquare({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="6" y="6" width="52" height="52" rx="4" />
      <rect x="18" y="18" width="28" height="28" rx="3" />
      <rect x="28" y="28" width="8" height="8" rx="2" fill="currentColor" stroke="none" />
      <path d="M6 6l12 12M58 6L46 18M6 58l12-12M58 58L46 46" />
    </svg>
  );
}
