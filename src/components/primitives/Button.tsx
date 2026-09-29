import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill font-body font-bold cursor-pointer " +
  "transition-transform duration-150 ease-out will-change-transform " +
  "hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-accent-warm text-accent-warm-ink shadow-card hover:brightness-105",
  secondary: "bg-brand text-brand-ink shadow-card hover:brightness-105",
  ghost: "bg-transparent text-ink ring-2 ring-inset ring-muted-soft hover:ring-brand",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-base",
  lg: "h-13 px-8 text-lg",
};

type ButtonProps = React.ComponentProps<"button"> & {
  variant?: Variant;
  size?: Size;
};

/** Token-styled button. Variants/sizes only; never a raw color. */
export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}

type LinkButtonProps = React.ComponentProps<"a"> & {
  variant?: Variant;
  size?: Size;
};

/** Anchor styled as a button — for CTAs that navigate (waitlist scroll, pilot form). */
export function LinkButton({
  variant = "primary",
  size = "md",
  className,
  ...props
}: LinkButtonProps) {
  return <a className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}
