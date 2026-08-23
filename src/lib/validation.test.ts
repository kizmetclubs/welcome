import { describe, expect, it } from "vitest";
import { waitlistSchema } from "./validation";

describe("waitlistSchema", () => {
  it("accepts a valid signup and normalizes the email", () => {
    const result = waitlistSchema.safeParse({
      email: "  Hello@Example.COM ",
      consent: true,
      city: "barcelona",
    });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.email).toBe("hello@example.com");
  });

  it("accepts a missing or null city", () => {
    expect(waitlistSchema.safeParse({ email: "a@b.com", consent: true }).success).toBe(true);
    expect(waitlistSchema.safeParse({ email: "a@b.com", consent: true, city: null }).success).toBe(
      true
    );
  });

  it("rejects an invalid email", () => {
    expect(waitlistSchema.safeParse({ email: "nope", consent: true }).success).toBe(false);
  });

  it("rejects missing or false consent", () => {
    expect(waitlistSchema.safeParse({ email: "a@b.com", consent: false }).success).toBe(false);
    expect(waitlistSchema.safeParse({ email: "a@b.com" }).success).toBe(false);
  });

  it("rejects an unknown city", () => {
    expect(
      waitlistSchema.safeParse({ email: "a@b.com", consent: true, city: "paris" }).success
    ).toBe(false);
  });
});
