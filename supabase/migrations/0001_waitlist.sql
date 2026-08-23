-- Nearfolk waitlist — initial schema (spec §6.1).
-- Run in the Supabase project (EU / Frankfurt): SQL editor, or `supabase db push`.
-- Data minimization (mosaic test): email + a coarse city bucket + consent + timestamps.
-- No IP, no name, no precise location.

create extension if not exists "citext";

create table if not exists public.waitlist_signups (
  id            uuid primary key default gen_random_uuid(),
  email         citext not null,
  city          text check (city in ('barcelona', 'san_francisco', 'other')),
  source        text not null default 'landing',
  consent       boolean not null,
  confirmed     boolean not null default false,   -- double opt-in state (M3)
  confirm_token uuid default gen_random_uuid(),
  locale        text,
  created_at    timestamptz not null default now(),
  confirmed_at  timestamptz
);

-- One signup per email (makes the route's upsert idempotent).
create unique index if not exists waitlist_email_uidx on public.waitlist_signups (email);

-- Privacy enforced at the DB layer: RLS on, and NO policies for anon/authenticated.
-- All writes go through the server route using the service-role key, which bypasses RLS.
-- The public anon client therefore cannot read or write this table at all.
alter table public.waitlist_signups enable row level security;
revoke all on public.waitlist_signups from anon, authenticated;

-- Newer Supabase projects don't always auto-grant new tables to service_role, so grant it
-- explicitly. This is the role the server route (service-role/secret key) acts as; it
-- bypasses RLS, so no policies are needed for it — only the table privilege.
grant all privileges on public.waitlist_signups to service_role;
