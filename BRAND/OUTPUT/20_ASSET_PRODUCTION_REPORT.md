# 20 — Asset Production Report

| Field | Value |
| --- | --- |
| Pipeline step | STEP 01 — Asset Production (`20_ASSET_PRODUCTION.md`) |
| Executed | 2026-08-05 |
| Certified geometry | V4 · `viewBox="11 2.94 78 78"` · 4 paths · heads 0°/120°/240° + hex core |
| Master SHA-256 | `f12de4fdd94c2dbd155b0c4a23c80cdbb6420bd394a601492ade20d23380c1fa` |
| Master integrity | byte-identical to `WEBSITE_v1.1/public/hydra-mark.svg` ✓ |
| Total assets | 147 files across 12 packages |

## Assets Generated

| Package | Files | Notes |
| --- | --- | --- |
| `MASTER/` | 8 | master, fill, outline, black, white, currentcolor, print, web — all XML-valid, 4 paths, identical head-path hash |
| `SVG/` | 5 | production SVGs (favicon, app, web/currentcolor, mask, mark) |
| `PNG/` | 17 | 16/24/32/48/64/96/128/180/192/256/384/512/768/1024/1536/2048/4096 px, sRGB, alpha |
| `FAVICON/` | 15 | favicon.svg/.ico (16/32/48/64), apple-touch 180, android 192/512, mstile 70/150/310 + wide 310×150, mask-icon, `site.webmanifest`, `browserconfig.xml` |
| `WEB/` | 23 | OG + twitter (PNG & WEBP 1024), nav/hero/footer/splash/loading, watermark, PWA icons, social favicon set |
| `SOCIAL/` | 15 | 9 platform avatars, 2 banners, OG/twitter, generic avatar |
| `MOTION/` | 9 | stroke-reveal, outline-trace, loading-loop (approved pulse), idle-pulse, hover SVGs + motion-spec, rotation-forbidden, developer notes, README |
| `PRINT/` | 10 | vector PDF 1.7, EPS (DSC 3.0), SVG, RGB 3000 PNG, CMYK 3000 TIFF, black, white-on-abyss, laser, outline + README |
| `APP/` | 29 | Android 48/72/96/144/192/512 · iOS 180/1024 · Windows 44/50/150/310/256 · macOS 512/1024 · Linux 256/512 · PWA 192/512 · Electron 128/512 · Chrome 16/32/48/128 · Firefox 48/96/128 · Safari mask-icon |
| `SOURCE/` | 9 | construction, spacing, palette sheets; editable/currentcolor/web copies; export-spec, designer-notes, version-metadata |
| `DEVELOPMENT/` | 7 | HydraLogo.tsx + cn helper (site copies), design-tokens, tailwind-tokens, usage-examples, dev README, a11y notes |
| `README.md` | 1 | production manifest (PHASE 12) |

All WEBP/ICO/TIFF raster work done via ImageMagick (cwebp/pngquant unavailable); PNG via `rsvg-convert`. All SVG checked with `xmllint`.

## Assets Skipped

None of the *supported* assets were skipped. FAVICON mstile-70/310/wide and Android 72/144 were added during QA of the initial run and are present.

## Unsupported Formats

| Format | Reason |
| --- | --- |
| `.ai` | Environment cannot author native Illustrator; vector PDF/EPS/SVG shipped instead |
| `.fig` | Proprietary Figma format; SVGs are the interchange |
| `.aep` | Proprietary After Effects; `MOTION/stroke-reveal.svg` + spec are the reference |
| `.riv` | Proprietary Rive; geometry ships as standard SVG paths |

These are documented, not fabricated (PHASE 01 capability rule).

## Folder Summary

```
ASSETS/
  MASTER/ 8 · SVG/ 5 · PNG/ 17 · FAVICON/ 15 · WEB/ 23 · SOCIAL/ 15
  MOTION/ 9 · PRINT/ 10 · APP/ 29 · SOURCE/ 9 · DEVELOPMENT/ 7
  README.md (manifest)
```

## Generation Summary

- Toolchain: `rsvg-convert` (SVG→PNG/PDF/EPS), ImageMagick `magick` (WEBP/ICO/TIFF/CMYK/wide tiles), `xmllint` (validation), `sha256sum` (integrity).
- All 13 master/production SVG variants validate; identical head-path hash confirms locked geometry.
- Motion adheres to governance: rotation files are **absent** and explicitly documented as forbidden.

## Production Completion Percentage

**100 %** — every technically supported asset generated; all unsupported formats documented.
