import { cn } from "@/lib/cn";

type EyebrowProps = React.ComponentProps<"p">;

/** Small label above a heading — the honest "early-stage" line lives here. */
export function Eyebrow({ className, children, ...props }: EyebrowProps) {
  return (
    <p
      className={cn(
        "font-body text-xs font-semibold uppercase tracking-[0.14em] text-brand",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}
