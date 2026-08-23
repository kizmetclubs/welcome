import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("renders its label and defaults to type=button", () => {
    render(<Button>Join the waitlist</Button>);
    const btn = screen.getByRole("button", { name: "Join the waitlist" });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveAttribute("type", "button");
  });

  it("applies the primary variant token class by default", () => {
    render(<Button>Go</Button>);
    expect(screen.getByRole("button", { name: "Go" })).toHaveClass("bg-accent-warm");
  });

  it("merges a className override without dropping base classes", () => {
    render(<Button className="w-full">Wide</Button>);
    const btn = screen.getByRole("button", { name: "Wide" });
    expect(btn).toHaveClass("w-full");
    expect(btn).toHaveClass("rounded-pill");
  });

  it("fires onClick", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Tap</Button>);
    screen.getByRole("button", { name: "Tap" }).click();
    expect(onClick).toHaveBeenCalledOnce();
  });
});
