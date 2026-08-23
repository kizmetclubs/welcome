import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge class names, resolving conflicting Tailwind utilities in favor of the last one.
 * Standard `cn()` helper (clsx + tailwind-merge) so primitives can accept `className`
 * overrides without duplicate/conflicting utilities.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
