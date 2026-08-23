import { z } from "zod";

/** City buckets — coarse by design (spec §6: neighborhood/city, never address). */
export const CITY_VALUES = ["barcelona", "san_francisco", "other"] as const;
export type City = (typeof CITY_VALUES)[number];

/**
 * Single source of truth for waitlist input, shared by the client form and the server
 * route. Consent must be exactly true (GDPR lawful basis); city is optional.
 */
export const waitlistSchema = z.object({
  email: z.string().trim().toLowerCase().email("Please enter a valid email address."),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please tick the box so we can email you." }),
  }),
  city: z.enum(CITY_VALUES).nullish(),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;
