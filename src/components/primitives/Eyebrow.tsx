import { cn } from "@/lib/cn";

type EyebrowProps = React.ComponentProps<"p">;

/** Small label above a heading — the honest "early-stage" line lives here. */
export function Eyebrow({ className, children, ...props }: EyebrowProps) {
  return (
    <p
      className={cn(
        "font-body text-brand text-xs font-semibold tracking-[0.14em] uppercase",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}
