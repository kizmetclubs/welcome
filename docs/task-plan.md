# Nearfolk — Landing Page MVP · Task Plan

_Companion to [`technical-spec.md`](./technical-spec.md). Ordered, checkable, grouped by milestone._

Legend: **S** ≈ <1h · **M** ≈ half-day · **L** ≈ 1–2 days. Dependencies noted as `⟵ #`.

---

## M0 — Foundation

_Goal: a deployable Next.js app whose look is 100% token-driven, with CI and a live preview URL._

- [x] **0.1 (S)** Confirm/adopt the existing `welcome` repo; create a **GitHub org** (not personal) and move it there. Add branch protection on `main`.
- [x] **0.2 (M)** Scaffold Next.js (App Router) + TypeScript + Tailwind CSS v4. Add ESLint + Prettier, `tsconfig` strict.
- [x] **0.3 (S)** Add `.env.example` documenting every var from spec §12. Wire `.env.local` loading.
- [x] **0.4 (M)** **Design-token layer (Axis A)**: `src/themes/tokens.css` with `:root` + `[data-theme]` blocks seeded from the mood-board palette; wire Tailwind v4 to resolve utilities to these variables. ⟵ 0.2
- [x] **0.5 (S)** `src/themes/registry.ts` + `nearfolk.ts`: theme config (font families, motif pack, OG image). `NEXT_PUBLIC_THEME` selects the active theme via `data-theme` on `<html>`; `?theme=` override enabled in dev/preview only. ⟵ 0.4
- [x] **0.6 (M)** Load `--font-display` + `--font-body` via `next/font` (start with closest Google Fonts to the boards; swap to licensed files later). ⟵ 0.4
- [x] **0.7 (M)** **Primitive components (Axis B)**: `Container`, `Section`, `Heading`(1–4), `Text`, `Eyebrow`, `Button`(primary/secondary/ghost), `Input`, `Card`, `Badge` — token-only, zero hardcoded colors. ⟵ 0.4
- [x] **0.8 (S)** Prove swappability: a throwaway `/_kitchensink` page that flips `?theme=` and shows tokens + primitives re-skinning with no code change. (Delete before launch.) ⟵ 0.7
- [x] **0.9 (M)** **CI**: GitHub Actions — typecheck → lint → test → build. ⟵ 0.2
- [ ] **0.10 (S)** Connect repo to **Vercel** (Hobby); confirm auto-deploy + per-PR preview URLs. Blank deploy is green. ⟵ 0.2

**M0 done when:** the preview URL is live and the kitchen-sink page re-skins entirely from a theme swap.

---

## M1 — Content model & sections

_Goal: the full narrative page renders from data, responsive and accessible, in placeholder design._

- [x] **1.1 (M)** **Content model (Axis C)**: typed `src/content/landing.ts` (ordered section list), `clubs.ts`, `faq.ts`. Copy re-pointed from the website-copy doc to **waitlist-primary**; keep `[bracketed]` founder TODOs visible. ⟵ 0.7
- [x] **1.2 (S)** `SectionRenderer.tsx` registry mapping `section.type` → component. Unknown type fails loudly in dev. ⟵ 1.1
- [x] **1.3 (M)** **Motifs (Axis A/C)**: `Arrow`, `Checkerboard`, `GrannySquare`, `Crane` as swappable SVG components in a "motif pack," `aria-hidden`, reduced-motion aware. ⟵ 0.7
- [x] **1.4 (M)** `Hero` section: headline/subhead/eyebrow, **primary CTA (waitlist)** + **secondary CTA (pilot Google Form via `PILOT_FORM_URL`)**, honest stat bar. ⟵ 1.2, 1.3
- [x] **1.5 (M)** `HowItWorks` section (app-framed, with "where we are today" note). ⟵ 1.2
- [x] **1.6 (M)** `Clubs` section from `clubs.ts` (pastry/walk/reading/crafts/Spanish cards). ⟵ 1.2
- [x] **1.7 (S)** `Beliefs` (manifesto lines). ⟵ 1.2
- [x] **1.8 (S)** `Safety` (plain-language stance: planned vs today). ⟵ 1.2
- [x] **1.9 (S)** `Team`/`Why` (founder story w/ placeholders). ⟵ 1.2
- [x] **1.10 (M)** `Faq` from `faq.ts` (accessible disclosure; distinguishes waitlist vs pilot). ⟵ 1.2
- [x] **1.11 (S)** `WaitlistCta` closing block (placeholder form until M2). ⟵ 1.2
- [x] **1.12 (S)** `Footer` (privacy link, pilot form, contact email, city note). ⟵ 1.2
- [x] **1.13 (M)** Responsive pass (mobile-first) + landmarks/headings/focus/reduced-motion across all sections. ⟵ 1.4–1.12

**M1 done when:** the whole page scrolls end-to-end on mobile, driven entirely by `content/*`.

---

## M2 — Waitlist (single opt-in)

_Goal: a real email from the live preview lands in Supabase, with friendly success/error states._

- [x] **2.1 (M)** Create **Supabase** project in **EU/Frankfurt**. Add `supabase/migrations/0001_waitlist.sql` (table + unique email index + RLS enabled, no anon policies) per spec §6.1.
- [x] **2.2 (S)** `lib/supabase.ts` server client using **service-role key** (server-only; never imported by client code). ⟵ 2.1
- [x] **2.3 (S)** `lib/validation.ts` shared **Zod** schema (email, `consent === true`, `city ∈ enum|null`). ⟵ 0.2
- [x] **2.4 (M)** `WaitlistForm.tsx`: email + optional city + **consent checkbox** + honeypot; idle/loading/success/error/invalid states; `aria-live`; token-styled. ⟵ 0.7, 2.3
- [x] **2.5 (M)** `POST /api/waitlist`: validate → honeypot + min-time check → **rate limit** → upsert (idempotent on email) → return state. ⟵ 2.2, 2.3
- [x] **2.6 (S)** `lib/ratelimit.ts` (Upstash free, or Postgres-counter fallback). ⟵ 2.5
- [x] **2.7 (S)** Wire the Hero + closing `WaitlistCta` to the real form. ⟵ 2.4
- [ ] **2.8 (S)** Configure Supabase env vars in Vercel; verify a submit from the **preview URL** writes a row. ⟵ 2.5, 0.10

**M2 done when:** a test signup on the deployed preview appears in the Supabase table and the UI confirms it.

---

## M3 — Email & double opt-in (flagged)

_Goal: confirmation flow built and testable, defaulting off until a domain exists._

- [ ] **3.1 (S)** `lib/resend.ts` + `WAITLIST_DOUBLE_OPTIN` flag (default **false**). ⟵ 2.5
- [ ] **3.2 (M)** On insert (flag on), generate `confirm_token`, send branded confirmation email via Resend. ⟵ 3.1
- [ ] **3.3 (M)** `/confirm?token=…` route: mark `confirmed=true, confirmed_at=now()`, clear token, show friendly confirmation page. ⟵ 3.2
- [ ] **3.4 (S)** Form success copy adapts: "Check your inbox" (flag on) vs "You're on the list" (flag off). ⟵ 3.2

**M3 done when:** with the flag on in a test env, a signup receives an email and confirming flips the row.

---

## M4 — Privacy, analytics, SEO, tests

_Goal: all success criteria (spec §2) met on the preview URL._

- [ ] **4.1 (M)** `/privacy` route — plain-language policy stub (collect/why/retention/never-sold/deletion) + one-paragraph records-of-processing note. Link from consent checkbox + footer.
- [ ] **4.2 (S)** Cookieless analytics (`lib/analytics.ts`, Plausible or Umami) + events from spec §8. ⟵ 4-ish
- [ ] **4.3 (S)** SEO: metadata, `robots.ts`, `sitemap.ts`, canonical.
- [ ] **4.4 (S)** Branded `opengraph-image.tsx` + favicon set + web manifest (icons only).
- [ ] **4.5 (S)** Accessibility pass: axe clean, keyboard walk-through, contrast check over tokens.
- [ ] **4.6 (M)** Tests: Zod + registry-integrity + theme-completeness (unit); `WaitlistForm` states (component); `/api/waitlist` (integration, mocked); Playwright happy-path + invalid-email (e2e). ⟵ 2.x
- [ ] **4.7 (S)** Add Lighthouse CI + axe to Actions; gate on ≥95 / AA. ⟵ 0.9, 4.6
- [ ] **4.8 (S)** _(Optional)_ Sentry SDK, low sample rate.

**M4 done when:** Lighthouse ≥95 across the board, a11y AA, CI green, privacy live.

---

## M5 — Design integration & launch

_Goal: swap in the real design and go public._

- [ ] **5.1 (M)** Receive Ash's **design-handoff** (spec §13): final tokens, fonts, motifs, OG, spacing scale.
- [ ] **5.2 (M)** Replace placeholder theme with the real `nearfolk` theme — **tokens + themes/\* + motif pack only**; verify no section/logic file needs editing (the swappability test). ⟵ 5.1
- [ ] **5.3 (S)** Fill remaining `[bracketed]` founder copy in `content/*`.
- [ ] **5.4 (S)** _(When domain lands)_ Buy domain, point Vercel, set SPF/DKIM/DMARC, verify Resend sender, flip `WAITLIST_DOUBLE_OPTIN` on. ⟵ 3.x
- [ ] **5.5 (S)** Remove `/_kitchensink`, final QA on real devices, launch. ⟵ all

**M5 done when:** the real design is live on the real domain with confirmed signups flowing.

---

## Cross-cutting / not-yet-scheduled

- [ ] **X.1** Asset ownership list (domain, GitHub org, Vercel, Supabase) to transfer to the company once incorporated.
- [ ] **X.2** Import pilot signups? — out of scope for the _page_; the app plan owns pilot-data import.
- [ ] **X.3** i18n (Spanish) — deferred; content + `locale` column already structured for it.
- [ ] **X.4** Self-serve unsubscribe/delete — app-era; MVP uses a manual process documented in `/privacy`.

---

## Suggested first working session

`M0.2 → M0.4 → M0.7 → M0.8` gets a token-driven, provably-swappable skeleton on a live Vercel preview in a single sitting — the fastest way to de-risk the "design in flux" requirement before any copy or backend work.
