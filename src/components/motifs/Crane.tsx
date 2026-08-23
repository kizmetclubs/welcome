/** Paper-crane motif (from the mood board). Decorative, aria-hidden. */
export function Crane({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M8 40c10-4 20-6 30-4l20-18" />
      <path d="M38 36l12 20 8-24 14-6-22-4" />
      <path d="M38 36L20 20" />
      <path d="M8 40l30-4" />
    </svg>
  );
}
