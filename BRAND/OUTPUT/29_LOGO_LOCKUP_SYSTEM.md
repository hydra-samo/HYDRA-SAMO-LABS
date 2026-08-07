# 29 — Logo Lockup System

| Field | Value |
| --- | --- |
| Pipeline step | STEP 13 — Logo Lockup Package (`20_ASSET_PRODUCTION.md`, PHASE 13) |
| Executed | 2026-08-06 |
| Certified geometry | `viewBox="11 2.94 78 78"`, 4 paths, three heads rotated 120/240 around `(50,50)` + hex core |
| Master SHA-256 | `f12de4fdd94c2dbd155b0c4a23c80cdbb6420bd394a601492ade20d23380c1fa` |
| Master integrity | byte-identical to `WEBSITE_v1.1/public/hydra-mark.svg`; all 4 mark paths embedded verbatim in every lockup SVG |
| Total assets | 134 files across `BRAND/ASSETS/LOGO_LOCKUPS/` |

## STATUS: COMPLETE

## Overview

The official HYDRA SAMO lockup system pairs the certified V4 Hydra mark with the
**HYDRA SAMO** wordmark (Space Grotesk 700) in two configurations — **Horizontal**
(mark beside wordmark) and **Vertical** (mark above wordmark). The mark is never
modified: its 4 frozen paths are embedded byte-identical into every lockup. Lockups
are explicitly permitted derived assets under `09_BRAND_FREEZE.md` (mark + typography
only, no text inside the mark SVG, per Brand Book §15.2).

Both lockups are pure vector. The wordmark is converted to paths (fontTools) from
the **exact build the website renders** — Space Grotesk 700, Google Fonts
**v2.000** (release v22) — so the lockup matches the site wordmark letter-for-letter
(see `BRAND/ASSETS/LOGO_LOCKUPS/source/`). The SVGs therefore carry **no font dependency**.
Raster and PDF exports derive from the same vectors via `rsvg-convert`.

## Horizontal Lockup Specification

- Artboard / viewBox: **`0 0 1400 560`** — web set ships at `1200×480`.
- Mark frame height: **172u** (`scale 2.205128`); mark ink height ≈ 134u.
- Wordmark font size: **187.96** → cap height ≈ 134u (matches mark ink height).
- Layout: mark left, wordmark right, gap = clear space; both vertically centered.
- Optical center: ink bbox center measured `(699.5, 279.5)` vs artboard `(700, 280)`.

## Vertical Lockup Specification

- Artboard / viewBox: **`0 0 900 900`** — web set ships at `900×900`.
- Mark frame height: **234u** (`scale 3.0`); mark ink width ≈ 200u.
- Wordmark font size: **107** — subordinate to the mark by design.
- Layout: mark centered above the wordmark, gap = clear space.
- Optical center: ink bbox center measured `(449.5, 449.5)` vs artboard `(450, 450)`.

## Typography

- Wordmark: **HYDRA SAMO** — Space Grotesk **700**, uppercase.
- Tracking: **`-0.02em`** per Brand Book §11.2 (nav / standard). No distort, no italic.
- Font build: **Google Fonts v2.000** (release v22) — byte-faithful to the site's
  `--font-display` wordmark (`WEBSITE_v1.1/index.html` loads `Space+Grotesk:wght@500;600;700`).
  Kept in `source/` (`SpaceGrotesk-700-google-v2.000.ttf`, OFL 1.1) for regeneration.
- Space Grotesk v2 has no GPOS pair kerning on the lockup's letter pairs, so the
  tracked advance is exact; the wordmark is fully path-converted (no live text).

## Spacing Rules

- **Clear space** = **one hex-core unit** (17 mark units) per Brand Book §24,
  scaled with the mark: `37.5u` horizontal (s 2.205), `51u` vertical (s 3.0).
- Clear space is maintained between mark and wordmark and around the lockup.
- Minimum mark size: **24px UI / 16px favicon**. Below that, use wordmark-only.
  At the 24px mark limit the lockups scale to ≈195px wide (horizontal) / ≈92px (vertical).

## Color Variants

| File suffix | Mark | Wordmark | Intended surface |
| --- | --- | --- | --- |
| `emerald` | `#10b981` | `#10b981` | Primary / any neutral |
| `dark` | `#10b981` | `#f3f4f6` | Abyssal `#060c09` |
| `light` | `#059669` | `#0b1410` | Light / white |
| `black` | `#000000` | `#000000` | Monochrome print |
| `white` | `#ffffff` | `#ffffff` | Dark / image surfaces |
| `currentcolor` | `currentColor` | `currentColor` | Live web contexts |
| `transparent` | `#10b981` | `#10b981` | Transparent raster delivery |

All fills come from the approved palette — no neon cyan, no gradients baked in.

## Export Inventory (131 files)

Per variant (`Horizontal/`, `Vertical/`):

| Subfolder | Count | Contents |
| --- | --- | --- |
| root | 7 | Base SVGs — full precision, transparent artboard |
| `optimized/` | 7 | Minified SVGs — wordmark precision-reduced (~20% smaller), mark verbatim |
| `web/` | 7 | Web SVGs — `width`/`height` attrs added |
| `png/` | 35 | `128/256/512/1024/2048px` × 7 colorways, alpha-transparent |
| `pdf/` | 7 | Vector PDFs, transparent artboard |
| `print/` | 2 | One-color print SVGs (black offset, emerald spot) |
| — | 1 | `README.md` (package manifest) |

Package root: `source/` (3 files — Space Grotesk v2.000 TTF + OFL 1.1 + README).

Totals: 46 SVG, 70 PNG, 14 PDF, 4 docs (package README + 3 source) = **134**.

## Usage Guidelines

- Prefer **emerald** for digital; **dark** on abyssal surfaces; **light** on white.
- Use `currentcolor` only in live web markup; it renders black in static raster/PDF.
- For one-color printing use `print/hydra-lockup-*-print-black.svg` (offset) or
  `print/hydra-lockup-*-print-emerald.svg` (spot).
- Raster exports are transparent-background; place on the correct surface color.
- Small UI (nav) keeps the stacked mark-over-wordmark arrangement per `Navigation.tsx`.

## Restrictions

- Never split, recolor, re-trace, rotate, or add to the mark; the wordmark is never
  italicized, stretched, or re-set in another face.
- No text, initials, borders, or geometry may ever be added to the mark SVG.
- Below the minimum mark size, use wordmark-only.
- External lighting (glow/pulse) stays in CSS — never baked into these assets.
- `.ai`/`.fig`/`.riv` remain intentionally absent; vector PDF/EPS/SVG are the interchange.

## Validation Results

| Check | Result |
| --- | --- |
| XML well-formedness (all 46 SVGs, `xmllint`) | **PASS** |
| Mark geometry verbatim in every lockup SVG (4 master paths, byte-identical) | **PASS** |
| Optical centering horizontal `(699.5, 279.5)` vs `(700, 280)` | **PASS** (±0.5px) |
| Optical centering vertical `(449.5, 449.5)` vs `(450, 450)` | **PASS** (±0.5px) |
| Color audit — only approved palette / `currentColor` fills | **PASS** |
| Wordmark fill audit — mark 4 + wordmark 9 per colorway | **PASS** |
| PNG transparency — all 70 have fully transparent corners + content | **PASS** |
| PNG dimensions — exact `{size}px` matrix (128→2048, both variants) | **PASS** |
| PDF validity — all 14 carry `%PDF-` header, vector | **PASS** |
| Tier equivalence — base / optimized / web render identical ink bbox | **PASS** |
| No baked effects (no gradients/filters/raster) in any SVG | **PASS** |
| Wordmark font build | Space Grotesk 700 **v2.000** (Google Fonts v22) — same build the site renders | **PASS** |

---

LOGO LOCKUP STATUS: **COMPLETE** — 134 assets generated, geometry frozen, verified.
