import { cn } from "@/lib/cn";

type InputProps = React.ComponentProps<"input">;

/** Token-styled text input. Used by the waitlist form (M2). */
export function Input({ className, type = "text", ...props }: InputProps) {
  return (
    <input
      type={type}
      className={cn(
        "h-12 w-full rounded-pill border-2 border-muted-soft bg-surface px-5",
        "font-body text-base text-ink placeholder:text-muted",
        "transition-colors focus:border-brand focus:outline-none",
        className
      )}
      {...props}
    />
  );
}
