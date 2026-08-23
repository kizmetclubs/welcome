import { cn } from "@/lib/cn";

type TextProps = React.ComponentProps<"p"> & {
  size?: "sm" | "base" | "lg";
  tone?: "ink" | "soft" | "muted";
  as?: "p" | "span" | "div";
};

const sizes = {
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg sm:text-xl",
} as const;

const tones = {
  ink: "text-ink",
  soft: "text-ink-soft",
  muted: "text-muted",
} as const;

/** Body copy in the body font. */
export function Text({
  size = "base",
  tone = "soft",
  as = "p",
  className,
  children,
  ...props
}: TextProps) {
  const Tag = as as React.ElementType;
  return (
    <Tag className={cn("font-body leading-relaxed", sizes[size], tones[tone], className)} {...props}>
      {children}
    </Tag>
  );
}
