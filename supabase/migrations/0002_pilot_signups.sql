-- Kizmet pilot sign-ups (pilot planning doc, Sep 2026). One row per sign-up.
-- Run in the Supabase project: SQL editor, or `supabase db push`.
-- Short on purpose: every extra field is a chance for someone to quit halfway through.

create table if not exists public.pilot_signups (
  id            uuid primary key default gen_random_uuid(),
  first_name    text not null,
  email         citext not null,
  whatsapp      text not null,               -- for the club thread + lightweight verification
  city          text not null check (city in ('barcelona', 'sanfrancisco')),
  neighborhood  text not null,               -- coarse, for matching + tracking which areas convert
  club          text not null,               -- the one club running in that city at sign-up time
  both_dates    boolean not null,            -- "can you make both Saturdays?" (the recurrence test)
  consent       boolean not null,            -- agreed to be contacted about the pilot
  source        text,                        -- recruitment channel, from ?src= / utm_source
  created_at    timestamptz not null default now()
);

-- One sign-up per email per city (re-submitting updates rather than duplicating).
create unique index if not exists pilot_signups_email_city_uidx
  on public.pilot_signups (email, city);

alter table public.pilot_signups enable row level security;
revoke all on public.pilot_signups from anon, authenticated;
grant all privileges on public.pilot_signups to service_role;
