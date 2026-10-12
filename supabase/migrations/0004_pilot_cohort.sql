-- San Francisco now runs two groups (cohorts), each meeting twice at its own venue:
--   group-1: Thu Oct 22 & 29, 7–8:30pm, The Green Heron (Haight-Ashbury)
--   group-2: Mon Nov 2 & 9, 7–8:30pm, Robber Baron (Polk Gulch)
-- Record which group each sign-up picked. Barcelona has a single group, so its rows stay null.
--
-- Also: sign-ups now confirm they understand the pilot is how we learn to build the app, and
-- agree to take part in surveys (`research_consent`). Earlier sign-ups never saw that box.
--
-- Run in the Supabase project (SQL editor) BEFORE deploying the code that writes these columns.

alter table public.pilot_signups
  add column if not exists cohort text
  check (cohort is null or cohort in ('group-1', 'group-2'));

comment on column public.pilot_signups.cohort is
  'Which group the person signed up for (cities with several groups); null for single-group cities.';
alter table public.pilot_signups
  add column if not exists research_consent boolean not null default false;

comment on column public.pilot_signups.research_consent is
  'Understands the pilot is research for building the app, and agreed to take part in surveys.';
comment on column public.pilot_signups.both_dates is
  'Can make both sessions of their group (the recurrence test).';

-- Everyone who signed up for San Francisco before the split goes into group 1.
update public.pilot_signups
  set cohort = 'group-1'
  where city = 'sanfrancisco' and cohort is null;
