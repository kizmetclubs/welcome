import { cn } from "@/lib/cn";

type ContainerProps = React.ComponentProps<"div"> & {
  size?: "prose" | "default" | "wide";
};

const sizes = {
  prose: "max-w-2xl",
  default: "max-w-5xl",
  wide: "max-w-6xl",
} as const;

/** Centered, padded content column. */
export function Container({ size = "default", className, ...props }: ContainerProps) {
  return <div className={cn("mx-auto w-full px-5 sm:px-8", sizes[size], className)} {...props} />;
}
