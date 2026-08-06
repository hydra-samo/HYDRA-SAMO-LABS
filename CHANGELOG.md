# Changelog

All notable changes to **HYDRA SAMO LABS**.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/);
this project adheres to [Semantic Versioning](https://semver.org/).

## [v1.1.0] — Mobile Section — 2026-08-06

The mobile experience reached release maturity.

### Added
- **Mobile slideshow & bottom dock** — full-viewport section slides crossfaded by a glass dock (Home / VE & MD / Voice / Process / Origin); each slide scrolls internally as a fallback.
- **Compact hero nav** — logo lockup dead-centered with the theme + language switchers on the left and Start Project on the right.
- **Glassmorphic minimal brief** — services collapsed from cards into a single selection box; name/company merged; frosted `.glass-modal` pane blended into the page.
- **Brand favicon set** — 16/32 px PNGs, `apple-touch-icon`, and a `site.webmanifest` shipped with the site.

### Changed
- **Light-mode eye comfort (all devices)** — warm sage canvas, soft deep-green ink, deepened emerald accent (`#059669`, WCAG AA on light), quieter ambient bloom.
- Dock Work label → **VE & MD** (video editing & motion design); Arabic reads **مونتاج & موشن**.
- Hamburger menu and floating mobile navbar removed in favor of the compact bar + dock.
- Dock landmark `aria-label` fixed (was reusing the language-switcher label).

### Fixed
- Desktop flow untouched below `md`; all mobile changes gated behind the `48rem` breakpoint (`.mobile-slide` inert at `md+`).

### Infrastructure
- GitHub Release `v1.1.0` with mobile changelog + brand zip asset.
- Repo description, topics, and README refreshed; brand system docs intact in `RELEASE/`.

## [v1.0.0] — Brand Release — 2026-08-05

Initial certified brand engineering lifecycle — see
`OUTPUT/26_LIFECYCLE_REPLICATOR.md` for the full orchestrator record.

### Shipped
- HYDRA SAMO brand identity v1.0: certified V4 mark, frozen geometry, lockup system, palette, governance, production assets.
- Full portfolio source: React 19 + Vite 6 + Tailwind v4, EN/FR/AR with RTL, dark bio-organic editorial theme, Lenis smooth scroll, AmbientBackground, loading/pre splash flow.
- Low-end device tiering, GPU-cheap motion, accessibility hardening.
- `RELEASE/HYDRA_SAMO_BRAND_v1.0/` package + regenerated zip.
