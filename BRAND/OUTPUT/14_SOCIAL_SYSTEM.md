# HYDRA SAMO — Social System

## Phase 05 — Production Specifications per Platform

All social assets are derived from the certified master (`WEBSITE_v1.1/public/hydra-mark.svg`, emerald `#10b981` on abyssal `#060c09`). Safe-area and cropping rules below match current platform constraints; re-verify before each release because platforms resize fields over time.

---

# 1. Shared Rules

- **Avatar:** always the mark alone — no text, no initials, no ring, no background pattern. Emerald fill on abyssal tile (or white mono on dark tile where the platform forces a light chip).
- **Banner / cover:** emerald mark on abyssal field, optically centered or anchored per platform, with the brand name in typography only (Geist family) — typography lives in the banner layout, never inside the mark.
- **Thumbnail:** mark + editorial frame; keep the mark ≥ 60% of the frame's shorter side.
- **Safe area:** keep the mark within the center 60% of any crop-sensitive asset; keep live text within the center 80%.
- **Cropping rules:** avatar fields crop hard to circles (Discord, X legacy) or rounded squares (Instagram, Behance) — the mark must survive a hard circle crop, so leave a margin ≥ one head-height between the mark's bounding box and the tile edge.

---

# 2. Platform Matrix

## 2.1 Instagram

| Asset | Spec | Notes |
|---|---|---|
| Avatar | 320×320 px (displays ~110 px circle) | Emerald mark on abyssal; survives circle crop |
| Post | 1080×1080 (square) / 1080×1350 (portrait) | Editorial layouts; watermark ≤14% opacity |
| Story | 1080×1920 | Mark top-center or center; keep within center 60% |
| Highlight cover | 1080×1920 (crops to circle) | Mark-only, high-contrast |
| Banner (profile) | not applicable (no cover on classic profiles) | Use highlights for brand surface |

## 2.2 Behance

| Asset | Spec | Notes |
|---|---|---|
| Profile avatar | 300×300 px min | Emerald mark on abyssal |
| Cover image | 1600×400 px (recommended) | Mark left-anchored within safe area; name right side |
| Project cover / thumbnail | 1200×900 px (landscape) | Editorial frame; mark dominant |

## 2.3 LinkedIn

| Asset | Spec | Notes |
|---|---|---|
| Profile picture | 400×400 px (crops to circle at ~176 px display) | Mark-only; survives circle crop |
| Background / cover | 1584×396 px | Mark right side within safe area; minimal type |
| Company logo | 300×300 px min | Emerald mark on abyssal |

## 2.4 GitHub

| Asset | Spec | Notes |
|---|---|---|
| Profile avatar | 512×512 px (circle crop) | Mark-only emerald on abyssal |
| Organization logo | 512×512 px | Same source |
| Repository social preview | 1280×640 px | `og:image` style — mark + repo name in type |
| README badge/logo | SVG | `hydra-mark-emerald-fill` inline |

## 2.5 YouTube

| Asset | Spec | Notes |
|---|---|---|
| Channel profile picture | 800×800 px (circle crop) | Mark-only |
| Channel banner | 2560×1440 px (safe area 1546×423 center) | Mark within center safe area; nothing important in outer 500 px edges |
| Video thumbnail | 1280×720 px | Editorial frame, mark as watermark/end-card |

## 2.6 Discord

| Asset | Spec | Notes |
|---|---|---|
| Server avatar | 512×512 px (circle crop) | Mark-only |
| Server banner | 960×540 px (displayed behind channels) | Abyssal field + emerald mark, left zone |
| Role icons / emoji | 128×128 px | Mono marks work well at emoji scale (16–128) |

## 2.7 X (Twitter)

| Asset | Spec | Notes |
|---|---|---|
| Profile photo | 400×400 px (circle crop) | Mark-only |
| Header / banner | 1500×500 px (safe center 1280×360) | Mark within safe area; name in type |
| Post card (OG) | 1200×675 px (summary_large_image) | Served from `WEBSITE_v1.1/public/hydra_logo.jpg` (1024×1024) via `useOpenGraph.ts` — keep ≥1200 width for the site OG; the 1024 asset is accepted, larger re-export optional |

## 2.8 Portfolio platforms (Behance, Dribbble, ArtStation, personal site)

| Asset | Spec | Notes |
|---|---|---|
| Dribbble shot cover | 800×600 px | Editorial frame, mark watermark ≤14% |
| ArtStation profile | 800×800 px | Mark-only avatar; banner 320×240 px |
| Personal site / hydra-samo portfolio | OG 1024×1024; favicon; manifest icons | Per `12_WEBSITE_ASSETS.md` |

---

# 3. Per-Platform Summary Table

| Platform | Avatar | Banner / Cover | Thumbnail / PFP | Safe area | Crop |
|---|---|---|---|---|---|
| Instagram | 320×320 | — | Post 1080×1080 | center 60% | circle avatar |
| Behance | 300×300 | 1600×400 | 1200×900 | center 60% | avatar square |
| LinkedIn | 400×400 | 1584×396 | — | center 60% | circle PFP |
| GitHub | 512×512 | — | 1280×640 social | center 60% | circle avatar |
| YouTube | 800×800 | 2560×1440 | 1280×720 | 1546×423 center | circle PFP |
| Discord | 512×512 | 960×540 | 128×128 emoji | center 60% | circle avatar |
| X | 400×400 | 1500×500 | 1200×675 card | 1280×360 center | circle photo |
| Portfolio | 800×800 | 320×240 | 1024×1024 OG | center 60% | varies |

---

# 4. Generation Notes

- Generate avatars at 512 px (or higher) from the master and downscale; never upscale.
- Keep avatar tiles square with the mark optically centered at ≥75% tile coverage (mirrors the favicon gate).
- One shared asset pattern for banners: abyssal `#060c09` field, emerald mark, Geist-family name — recreate per platform dimensions, never resize one banner across platforms.
- No location/geo badges anywhere in social assets (per `BRAND/AGENTS.md`).
