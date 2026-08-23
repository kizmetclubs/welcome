import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client using the SERVICE-ROLE key (bypasses RLS for waitlist
 * writes). Never import this from a client component — the service-role key must never
 * reach the browser. It's read from a non-NEXT_PUBLIC env var, so Next won't inline it.
 */
let cached: SupabaseClient | null = null;

export function isWaitlistConfigured(): boolean {
  return Boolean(process.env.SUPABASE_URL?.trim() && process.env.SUPABASE_SERVICE_ROLE_KEY?.trim());
}

export function getServiceClient(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!url || !key) return null; // not wired to a project yet
  if (!cached) {
    cached = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return cached;
}
