# Kizmet — Landing Page MVP · Technical Spec

_Owner: Daniela · Status: Draft v1 · Last updated: 2026-08-22_

> This document is the source of truth for the first MVP of the Kizmet landing page.
> It is intentionally opinionated where the [High-Level Technical Plan](../../High%20Level%20Technical%20Plan%20v1.md) already decided things, and flags open questions where it hasn't.
> Companion: [`task-plan.md`](./task-plan.md) — the ordered, checkable build list.

---

## 1. Purpose & goals

The landing page is **two things at once**:

1. **A calling card** — a single, credible, on-brand page we can send to advisors, accelerators, press, and warm intros that explains what Kizmet is without overclaiming.
2. **A waitlist** — a place for interested people to leave their email so we can tell them when the real app launches.

The waitlist is **separate from the pilot**. The in-person Barcelona/SF pilots recruit through **Google Forms** (unchanged). This page's _primary_ action is "join the app waitlist"; the pilot appears as an honest _secondary_ call-to-action that links out to the pilot Google Form.

### Goals (what success looks like)

- A visitor understands, in under 30 seconds, what Kizmet is and why it's different.
- Joining the waitlist takes one field (email) and never feels like a form.
- The page reads as warm, cottagecore, and honest — never "tech bro."
- **The visual design can be swapped wholesale** (palette, fonts, motifs, section order, copy) without touching application logic — because the design is still in flux.
- Ships on free tiers with no domain, GDPR-clean from the first commit.

### Non-goals (explicitly out of scope for this MVP)

- The actual product (matching, clubs, coordination) — none of it.
- Authentication / member accounts.
- Payments, pricing pages, membership tiers.
- The pilot intake flow itself (stays in Google Forms).
- A CMS or admin UI for editing copy (copy lives in typed content files; editing is a code change for now).
- Full i18n / Spanish translation — _designed for_ but _deferred_ (see §12).
- Native app, PWA install prompts (the manifest/icons are cheap and included, but no install UX).

---

## 2. Success criteria

| Dimension                                       | Target                                                                         |
| :---------------------------------------------- | :----------------------------------------------------------------------------- |
| Time-to-interactive (mobile, mid-tier)          | < 2.5s                                                                         |
| Lighthouse (Perf / A11y / Best-practices / SEO) | ≥ 95 each                                                                      |
| Accessibility                                   | WCAG 2.1 AA (contrast, keyboard, focus, reduced-motion)                        |
| Waitlist submit → stored + acknowledged         | < 1s p95, with clear success/error states                                      |
| Design swap (palette + fonts + motifs)          | Achievable by editing **theme + content files only**, no component/logic edits |
| Cost                                            | $0 until a domain is bought (~$40/yr)                                          |
| Privacy                                         | No third-party trackers, no cookies requiring consent, EU-hosted signup data   |

---

## 3. Tech stack

Locked in line with the High-Level Technical Plan — this repo is the **seed of the eventual app repo**, so the marketing page and the future app share one codebase.

| Layer               | Choice                                                      | Notes                                                                                                             |
| :------------------ | :---------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------- |
| Framework           | **Next.js (App Router) + TypeScript**                       | SSR/SSG for SEO + fast first paint; one codebase for marketing + app                                              |
| Styling             | **Tailwind CSS v4** (CSS-first, variable-driven)            | Every Tailwind color/spacing/font maps to a CSS variable → theme swap is a variable swap. v3 acceptable fallback. |
| Hosting             | **Vercel** (Hobby/free)                                     | Auto-deploy from GitHub, preview URLs per PR for Ash to review designs                                            |
| DB (waitlist)       | **Supabase** (free, **EU / Frankfurt**)                     | Postgres table + Row-Level Security; GDPR-native                                                                  |
| Transactional email | **Resend** (free)                                           | Double opt-in confirmation; feature-flagged until a domain + verified sender exist                                |
| Analytics           | **Plausible or Umami** (cookieless)                         | No consent banner needed; no PII in events                                                                        |
| Rate limiting       | **Upstash Ratelimit** (free) _or_ Postgres-counter fallback | Spam mitigation without CAPTCHA (brand + privacy reasons)                                                         |
| Error tracking      | **Sentry** (free)                                           | Optional for a static-ish page; wire the SDK, sample low                                                          |
| Validation          | **Zod**                                                     | One schema shared by client form + server route                                                                   |
| Testing             | **Vitest + Testing Library + Playwright**                   | Unit, component, e2e; Lighthouse CI in Actions                                                                    |
| Lint/format         | **ESLint + Prettier** (or Biome)                            | Enforced in CI                                                                                                    |
| CI                  | **GitHub Actions**                                          | typecheck → lint → test → build; Vercel handles deploy                                                            |

**Why not a standalone static site?** The tech plan explicitly wants "one codebase for app + marketing pages." Keeping the landing page as the first Next.js commit means the GitHub org, Vercel project, and Supabase project are all set up once and reused when the app is built.

---

## 4. The design-swappability architecture (the important part)

The design is in flux, so **nothing visual is hardcoded**. Swappability is achieved on **three independent axes**, so Ash can change any one without breaking the others:

### Axis A — Design tokens (the _look_)

All color, typography, spacing, radius, shadow, and motion values live as **CSS custom properties**, defined once per theme.

```
src/themes/
  tokens.css        # :root { --color-…: … }  and  [data-theme="…"] { … } overrides
  registry.ts       # { default: kizmetTheme, alt: … } → maps name → font config + motif set
  kizmet.ts       # non-CSS theme config: which font families, which motif pack, OG image
```

- Tailwind v4 is configured so utilities resolve to these variables (`bg-brand`, `text-ink`, `rounded-card` → `var(--color-brand)` …). Components **never** contain a raw hex value.
- The active theme is chosen by a `data-theme` attribute on `<html>`, set from an env var (`NEXT_PUBLIC_THEME`) with an optional `?theme=` query override **in preview/dev only**, so Ash can flip between candidate skins on a live preview URL.
- Seed palette from the mood board (placeholder values, easy to replace):

  | Token                  | Hex                   | Role (starting point)                            |
  | :--------------------- | :-------------------- | :----------------------------------------------- |
  | `--color-brand`        | `#008E83`             | primary teal (accents, links, hand-drawn motifs) |
  | `--color-accent-warm`  | `#CD500D`             | burnt orange (primary CTA)                       |
  | `--color-accent-gold`  | `#EEB420`             | golden highlights                                |
  | `--color-accent-sky`   | `#45CAD3`             | cyan                                             |
  | `--color-accent-berry` | `#BA0038`             | crimson                                          |
  | `--color-accent-pink`  | `#EE8B95`             | pink                                             |
  | `--color-accent-coral` | `#EB695A`             | coral                                            |
  | `--color-accent-lime`  | `#CDD228`             | chartreuse                                       |
  | `--color-accent-olive` | `#B7A04C`             | olive                                            |
  | `--color-cream`        | `#F1D0B7`             | warm paper                                       |
  | `--color-canvas`       | `#E0F5F0`             | pale mint background                             |
  | `--color-muted`        | `#6D7E79` / `#DCE8E8` | slate / pale grey                                |
  | `--color-ink`          | `#1c1c1c`             | text                                             |

  > ⚠️ Contrast: several board colors are low-contrast on mint. Token values are placeholders; the **design-handoff contract (§13)** requires Ash to supply AA-passing foreground/background pairings, and CI runs an automated contrast check on the token set.

- Typography is tokenized too: `--font-display` (the distinctive pixel/display face from the boards) and `--font-body` (the geometric sans). Loaded via `next/font` (Google Fonts or self-hosted local files), referenced only through the token.

### Axis B — Primitive components (the _implementation_)

A small library of unstyled-except-via-tokens primitives that every section is built from:
`Container`, `Section`, `Heading` (levels 1–4 mapped to the board's hierarchy), `Text`, `Eyebrow`, `Button` (variants: primary/secondary/ghost), `Input`, `Card`, `Badge`. Swapping these changes the whole site's component behavior in one place.

### Axis C — Content + section registry (the _structure & words_)

All copy and page structure is **data, not markup**:

```
src/content/landing.ts    # typed: ordered list of sections, each with its copy/props
src/content/clubs.ts      # the pilot club cards
src/content/faq.ts
src/components/SectionRenderer.tsx  # registry: section.type → React component
```

- `landing.ts` exports an ordered array like `[{ type: 'hero', … }, { type: 'howItWorks', … }, …]`. `SectionRenderer` maps each `type` to a component.
- **Reordering, adding, or removing a whole section is a one-line data edit.** Rewriting copy never touches a component.
- Motifs (hand-drawn arrow, checkerboard, granny-square, crane) are **swappable SVG components** referenced by key from the theme's "motif pack," so a visual-language change swaps assets, not layout.

**Net effect:** a full redesign = edit `tokens.css` + `themes/*` + optionally reorder `landing.ts`. No section or logic file needs to change. That is the concrete meaning of "build it so the design can be swapped out."

---

## 5. Information architecture (page sections)

Re-pointed from the [existing website copy](../../Kizmet%20—%20Website%20Copy.md) toward the **app waitlist** (primary) with the **pilot** as a secondary CTA. Each is a registry section (Axis C).

1. **Hero** — Eyebrow ("An honest, early-stage project — no app yet"), Headline ("Clubs are back."), Subheadline, **primary CTA = Join the waitlist** (email field inline or scrolls to form), secondary link = "Running a pilot near you? Join it →" (Google Form). Stat/trust bar: "Barcelona & San Francisco · Clubs capped at 10."
2. **How it works** — the four-step / club mechanic, framed as the _app's_ promise (small, recurring, someone-else-organizes) with an honest "here's where we are today" note.
3. **What's running (the clubs)** — Pastry, Walk & Talk, Reading, Arts & Crafts, Spanish Conversation cards (from `clubs.ts`). Cottagecore card treatment.
4. **What we believe** — the manifesto lines (small groups not big rooms; same people more than once; not a dating app; honest about being early).
5. **A note on safety** — plain-language safety stance (ID verification/code-of-conduct _planned_; hands-on review _today_).
6. **Who we are / why** — founder story (placeholders preserved from copy for real details).
7. **FAQ** — from `faq.ts` (is there an app yet, cost, dating app?, etc.), re-pointed so answers distinguish waitlist vs pilot.
8. **Waitlist CTA (closing)** — the primary conversion block again: "Be first to know when Kizmet opens." Email + optional city + consent.
9. **Footer** — links: Privacy, pilot Google Form, contact email, city note.

> All copy is placeholder-friendly: the doc's `[bracketed]` bits stay as visible TODOs in `content/*` until the founders fill them.

---

## 6. Waitlist: data model & flow

### 6.1 Supabase schema (EU / Frankfurt)

`supabase/migrations/0001_waitlist.sql`:

```sql
create extension if not exists "citext";

create table public.waitlist_signups (
  id            uuid primary key default gen_random_uuid(),
  email         citext not null,
  city          text check (city in ('barcelona','san_francisco','other')) ,  -- nullable
  source        text default 'landing',        -- utm/source capture, no PII
  consent       boolean not null,              -- must be true to insert (enforced in route)
  confirmed     boolean not null default false,-- double opt-in state
  confirm_token uuid default gen_random_uuid(),
  locale        text,                          -- 'en' | 'es' for later
  created_at    timestamptz not null default now(),
  confirmed_at  timestamptz
);

-- one active signup per email
create unique index waitlist_email_uidx on public.waitlist_signups (email);

alter table public.waitlist_signups enable row level security;
-- No anon policies: all writes go through the server route using the service-role key.
-- (Table is not readable or writable by the anon/public client at all.)
```

**Data minimization (mosaic test):** we store email, an optional coarse city bucket, a source string, consent, and timestamps. We **do not** store IP address, user-agent, precise location, or any birthdate/name. Rate-limit keys (if IP-derived) are hashed and never persisted to this table.

### 6.2 Submit flow

```
WaitlistForm (client)
  → POST /api/waitlist            (server route, or a Server Action)
      → validate with shared Zod schema (email, consent === true, city ∈ enum|null)
      → honeypot + min-time-to-submit check  (bot mitigation, no CAPTCHA)
      → rate-limit (per hashed-IP token bucket)
      → upsert into waitlist_signups via service-role client (server-only key)
      → if DOUBLE_OPTIN flag on: send Resend confirmation email with /confirm?token=…
      → return { ok, state: 'confirm_sent' | 'joined' }
  → success UI:  "Check your inbox to confirm"  OR  "You're on the list 🎉"
  → error UI:    inline, friendly, retryable
```

### 6.3 Double opt-in (feature-flagged)

- `WAITLIST_DOUBLE_OPTIN` env flag. **Off by default until a domain exists**, because Resend deliverability from a shared/unverified sender is poor and would hurt the brand. With a real domain + SPF/DKIM/DMARC, flip it on.
- `/confirm?token=…` route sets `confirmed = true, confirmed_at = now()` for the matching token, then shows a friendly confirmation page. Tokens are single-use (cleared on confirm).
- With the flag **off**, single opt-in is used: explicit consent checkbox = lawful basis under GDPR; the row is stored `confirmed = true` immediately.

### 6.4 Spam mitigation (no CAPTCHA)

Honeypot field + time-to-submit heuristic + server-side rate limiting + basic email sanity/disposable-domain check. CAPTCHA is intentionally avoided — it's friction, and bot-detection challenges cut against the brand and the privacy posture.

---

## 7. Privacy & GDPR

- **EU-hosted** signup data (Supabase Frankfurt). No third-party trackers; cookieless analytics ⇒ **no cookie-consent banner required**.
- **Explicit consent** checkbox next to the email field, with a one-line purpose statement and a link to the privacy policy. Unchecked = cannot submit.
- **`/privacy` route** — plain-language policy stub: what we collect (email + optional city), why (to notify about launch), retention, "never sold," and how to unsubscribe / request deletion (email link for now; self-serve later). Written before the page takes any real signup.
- **Deletion path**: a documented manual process (delete row by email) for MVP; note in the plan that self-serve deletion is an app-era feature.
- **Records of processing** note kept alongside the privacy policy (one paragraph; the tech plan flags an hour with Sam's lawyer contact before real signups).

---

## 8. Analytics (cookieless)

Events (no PII): `page_view`, `waitlist_view` (form in viewport), `waitlist_submit`, `waitlist_confirmed` (on `/confirm`), `pilot_cta_click`, `faq_open`. Scroll-depth optional. A single `lib/analytics.ts` wrapper so the provider (Plausible vs Umami) is swappable via env.

---

## 9. Accessibility

WCAG 2.1 AA. Semantic landmarks (`header`/`main`/`footer`/`section` with headings), labelled form controls, visible focus states, `aria-live` for form success/error, full keyboard operability, `prefers-reduced-motion` disables the hand-drawn/scroll animations, alt text on meaningful illustrations (decorative motifs marked `aria-hidden`). Automated contrast check over the token palette runs in CI.

---

## 10. SEO & performance

- Per-page metadata (title, description), canonical, `robots.ts`, `sitemap.ts`.
- Branded **OpenGraph image** (`opengraph-image.tsx`, generated) + favicon set + web manifest (icons only, no install UX).
- Mobile-first, responsive; images optimized via `next/image`; fonts via `next/font` with `display: swap` and preConnect only to Google Fonts if used.
- SSG where possible (the whole page except the POST route is static). Target Lighthouse ≥ 95 across the board; Lighthouse CI gate in Actions.

---

## 11. Repo structure

```
/                            # this repo (seed of the app)
├─ docs/
│  ├─ technical-spec.md       # this file
│  └─ task-plan.md
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx            # <html data-theme> + fonts + analytics
│  │  ├─ page.tsx              # renders SectionRenderer over content/landing.ts
│  │  ├─ privacy/page.tsx
│  │  ├─ confirm/page.tsx      # double opt-in landing
│  │  ├─ api/waitlist/route.ts # POST handler (or a Server Action)
│  │  ├─ opengraph-image.tsx
│  │  ├─ sitemap.ts
│  │  └─ robots.ts
│  ├─ components/
│  │  ├─ primitives/           # Button, Section, Container, Heading, Text, Input, Card, Eyebrow, Badge
│  │  ├─ sections/             # Hero, HowItWorks, Clubs, Beliefs, Safety, Team, Faq, WaitlistCta, Footer
│  │  ├─ motifs/               # Arrow, Checkerboard, GrannySquare, Crane (swappable SVGs)
│  │  ├─ waitlist/WaitlistForm.tsx
│  │  └─ SectionRenderer.tsx
│  ├─ content/                 # landing.ts, clubs.ts, faq.ts  (all copy lives here)
│  ├─ themes/                  # tokens.css, registry.ts, kizmet.ts
│  ├─ lib/                     # supabase.ts, resend.ts, validation.ts, analytics.ts, ratelimit.ts
│  └─ styles/globals.css
├─ supabase/migrations/0001_waitlist.sql
├─ tests/                      # unit + component + e2e (Playwright)
├─ .github/workflows/ci.yml
└─ (next.config.ts, tailwind, tsconfig, .env.example, etc.)
```

---

## 12. Environments, config & secrets

`.env.example` (committed) documents every var; real values live in Vercel + local `.env.local` (git-ignored):

| Var                         | Scope           | Purpose                                        |
| :-------------------------- | :-------------- | :--------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`      | public          | canonical/OG, defaults to the `vercel.app` URL |
| `NEXT_PUBLIC_THEME`         | public          | active theme name (Axis A)                     |
| `SUPABASE_URL`              | server          | Supabase project (EU)                          |
| `SUPABASE_SERVICE_ROLE_KEY` | **server only** | waitlist writes; never shipped to client       |
| `RESEND_API_KEY`            | server          | confirmation email                             |
| `WAITLIST_DOUBLE_OPTIN`     | server          | `false` until domain/email DNS ready           |
| `PILOT_FORM_URL`            | public          | the pilot Google Form link (secondary CTA)     |
| `NEXT_PUBLIC_ANALYTICS_*`   | public          | Plausible/Umami domain/script                  |
| `UPSTASH_REDIS_*`           | server          | rate limiting (optional)                       |

**Domain**: none yet ⇒ everything runs on the free `*.vercel.app` URL. When Sam's naming survey lands, buy the domain, point Vercel at it, and set up SPF/DKIM/DMARC so double opt-in can be enabled. Nothing else blocks on the domain.

**i18n (deferred but designed-for)**: Barcelona is bilingual. Because all copy is in typed `content/*` files and rows carry a `locale`, adding Spanish later = add a locale dimension to content + a language switch; no structural rework.

---

## 13. Design-handoff contract (what Ash provides to make the swap trivial)

To make an eventual design "just work" against this architecture, the design deliverable should provide:

1. **Token values** — final hex for every `--color-*`, with AA-passing foreground/background pairings.
2. **Type** — the two font families (display + body), with either Google Fonts names or licensed font files, plus the size/weight scale for H1–H4 and body.
3. **Motif pack** — the hand-drawn SVGs (arrow, checkerboard, crane, granny-square/friendship-bracelet), exported clean.
4. **Spacing / radius / shadow** scale.
5. **OG image** + favicon source.
6. **Any per-section layout notes** (which motif sits where) — expressed as content props, not new components where possible.

Until then, we build against the mood-board placeholders above and a `default` theme.

---

## 14. Testing strategy

- **Unit**: Zod schema; content-registry integrity (every `section.type` has a component); theme token completeness (every theme defines every token); palette contrast check.
- **Component**: `WaitlistForm` states — idle/loading/success/error/invalid/honeypot; reduced-motion.
- **Integration**: `/api/waitlist` with mocked Supabase + Resend — happy path, duplicate email (idempotent), consent=false rejected, rate-limited.
- **E2E (Playwright)**: fill + submit → success; invalid email inline error; `/confirm?token` flow (flag on).
- **CI gates**: typecheck, lint, unit/component/integration, build, Lighthouse CI, accessibility (axe) on the built page.

---

## 15. Risks & open questions

| #        | Item                                         | Disposition                                                                                                 |
| :------- | :------------------------------------------- | :---------------------------------------------------------------------------------------------------------- |
| 1        | **Copy is pilot-shaped**                     | Re-pointed to waitlist-primary; founders fill `[bracketed]` story TODOs in `content/*`.                     |
| 2        | **No domain**                                | Build/deploy on `vercel.app`; double opt-in stays flagged off; single opt-in (consent) used until then.     |
| 3        | **Low-contrast brand colors on mint**        | Token placeholders + CI contrast gate; final pairings come from Ash (§13).                                  |
| 4        | **Deliverability without a verified sender** | Double opt-in behind a flag; enable after domain + SPF/DKIM/DMARC.                                          |
| 5        | **Pilot ↔ waitlist confusion for visitors**  | Distinct CTAs + FAQ answers that spell out the difference.                                                  |
| 6        | **Bus factor of one**                        | Everything in a GitHub org (not personal), README onboards a future dev, this spec is the contract.         |
| 7        | **Legal entity / GDPR formalities**          | Privacy policy + processing note before real signups; hour with Sam's lawyer contact (per tech plan).       |
| ~~OQ-A~~ | ~~Plausible vs Umami?~~                      | **Decided: Umami** (free hosted tier, cookieless). `lib/analytics.ts` still wraps it so it stays swappable. |
| ~~OQ-B~~ | ~~Server Action vs `/api/waitlist` route?~~  | **Decided: `/api/waitlist` route handler** (explicit rate-limit + easier testing).                          |
| OQ-C     | Sentry now or later?                         | **Decided: later.** Parked; wire the SDK post-MVP.                                                          |

---

## 16. Build order (milestones)

| Milestone                            | Ships                                                                                                      | Gate                                                                     |
| :----------------------------------- | :--------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------- |
| **M0 — Foundation**                  | Next.js+TS+Tailwind scaffold, token/theme system, primitives, CI, blank deploy to Vercel                   | Preview URL live; theme swap demonstrably works on a throwaway component |
| **M1 — Content & sections**          | Content model + section registry + all sections rendered with placeholder design, responsive, a11y         | Full page scrolls end-to-end on mobile from `content/*`                  |
| **M2 — Waitlist (single opt-in)**    | Supabase table + RLS + migration, `/api/waitlist`, form, validation, spam mitigation, success/error states | A real email lands in Supabase from the deployed preview                 |
| **M3 — Email / double opt-in**       | Resend integration + `/confirm` + flag (off until domain)                                                  | Flag-on works end-to-end in a test send                                  |
| **M4 — Privacy, analytics, SEO**     | `/privacy`, cookieless analytics, OG/favicon/sitemap/robots, Lighthouse pass, test suite green             | All success criteria (§2) met on the preview URL                         |
| **M5 — Design integration & launch** | Swap in Ash's real theme, polish, custom domain + email DNS (when available)                               | Public launch on the real domain                                         |

Each milestone ends with something deployable. If time is short, cut from the bottom: M5 design polish and M3 double opt-in are the safe things to defer; M2 (the waitlist) is the point of the page.

---

_See [`task-plan.md`](./task-plan.md) for the granular, ordered checklist._
