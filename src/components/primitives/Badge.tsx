import { cn } from "@/lib/cn";

type Tone = "brand" | "gold" | "sky" | "pink" | "lime" | "neutral";

const tones: Record<Tone, string> = {
  brand: "bg-brand text-brand-ink",
  gold: "bg-accent-gold text-ink",
  sky: "bg-accent-sky text-ink",
  pink: "bg-accent-pink text-ink",
  lime: "bg-accent-lime text-ink",
  neutral: "bg-muted-soft text-ink-soft",
};

type BadgeProps = React.ComponentProps<"span"> & { tone?: Tone };

/** Small pill label — trust-bar chips, club tags. */
export function Badge({ tone = "neutral", className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "rounded-pill font-body inline-flex items-center px-3 py-1 text-sm font-semibold",
        tones[tone],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
