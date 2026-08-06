# Changelog

All notable changes to **HYDRA SAMO LABS**.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/);
this project adheres to [Semantic Versioning](https://semver.org/).

## [v1.1.0] — Mobile Section — 2026-08-06

The mobile experience reached release maturity.

### Added
- **Mobile slideshow & bottom dock** — full-viewport section slides crossfaded by a glass dock (Home / VE & MD / Voice / Process / Origin); each slide scrolls internally as a fallback.
- **Spacious two-tier compact nav** — full stacked lockup dead-centered on its own row; theme + language switchers left and Start Project right with 44px touch targets — never tight on any phone width.
- **Glassmorphic minimal brief** — services collapsed from cards into a single selection box; name/company merged; frosted `.glass-modal` pane blended into the page.
- **Brand favicon set** — 16/32 px PNGs, `apple-touch-icon`, and a `site.webmanifest` shipped with the site.
- **Polished scroll cursor** — thin rounded emerald scrollbar (`color-mix` accent) on every scroll container; touch devices untouched.

### Changed
- **Light-mode eye comfort (all devices)** — warm ivory canvas with a soft yellow cast, warm-green ink, deepened emerald accent (`#059669`, WCAG AA on light), lichen-amber ambient under-glow.
- **Hero is typography-led (all devices)** — the standalone brand mark was removed from the hero; the identity lives in the nav lockup and loading/splash surfaces only.
- **Brief window blends into the page** — soft gradient-mask glass pane over a light backdrop tint; closes on Esc, backdrop tap, or the close button; package picker is a concept-blended styled select with an emerald chevron.
- **Richer-but-optimized mobile motion** — 500ms slide-in with a soft overshoot settle + rising dock (transform/opacity only); low-tier trims to 320ms; reduced-motion disables.
- **Switcher retune** — theme Sun/Moon crossfade to 300ms ease; compact language pills widened/tallered with tuned 300ms press feedback.
- Dock Work label → **VE & MD** (video editing & motion design); Arabic reads **مونتاج & موشن**.
- Hamburger menu and floating mobile navbar removed in favor of the compact bar + dock.
- Dock landmark `aria-label` fixed (was reusing the language-switcher label).

### Fixed
- Desktop flow untouched below `md`; all mobile changes gated behind the `48rem` breakpoint (`.mobile-slide` inert at `md+`).

### Infrastructure
- GitHub Release `v1.1.0` with mobile changelog + brand zip asset; post-release polish pushed to `main` and the release asset refreshed in place (no v1.1.1 tag).
- Repo description, topics, and README refreshed; brand system docs intact in `RELEASE/`.
- Brand Book (`DOCUMENTATION/HYDRA_SAMO_Brand_Book_v1.0.{pdf,html,md}`) re-synced — hero mark governance, light-mode canvas, and brief-window behavior now match the site.

## [v1.0.0] — Brand Release — 2026-08-05

Initial certified brand engineering lifecycle — see
`OUTPUT/26_LIFECYCLE_REPLICATOR.md` for the full orchestrator record.

### Shipped
- HYDRA SAMO brand identity v1.0: certified V4 mark, frozen geometry, lockup system, palette, governance, production assets.
- Full portfolio source: React 19 + Vite 6 + Tailwind v4, EN/FR/AR with RTL, dark bio-organic editorial theme, Lenis smooth scroll, AmbientBackground, loading/pre splash flow.
- Low-end device tiering, GPU-cheap motion, accessibility hardening.
- `RELEASE/HYDRA_SAMO_BRAND_v1.0/` package + regenerated zip.
