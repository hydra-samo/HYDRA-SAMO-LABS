# 30 — Mobile Slideshow & Dock Navigation Report

| Field | Value |
| --- | --- |
| Orchestrator | `OUTPUT/30_MOBILE_SLIDESHOW.md` |
| Scope | Mobile-only (`< md`) navigation & section redesign: bottom dock with icon+label buttons, section slideshow with crossfade, static compact top bar on the home slide, hamburger menu removed |
| Primary rule | **Desktop must remain intact** — every change is gated below `md`; `md+` flow is byte-for-byte unchanged |
| Status | **MOBILE SLIDESHOW SHIPPED** |
| Naming note | Numbered **30**, not 29 — `OUTPUT/29_LOGO_LOCKUP_SYSTEM.md` already exists and is a frozen governance document (logo lockup system, commit `d3fc6c5`). Do not overwrite it; 30 is the next free sequential report after 28. |

## Executive Summary

The mobile experience was redesigned as a slide-based, minimal interface. On phones (< `md`, 48rem) the site no longer scrolls between sections: each section is a full-viewport slide and the bottom dock fades between them. The old floating navbar + hamburger drawer on mobile was replaced by a compact static top bar that lives **inside the home slide only** (logo, theme toggle, compact language switcher, Start Project button — no links, no menu). The lucide hamburger (`Menu`/`X`) and its drawer are gone. Desktop (`md+`) keeps the exact same fixed floating nav, section anchors, and single-scroll flow — all mobile behavior is implemented behind `hidden md:block` / `block md:hidden` wrappers and a `.mobile-slide` CSS class that is inert at `md+`.

Per DESIGN.md, the dock uses the dark bio-organic editorial language: glassmorphic pill (`bg-[var(--card-bg)]/90` + `backdrop-blur-xl` + `border-[var(--border-color)]`), emerald (`--accent`) active state with a small underdot, lucide glyphs (`Home`, `Film`, `Mic`, `Layers`, `User`), Manrope caps labels with `tracking-widest`, and `min-h-[44px]` touch targets. No SaaS eyebrow pills, no numbered badges, no location badges, no emoji.

## Requirements Implemented

| Requirement | Implementation |
| --- | --- |
| Replace navbar with a dock on mobile | `src/components/MobileDock.tsx` — fixed bottom glass pill, `md:hidden` |
| Sections live in the dock | Home / Work / Voice / Process / Origin (uses `nav.home`, `nav.work`, `nav.voice`, `nav.process`, `nav.origin` translation keys) |
| Clicking a section fades into it instead of scrolling | `App.tsx` `activeSlide` state + `.mobile-slide-enter` fade animation (0.4 s, `cubic-bezier(0.22,1,0.36,1)`, 14 px rise), disabled under `prefers-reduced-motion` |
| Minimal interface, no page scroll between sections | `.mobile-slide` = `height:100dvh`, `overflow-y:auto` fallback only; Lenis smooth scroll skipped below `md` |
| Remove the lucide/hamburger menu from the nav bar | `Navigation.tsx` no longer imports `Menu`/`X`; drawer and `useState` menu state removed |
| Keep nav on mobile, but static (doesn't follow scroll), shown on hero only | New `compact` variant renders inside the home slide as a static `relative` top pill; not `fixed`, so it never follows scroll and disappears on other slides |
| Keep Start Project button + brief screen intact | Compact bar keeps the Start Project CTA wired to `onOpenBrief`; `ContactSection` lazy modal untouched |
| Add icons with labels in the dock | Every dock button renders a lucide icon + uppercase label + active dot |
| Desktop screens unchanged | All mobile elements are `md:hidden`; all desktop elements `hidden md:block`; `.mobile-slide` resets to `height:auto; overflow:visible; padding-bottom:0` at `48rem+`; section padding/margins revert via `md:` classes |
| Generate a numbered report + prompt markdown | `OUTPUT/30_MOBILE_SLIDESHOW_REPORT.md` + `OUTPUT/30_MOBILE_SLIDESHOW.md` |

## Design Compliance (DESIGN.md)

- **Dock**: glass card recipe — `bg-[var(--card-bg)]/90`, `backdrop-blur-xl`, `border-[var(--border-color)]`, soft drop shadow that is disabled in dark mode; emerald active accent only.
- **Touch targets**: all dock buttons `min-h-[52px]`, compact nav controls `min-h-[44px]`.
- **Typography**: labels Manrope (`font-sans`), `text-[10px]`, `uppercase`, `tracking-widest`, `font-medium`.
- **Iconography**: lucide-react stock components only (`Home`, `Film`, `Mic`, `Layers`, `User`); no hand-rolled SVG glyphs, no emoji.
- **Brand mark**: the compact bar pairs the full frozen `HydraLogo` mark with the "HYDRA SAMO" wordmark at `sm+` (mark only below `sm`) — the single allowed nav lockup; the mark is never cropped or re-scaled beyond the frozen frame.
- **Forbidden tropes verified absent**: `// SELECTED WORKS`-style eyebrow pills, numbered badges (`01`), location/country badges, neon cyan `#00FFCC` / bright blue gradients.

## Files Changed

| File | Change |
| --- | --- |
| `src/components/MobileDock.tsx` | **New** — bottom dock (`md:hidden`), icon + label per item, active emerald state, `aria-current`/`aria-pressed`, safe-area padding |
| `src/components/Navigation.tsx` | Rewritten — hamburger drawer + `Menu`/`X` removed; added `compact` static top-bar variant (logo, theme, compact language pills, Start Project); desktop variant unchanged |
| `src/App.tsx` | Slideshow state (`activeSlide`), `MobileSlide` wrapper (visibility + fade-in + scroll-top on switch), dual render `block md:hidden` slideshow vs `hidden md:block` desktop; desktop floating nav wrapped `hidden md:block`; compact nav mounted in the home slide only |
| `src/index.css` | `.mobile-slide` (100dvh, internal overflow fallback, dock clearance padding), `.mobile-slide-enter` + `@keyframes mobile-slide-in`, `@media (min-width: 48rem)` inert reset, `prefers-reduced-motion` reset |
| `src/i18n/translations.ts` | Added `nav.home` for en/fr/ar |
| `src/hooks/useLenis.ts` | Skipped below `(min-width: 48rem)` — slideshow sections scroll natively, no page scroll to smooth |
| `src/components/Hero.tsx` | `min-h-0` + `pt-10` base, `md:min-h-screen` + `md:pt-32` restore desktop |
| `src/components/WorkGallery.tsx` | Section/header/empty-state padding compacted below `md` |
| `src/components/VoiceOverSection.tsx` | Section padding compacted below `md` |
| `src/components/ProcessSection.tsx` | Section/header/steps padding compacted below `md` |
| `src/components/AboutSection.tsx` | Section/gap/portrait/heading/adv-grid compacted below `md` (portrait scales `w-40 sm:w-56` on phones) |

## Desktop Invariance

Verified in source and in the built CSS:

- Every mobile-only element is wrapped in `md:hidden` / `hidden md:block` (Tailwind `md` = `min-width: 48rem`).
- `.mobile-slide` is fully inert at `48rem+` (`height:auto; overflow:visible; padding-bottom:0`).
- All responsive compactions use `md:`-gated classes, so base values below `md` only affect phones/tablets; desktop values equal the previous `sm:`/base values.
- `@media (min-width: 48rem)` appears in the built CSS alongside `40/48/64/80/96rem` breakpoints — no `select-variant` syntax regressions.

## Performance & Validation

| Check | Result |
| --- | --- |
| `npm run lint` (`tsc --noEmit`) | Clean |
| `npm run build` | Clean, 2103 modules |
| Main JS `index-*.js` | 476.26 kB (gzip 151.16) |
| CSS `index-*.css` | 72.38 kB (gzip 11.97) |
| Lazy `VideoModal-*.js` | 8.53 kB (gzip 2.67) |
| Lazy `ContactSection-*.js` | 10.65 kB (gzip 2.99) |
| Built CSS media queries | Standard `min-width: 40rem`/`48rem` form (LightningCSS-normalized) |
| Low-tier interplay | `useLenis` still skipped on low tier; compact nav respects `useReducedMotion`; dock uses no heavy physics |

Bundle growth vs previous pass is +2.6 kB raw main JS (+0.6 kB gzip) — the cost of the dock/slideshow wiring and `nav.home` keys; CSS +3.43 kB raw (+0.6 kB gzip) for the `.mobile-slide` system.

## Release Sync

- Changed files mirrored into `RELEASE/HYDRA_SAMO_BRAND_v1.0/SOURCE_CODE/` (see git commit).
- `RELEASE/HYDRA_SAMO_BRAND_v1.0.zip` regenerated to include `MobileDock.tsx`.
- Committed and pushed to `origin/main` (deploy workflow auto-runs).

---

# Addendum — v1.1 (Mobile Section Polish + Comfort Pass)

Second mobile-section update, executed on top of the v1.0 slideshow.

| Field | Value |
| --- | --- |
| Status | **SHIPPED — v1.1** |
| Orchestrator | Same `OUTPUT/30_MOBILE_SLIDESHOW.md` (constraints re-applied: desktop intact, no rewrites, brand governance, no forbidden tropes, lucide-only, release sync) |
| Scope | Light-mode eye comfort (all devices), compact-nav lockup centering (mobile), dock `VE & MD` label (mobile), glassmorphic minimal brief (all devices) |

## 1. Light Mode Eye Comfort — all devices

The light palette was tuned for reading comfort without touching brand identity
(all values stay inside the approved Mythic Emerald family):

- **Warm sage canvas** `--bg-canvas: #f1f4f1` (was stark `#f8faf9`) — kills the
  pure-white glare.
- **Deep soft-green ink** `--text-main: #16201b` (was near-black `#0f1715`),
  muted text warmed to `#56635c` — softer, warmer contrast.
- **Deepened emerald accent** `--color-accent: #059669` in light mode (dark
  mode keeps `#10b981`) — text/icons now clear the WCAG AA bar on light
  surfaces. Light selection ink flips to white for legibility.
- **Quieter ambient bloom** — light blob alphas dropped ~40%
  (`0.16/0.12/0.09/0.07`), glass-card surface softened
  (`rgba(251,253,252,0.7)`) and shadow weight reduced.
- Implemented purely via the CSS custom-property layer in `src/index.css` —
  no component touched, so every device and every theme toggle picks it up.

## 2. Compact Nav Lockup — mobile only

The compact top bar in the home slide now reads: **switchers left, brand dead
center, Start Project right**.

- The lockup (Hydra mark stacked over the `HYDRA SAMO` wordmark) is
  `absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2` — vertically
  centered in the bar.
- Left zone: theme toggle + compact language switcher (tighter pills —
  `min-h-[32px]`, `text-[10px]`, `px-1.5`).
- Right zone: Start Project button unchanged.
- The wordmark tucks away below `380px` (`min-[380px]:inline`) so the centered
  mark never collides with the side zones on very narrow screens; the frozen
  V4 mark itself is never cropped or rescaled.
- Desktop nav untouched (still `hidden md:block` from v1.0).

## 3. Dock Label — `VE & MD` (mobile only)

The dock's Work item now reads **VE & MD** (video editing & motion design) in
EN/FR and **مونتاج & موشن** in Arabic. Implemented via a new `nav.workShort`
key used only by `MobileDock`; the desktop nav still uses `nav.work`, so the
desktop flow is unchanged. Bonus a11y fix: the dock landmark's `aria-label` no
longer reuses the language-switcher label (`lang.selectAria`) — it now reads
`nav.dockAria` ("Primary" / "Navigation principale" / "التنقل الرئيسي").

## 4. Glassmorphic Minimal Brief — all devices

`ContactSection` was reworked from a heavy dark overlay + card grid into a
single frosted pane blended into the page:

- **Glass surface** — new `.glass-modal` class (`src/index.css`): translucent
  gradient pane, `backdrop-blur(28px) saturate(140%)`, hairline light border,
  soft emerald ambient glow. The backdrop overlay is now
  `bg-[var(--bg-canvas)]/55 dark:bg-black/55 backdrop-blur-2xl`, so the site
  bleeds through instead of being blacked out.
- **Minimal form — sections merged into each other:**
  - The four service **cards collapsed into a single selection box**
    (`<select>`, stored as a 1-element `services` array so the type/payload
    contract is unchanged).
  - **Name + Company merged into one field** ("Name / Company"), trimming the
    contact row from three inputs to two.
  - Budget + Timeline share a single row; only scope, contact, plan and brief
    remain — six inputs total.
- Submit flow, Web3Forms/Formspree wiring and the unconfigured-warning state
  are byte-for-byte unchanged.

## Files Changed (v1.1)

| File | Change |
| --- | --- |
| `src/index.css` | Light-mode comfort palette, `.glass-modal`, light selection ink, softer glass-card |
| `src/components/Navigation.tsx` | Compact bar: centered stacked lockup, switchers left, Start Project right, tighter lang pills |
| `src/components/MobileDock.tsx` | `nav.workShort` label + `nav.dockAria` landmark label |
| `src/components/ContactSection.tsx` | Glassmorphic minimal brief (service select, merged name/company) |
| `src/i18n/translations.ts` | `nav.workShort`, `nav.dockAria`, `contact.labelService`, `contact.labelNameCompany`, `contact.phNameCompany` × en/fr/ar |
| `index.html` | Brand favicon set (16/32 png, apple-touch-icon) + `site.webmanifest` |
| `public/` | `favicon-16/32.png`, `apple-touch-icon.png`, `android-chrome-192/512.png`, `site.webmanifest` |

## Validation (v1.1)

| Check | Result |
| --- | --- |
| `npm run lint` (`tsc --noEmit`) | Clean |
| `npm run build` | Clean, 2103 modules; main JS 477.04 kB (gzip 151.43) |
| CSS `index-*.css` | 74.60 kB (gzip 12.30); `@media(min-width:48rem)` + `.mobile-slide` inert reset present |
| Light-mode overrides | `#059669`/`#f1f4f1` present after `@theme` in built CSS; `html.dark` restores `#10b981` |
| Contact chunk | Lazy `ContactSection-*.js` 8.30 kB (gzip 2.78) |

## Release Sync (v1.1)

- Changed files mirrored into `RELEASE/HYDRA_SAMO_BRAND_v1.0/SOURCE_CODE/`.
- `RELEASE/HYDRA_SAMO_BRAND_v1.0.zip` regenerated.
- GitHub Release **v1.1.0 — Mobile Section** created with the mobile changelog;
  repo description/topics updated; README + `CHANGELOG.md` refreshed; brand
  favicon set shipped in the site.

