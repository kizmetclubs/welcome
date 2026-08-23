import { cn } from "@/lib/cn";

type Level = 1 | 2 | 3 | 4;

type HeadingProps = React.ComponentProps<"h2"> & {
  /** Visual size + default tag (h1–h4). Matches the mood-board hierarchy. */
  level?: Level;
  /** Override the rendered tag without changing the visual size. */
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
};

const sizes: Record<Level, string> = {
  1: "text-4xl sm:text-6xl leading-[1.02] tracking-tight",
  2: "text-3xl sm:text-4xl leading-[1.08] tracking-tight",
  3: "text-2xl sm:text-3xl leading-tight",
  4: "text-xl sm:text-2xl leading-snug",
};

/** Display-font heading. `level` sets size; renders <h{level}> unless `as` overrides. */
export function Heading({ level = 2, as, className, children, ...props }: HeadingProps) {
  const Tag = (as ?? (`h${level}` as const)) as React.ElementType;
  return (
    <Tag
      className={cn("font-display text-ink font-semibold text-balance", sizes[level], className)}
      {...props}
    >
      {children}
    </Tag>
  );
}
