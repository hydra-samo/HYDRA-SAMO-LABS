# HYDRA SAMO — Brand Release v1.0

Mythical Hydra / Dark Bio-Organic Editorial identity system — certified mark V4.

## Brand Overview

A single three-headed mark, one shared core: many directions of intent growing
from one source. Palette — Mythic Emerald `#10b981`, Toxic Jade `#059669`,
soft Mint `#34d399` on Abyssal Dark Slate `#060c09`; off-white `#f3f4f6`
titles, muted slate `#94a3b8` body.

## Folder Structure

```
HYDRA_SAMO_BRAND_v1.0/
  MASTER/        certified source SVGs (source of truth)
  SVG/           production vector variants
  PNG/           raster matrix 16–4096 px
  FAVICON/       favicon + pinned-tile + manifest/browserconfig
  WEB/           site assets (nav/hero/footer/loading/splash/OG/twitter)
  SOCIAL/        platform avatars, banners, covers
  MOTION/        approved animations (no rotation)
  PRINT/         vector PDF/EPS/SVG + CMYK/spot previews
  APP/           platform icon packages
  SOURCE/        designer construction/geometry/color sheets
  DEVELOPMENT/   React component + tokens + usage examples
  DOCUMENTATION/ governance, freeze, certification, pipeline docs
  REPORTS/       production / QA / completion reports
  LICENSE/       usage terms (informational)
  README.md      this file
  ASSET_MANIFEST.md
```

## How to Use the Assets

- **Web**: `DEVELOPMENT/HydraLogo.tsx` (site component) + `WEB/` assets. Glow is
  external CSS (`.hydra-mark-glow`), never baked into SVG.
- **Favicons / app icons**: use the platform folders; transparent versions have
  alpha, tile versions are full-bleed abyssal `#060c09`.
- **Print**: always start from `PRINT/hydra-mark_v4_print.svg` (or .pdf/.eps);
  re-separate CMYK per press.
- **Motion**: `MOTION/` — stroke-reveal for entrances, loading-loop for loading.
  Rotation is forbidden.
- **Social**: upload the per-platform files (avatars, banners, covers).

## Developer Notes

- Relative imports only; `@` alias points to root (never `@/components/`).
- Dark mode is class-based (`html.dark`); use `cn()` from `src/lib/utils.ts`.
- `npm run dev` on port 3000; verify with `npm run lint` and `npm run build`.
- Keep `WorkGallery` empty-state (PROJECTS deliberately empty).

## Designer Notes

- Icon only — no text, initials, borders, or slogans inside the mark.
- Reuse the four certified paths; never reshape `d`.
- Safe zone = one head height (21.5 u) per side.
- See `SOURCE/designer-notes.md` + `SOURCE/geometry-sheet.md`.

## Print Notes

- Vector PDF/EPS/SVG are Adobe-ready; `.ai` not shipped (re-author from vector).
- CMYK TIFF is a preview — press separations from the vector.
- Spot colors (foil/embroidery/vinyl) assigned per vendor.

## Web Notes

- Favicon currently served from `public/hydra-mark.svg` (byte-identical to master).
- OG metadata points to `/hydra_logo.jpg`; canonical share images in `WEB/`.

## Version Information

- Release `v1.0` · Mark `V4` · Generated `2026-08-05`.
- Master SHA-256 `f12de4fdd94c2dbd155b0c4a23c80cdbb6420bd394a601492ade20d23380c1fa`.

## Support

Owner: HYDRA SAMO — Bendali Issam Eddine (solo creative).
Governance: `AGENTS.md` and `DOCUMENTATION/16_BRAND_GOVERNANCE.md`.

## Maintenance Guidance

- Regenerate rasters from `MASTER/`; never upscale an existing PNG.
- Add new sizes via the export rules in `SOURCE/export-spec.md`.
- Any geometry change is a **new version** — never edit certified files.
- Record changes in `OUTPUT/07_LOGO_CHANGELOG.md` before re-certifying.
