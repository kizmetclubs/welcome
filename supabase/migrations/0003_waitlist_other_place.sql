-- Waitlist: free-text place for people who pick "Somewhere else", so we can see which
-- cities to open next. Coarse and optional (a city/region, never an address).
alter table public.waitlist_signups
  add column if not exists other_place text;
