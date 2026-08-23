import { cn } from "@/lib/cn";

type InputProps = React.ComponentProps<"input">;

/** Token-styled text input. Used by the waitlist form (M2). */
export function Input({ className, type = "text", ...props }: InputProps) {
  return (
    <input
      type={type}
      className={cn(
        "rounded-pill border-muted-soft bg-surface h-12 w-full border-2 px-5",
        "font-body text-ink placeholder:text-muted text-base",
        "focus:border-brand transition-colors focus:outline-none",
        className
      )}
      {...props}
    />
  );
}
