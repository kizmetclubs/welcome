-- Ask for first and last name on both forms (Oct 2026).
--   pilot_signups already has first_name; add last_name.
--   waitlist_signups had no name at all; add both.
-- Nullable: rows from before this change have no names. The API requires both for new
-- sign-ups.
-- Run in the Supabase project (SQL editor) BEFORE deploying the code that writes these columns.

alter table public.pilot_signups
  add column if not exists last_name text;

alter table public.waitlist_signups
  add column if not exists first_name text,
  add column if not exists last_name text;
