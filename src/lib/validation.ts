import { z } from "zod";
import { pilots } from "@/content/pilot";

const shortText = (label: string, max: number) =>
  z
    .string()
    .trim()
    .min(1, `Please add your ${label}.`)
    .max(max, `Please keep your ${label} under ${max} characters.`);

/* ── app waitlist (people who can't make the pilot) ───────────────────────── */

/** City buckets — coarse by design (spec §6: neighborhood/city, never address). */
export const CITY_VALUES = ["barcelona", "san_francisco", "other"] as const;
export type City = (typeof CITY_VALUES)[number];

export const waitlistSchema = z.object({
  firstName: shortText("first name", 60),
  lastName: shortText("last name", 60),
  email: z.string().trim().toLowerCase().email("Please enter a valid email address."),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please tick the box so we can email you." }),
  }),
  city: z.enum(CITY_VALUES).nullish(),
  /** Free-text place when city is "other" (which city/region to open next). */
  otherPlace: z
    .string()
    .trim()
    .max(80, "Please keep the place under 80 characters.")
    .nullish()
    .transform((value) => (value ? value : null)),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;

/* ── pilot sign-up ────────────────────────────────────────────────────────── */

export const PILOT_CITY_VALUES = ["barcelona", "sanfrancisco"] as const;

/**
 * Single source of truth for the pilot form, shared by the client and the route. Kept to
 * the "short" field set: first and last name, email, WhatsApp, city, neighborhood, group (cities with
 * several groups), both dates, consent, and agreement to the pilot surveys.
 */
export const pilotSignupSchema = z
  .object({
    firstName: shortText("first name", 60),
    lastName: shortText("last name", 60),
    email: z.string().trim().toLowerCase().email("Please enter a valid email address."),
    whatsapp: z
      .string()
      .trim()
      .regex(/^\+?[\d\s().-]{7,20}$/, "Please enter a WhatsApp number with country code."),
    city: z.enum(PILOT_CITY_VALUES, { errorMap: () => ({ message: "Please pick your city." }) }),
    neighborhood: shortText("neighborhood", 80),
    bothDates: z.boolean({
      errorMap: () => ({ message: "Let us know if you can make both dates." }),
    }),
    consent: z.literal(true, {
      errorMap: () => ({ message: "Please tick the box so we can contact you about the pilot." }),
    }),
    /** Understands the pilot is research for the app, and agrees to the surveys. */
    researchConsent: z.literal(true, {
      errorMap: () => ({
        message: "Please tick the box to confirm you're up for the pilot surveys.",
      }),
    }),
    source: z.string().trim().max(80).nullish(),
    /** Which group, for cities that run several (see `cohorts` in content/pilot.ts). */
    cohort: z.string().trim().max(40).nullish(),
  })
  .superRefine((value, ctx) => {
    const cohorts = pilots[value.city].cohorts;
    if (!cohorts) return;
    if (!cohorts.some((cohort) => cohort.id === value.cohort)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["cohort"],
        message: "Please pick the group you can make.",
      });
    }
  })
  // Single-group cities never store a group.
  .transform((value) => ({
    ...value,
    cohort: pilots[value.city].cohorts ? (value.cohort ?? null) : null,
  }));

export type PilotSignupInput = z.infer<typeof pilotSignupSchema>;
