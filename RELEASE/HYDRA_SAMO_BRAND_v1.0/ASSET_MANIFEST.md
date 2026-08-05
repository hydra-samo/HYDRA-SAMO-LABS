# ASSET MANIFEST — HYDRA SAMO BRAND v1.0

Release of the certified Hydra Samo brand identity (mark V4).

## Version & Production Environment

| Field | Value |
| --- | --- |
| Version | v1.0 (mark V4) |
| Generation date | 2026-08-05 |
| Certified geometry | `viewBox="11 2.94 78 78"`, 4 paths, heads 0°/120°/240° + hex core |
| Production environment | Linux; rsvg-convert, ImageMagick (magick), xmllint, sha256sum, zip |
| Source of truth | `MASTER/hydra-mark_v4_master.svg` |

## Checksums

| File | SHA-256 |
| --- | --- |
| `MASTER/hydra-mark_v4_master.svg` | `f12de4fdd94c2dbd155b0c4a23c80cdbb6420bd394a601492ade20d23380c1fa` |
| `MASTER/hydra-mark_v4_master.svg` vs site | byte-identical to `public/hydra-mark.svg` |

## Complete Asset Inventory (158 files, 13 folders)

| Folder | Count | Description |
| --- | --- | --- |
| `MASTER/` | 9 | Certified source SVGs (master, fill, outline, black, white, currentcolor, print, web) + README |
| `SVG/` | 6 | Production vector variants + README |
| `PNG/` | 18 | Raster matrix 16–4096 px (emerald, transparent) + README |
| `FAVICON/` | 16 | favicon.svg/.ico (16/32/48/64), apple-touch, android, mstile (70/150/310/wide), mask, manifest, browserconfig + README |
| `WEB/` | 24 | navbar/hero/footer/loading/splash/watermark, OG + twitter (PNG/WEBP 1024²), favicon set + README |
| `SOCIAL/` | 16 | 10 avatars, 6 banners/covers, OG/twitter + README |
| `MOTION/` | 9 | stroke-reveal, outline-trace, loading-loop, idle-pulse, hover + spec + rotation-forbidden + notes + README |
| `PRINT/` | 10 | vector PDF/EPS/SVG, RGB/CMYK/black/white/laser/outline 3000 px + README |
| `APP/` | 30 | Android, iOS, Windows, macOS, Linux, PWA, Electron, Chrome, Firefox, Safari + README |
| `SOURCE/` | 11 | construction/spacing/palette sheets, editable SVGs, geometry/export specs, version metadata + README |
| `DEVELOPMENT/` | 7 | HydraLogo.tsx, cn helper, tokens, usage examples, dev README, a11y notes |
| `DOCUMENTATION/` | 17 | DESIGN.md, AGENTS.md, pipeline docs, freeze/certification/governance docs |
| `REPORTS/` | 4 | 20/21/22 production reports + review package PDF |
| Root | `README.md`, `ASSET_MANIFEST.md`, `LICENSE/usage-terms.md` | |

## Unsupported Proprietary Formats

`.ai`, `.fig`, `.aep`, `.riv` are **not** included — they cannot be authored natively.
Manual export workflows are in `DOCUMENTATION/UNSUPPORTED_FORMATS.md`.

## Manual Production Notes

- Small PNGs (≤ 64 px) supersampled (4×) then downscaled (Lanczos) for crisp favicons/app icons.
- CMYK provided as preview TIFF; press separations must be re-made from `PRINT/hydra-mark_v4_print.svg`.
- Spot (foil/embroidery/vinyl) supplied via the vector master; spot colors assigned per vendor.
- Motion honors `prefers-reduced-motion`; rotation is forbidden (see `MOTION/rotation-forbidden.md`).
