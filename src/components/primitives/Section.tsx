import { cn } from "@/lib/cn";

type SectionProps = React.ComponentProps<"section"> & {
  tone?: "canvas" | "surface" | "cream" | "brand";
  spacing?: "sm" | "md" | "lg";
};

const tones = {
  canvas: "bg-canvas text-ink",
  surface: "bg-surface text-ink",
  cream: "bg-cream text-ink",
  brand: "bg-brand text-brand-ink",
} as const;

const spacings = {
  sm: "py-10 sm:py-14",
  md: "py-16 sm:py-24",
  lg: "py-20 sm:py-32",
} as const;

/** A full-width page band with a tonal background and vertical rhythm. */
export function Section({
  tone = "canvas",
  spacing = "md",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn(tones[tone], spacings[spacing], className)} {...props}>
      {children}
    </section>
  );
}
