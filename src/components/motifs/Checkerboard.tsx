/** Checkerboard strip motif (from the mood board). Decorative, aria-hidden. */
export function Checkerboard({ className }: { className?: string }) {
  const cells = [];
  const cols = 12;
  const rows = 2;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if ((r + c) % 2 === 0) {
        cells.push(<rect key={`${r}-${c}`} x={c * 10} y={r * 10} width="10" height="10" />);
      }
    }
  }
  return (
    <svg
      className={className}
      viewBox="0 0 120 20"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="none"
    >
      {cells}
    </svg>
  );
}
