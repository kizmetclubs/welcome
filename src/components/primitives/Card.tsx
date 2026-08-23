import { cn } from "@/lib/cn";

type CardProps = React.ComponentProps<"div"> & {
  tone?: "surface" | "cream" | "canvas";
};

const tones = {
  surface: "bg-surface",
  cream: "bg-cream",
  canvas: "bg-canvas",
} as const;

/** Soft, rounded content card — the cottagecore club-card container. */
export function Card({ tone = "surface", className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-card border-muted-soft shadow-card border p-6 sm:p-8",
        tones[tone],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
