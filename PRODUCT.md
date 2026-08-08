# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary: potential clients** — brands, startups, and creators evaluating whether to commission high-end video editing, motion design, or voice-over from a single craftsman. Their job on the site is to judge the craft quickly and decide to start a project.
- **Secondary: industry peers** — directors, editors, designers, and collaborators who arrive for the craft itself, referrals, or collaboration.
- Visitors arrive in **EN, FR, or AR** (full Arabic RTL). All three are first-class locales, not fallbacks.

## Product Purpose

HYDRA SAMO LABS is the personal brand and portfolio of **Bendali Issam Eddine (Hydra Samo)** — a solo creative studio offering video editing, motion design, and voice-over as a single unified discipline ("one body, three heads"). The product exists to prove the craft on sight, communicate the unified-workflow position (zero hand-offs, direct 1-on-1), and convert evaluated visitors into project inquiries. Success is a visitor trusting the craft enough to reach out.

## Positioning

- **The three-headed myth as the whole story:** video, motion, and voice produced under a single will, so narrative intent survives end-to-end — no hand-off loss between editor, motion artist, and voice talent.
- **Direct relationship over agency:** the client works 1-on-1 with the craftsman himself, not through account managers and hand-off chains (positioned against the agency model: agency-grade output without agency overhead).
- The brand identity (emblem, palette, motion) is a deliberately engineered, certified system — presented as a serious creative house, not a freelancer page.

## Operating Context

- The shipped portfolio lives in `WEBSITE_v1.1/` (React 19 + Vite 6 + TypeScript strict + Tailwind v4) and deploys to GitHub Pages from `.github/workflows/deploy.yml` (builds v1.1 only).
- Visitor flow: evaluate work (`WorkGallery` — currently an intentional empty state), listen to voice samples (`VOICE_TRACKS`), read the process narrative, then submit a brief through the contact form.
- The contact form is driven by `VITE_FORM_ENDPOINT` / `VITE_FORM_ACCESS_KEY`; the unconfigured warning state is intended behavior when the env vars are absent.
- The site is trilingual (EN/FR/AR with RTL), dark bio-organic editorial by default with a light-mode variant; theme persists via `localStorage['hydra-theme']`.
- Device experience is tiered (`useDeviceTier`: low/medium/high) — Lenis smooth scroll, ambient emerald blobs, glass blur, and heavy motion are gated down on weak devices.
- Voice-sample audio files live in `/public/audio/` and are referenced per track by `VOICE_TRACKS.audioUrl`.
- `iteration workspace/` is the reserved next-generation workspace (WebGL2 baseline, ADR-governed, performance-tiered, DOM owns content / canvas owns atmosphere) — initialized and planned, no implementation yet.

## Capabilities and Constraints

Capabilities:
- **Video:** rhythm assembly, cinematic pacing, match cuts, sound design, color grading (Premiere Pro, DaVinci Resolve, Final Cut Pro, Audition).
- **Motion:** kinetic typography, 3D renders, HUD interfaces, VFX compositing (After Effects, Cinema 4D, Blender, Photoshop, Illustrator).
- **Voice:** broadcast narration in EN/FR/AR; 24-bit/96 kHz studio chain (Shure SM7B, Neumann U87, Universal Audio Apollo, Pro Tools).
- **Site:** EN/FR/AR + RTL, device-tiered performance, client-side OG metadata, film-grain noise overlay, ambient glows, `TiltCard` / `MagneticButton` micro-interactions, mobile slideshow with a glass bottom dock.

Constraints:
- `DISCIPLINES` ids are strictly `'video' | 'motion' | 'voice'`.
- `PROJECTS` is **deliberately empty**; `WorkGallery` must keep its empty-state handler. Do not restore placeholder projects.
- `VOICE_TRACKS` without an `audioUrl` show a "sample coming soon" state; playback must never be faked.
- Relative imports only (the `@` alias points at repo root, not `WEBSITE_v1.1/src`). Package name locked to `react-example`.
- Do not modify the `server` block or `DISABLE_HMR` logic in `WEBSITE_v1.1/vite.config.ts`.
-  rules: `REFERENCES/` (brand authority mirror) is read-only; no premature implementation against the approved Phase 01 architecture; dependency additions require an ADR; shipped CSP never uses `unsafe-eval`.

## Brand Commitments

- **Name:** HYDRA SAMO; artist: Bendali Issam Eddine (Hydra Samo). Tagline voice: "Video editing · Motion design · Voice-over — one unified head."
- **Mark:** the frozen V4 Hydra mark (`HydraLogo.tsx`, optical frame `viewBox="11 2.94 78 78"`). Icon only — no text, initials, slogans, borders, or baked-in decoration; lighting/glow lives only in CSS utilities; continuous rotation is forbidden. The mark pairs with the "HYDRA SAMO" wordmark **only** in the nav lockup and is never reused as a filler icon. Geometry is frozen per `BRAND/RELEASE/HYDRA_SAMO_BRAND_v1.0/DOCUMENTATION/09_BRAND_FREEZE.md`.
- **Palette:** Mythic Emerald `#10b981` / Deep Jade `#059669` / Soft Mint `#34d399` accents on Abyssal Dark Slate (`#060c09` / `#0b1410`); off-white `#f3f4f6` titles; muted slate `#94a3b8` body.
- **Banned tropes:** neon cyan, bright blue gradients, SaaS eyebrow pills (`// SECTION`), corporate comparison matrices, numbered badges (`01`, `02`), geo/location badges in any language.
- **Typography:** Space Grotesk (display), Manrope (UI/body), IBM Plex Sans Arabic (Arabic), JetBrains Mono (technical readouts only — never for prose eyebrows).
- **Iconography:** `lucide-react` glyphs only; no emoji in any locale.
- **Authority:** `BRAND/` is the immutable brand source of truth (certified v1.0 release, brand book, governance docs); production code references it by canonical path.

## Evidence on Hand

- The certified brand system itself: `BRAND/RELEASE/HYDRA_SAMO_BRAND_v1.0/` (frozen mark, lockup system, palette, motion system, governance, usage terms), brand book, and the full engineering report trail in `BRAND/OUTPUT/`.
- Four voice-over tracks exist as real metadata — titles, categories, durations, scripts, and waveform data in `WEBSITE_v1.1/src/data/portfolioData.ts`. **Audio recordings are in the pipeline, not yet present** (`audioUrl` unset on all tracks; UI shows the "coming soon" state).
- **No real case-study projects exist yet.** `PROJECTS` is empty by design; clients, thumbnails, videos, and metrics must never be fabricated. Real projects are in the pipeline and should be recorded as in-progress, not assumed present.
- Deployed site: https://hydra-samo.github.io/HYDRA-SAMO-LABS/ (v1.1.0).

## Product Principles

- **One unified head:** the three disciplines are one product with one accountable craftsman, never three services with hand-offs.
- **Craft is the proof:** nothing on the site implies work, clients, metrics, or audio that does not exist; every empty state is honest and deliberate.
- **Directness:** zero middlemen between the visitor and the craftsman, in the story and in the working relationship.
- **Engineered, not templated:** premium deliberate presentation that honors the frozen brand system and never falls back on generic SaaS or agency tropes.
- **Performance and accessibility are part of the craft:** device-tiered experience, reduced-motion support, AA contrast, 44 px touch targets, trilingual + RTL.

## Accessibility & Inclusion

- Trilingual EN / FR / AR with full RTL; Arabic type scales ~+30% and drops letter-spacing for legibility.
- AA-friendly contrast for large/bold type; interactive text no smaller than `text-xs`/`text-sm` with `min-h-[44px]` touch targets.
- `prefers-reduced-motion` honored (skips the splash letter-spacing reveal; motion disabled where applicable).
- Device tiering keeps low-end devices usable (native scroll, static ambient, no glass blur, reduced animation).
- Font sizes are px-based utilities, so the interface scales cleanly under browser zoom (200%).
