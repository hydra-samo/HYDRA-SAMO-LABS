# HYDRA SAMO — Website Asset Specification

## Phase 03 — Website Assets

Every website asset is derived from the certified V4 mark. The live geometry lives in `WEBSITE_v1.1/src/components/HydraLogo.tsx`; static web assets live in `/public`. All lighting stays external (CSS layer) — never baked into the SVG.

---

# 1. Surface Map

| Surface | Component / Location | Implementation | Color |
|---|---|---|---|
| **Navbar** | `WEBSITE_v1.1/src/components/Navigation.tsx` | `HydraLogo` component | Emerald `#10b981` via `text-accent` |
| **Hero** | `WEBSITE_v1.1/src/components/Hero.tsx` | `HydraLogo` component | Emerald `#10b981` |
| **Footer** | Footer (existing layout) | `HydraLogo` component (or favicon raster fallback) | Muted emerald / white mono |
| **Loading** | `WEBSITE_v1.1/src/components/PlymouthSplash.tsx` | `HydraLogo` + `.hydra-mark-pulse` | Emerald |
| **Splash** | `WEBSITE_v1.1/src/components/PreSplashSelector.tsx` | `HydraLogo` selection tile | Emerald |
| **Watermark** | Full-page / section watermark | `HydraLogo` at low opacity (≈8–14%), white or emerald mono | Low-opacity mono |
| **OpenGraph** | `WEBSITE_v1.1/public/hydra_logo.jpg` via `useOpenGraph.ts` | 1024×1024 raster | Emerald on Abyssal `#060c09` |
| **Twitter Card** | `WEBSITE_v1.1/public/hydra_logo.jpg` (same file) | `summary_large_image` | Emerald on Abyssal |
| **Manifest Icons** | `/manifest` icons | 192 + 512 px (see §6) | Emerald fill |
| **PWA Icons** | PWA install icons | 192 + 512 px maskable | Emerald fill |
| **Browser Icons** | `favicon.ico` | Multi-res ICO | Emerald fill |
| **Safari Mask Icon** | `safari-pinned-tab.svg` | Monochrome silhouette | Black fill (pinned tab) |
| **Apple Touch Icon** | `apple-touch-icon.png` | 180 px | Emerald fill |
| **Dark Mode** | `html.dark` class, `localStorage['hydra-theme']` | Emerald on Abyssal `#060c09` | Emerald |
| **Light Mode** | default canvas `#f8faf9` | Emerald on light canvas | Emerald (black mono in light-critical print) |

---

# 2. Navbar

- **Mark size:** 24–28 px rendered height (never below 24 px).
- **Color:** `#10b981` (Mythic Emerald), inherited via `text-current`.
- **Lockup:** mark + wordmark (typography only, from the Geist family). No text is ever placed inside the mark SVG.
- **Clear space:** the mark's own hex core radius (17 units ≈ one head-height) on every side from neighboring elements.
- **Hover:** optional `.hydra-mark-glow` (external CSS drop-shadow, follows `currentColor`). No scale beyond 1.05×. No rotation.
- **Anti-patterns:** no geo/location badges, no gradient fills, no baked glow, no spinner animation.

---

# 3. Hero

- **Mark size:** display scale, 96–160 px rendered height.
- **Color:** `#10b981`; `#34d399` glow via `.hydra-mark-glow` where a light treatment is desired.
- **Placement:** optically centered relative to headline; the mark and headline share the optical axis.
- **Motion:** static by default. Pulse (`.hydra-mark-pulse`) permitted on loading only. Rotation forbidden (`.hydra-mark-spin` is retired and must never be reintroduced).
- **Reduced motion:** `prefers-reduced-motion: reduce` must freeze all mark animation.

---

# 4. Footer

- **Mark size:** 24–32 px.
- **Color:** emerald `#10b981` on Abyssal canvas, or white mono at 90% opacity for quieter presence.
- **Clear space:** standard rule (§2).

---

# 5. Loading & Splash

- **PlymouthSplash (loading):** `HydraLogo` + `.hydra-mark-pulse` (`hydra-pulse 3.2s ease-in-out infinite`). Pulse animates opacity 1→0.55 and scale 1→0.9. Respects `prefers-reduced-motion` (animation disabled).
- **PreSplashSelector:** the mark as a selectable identity tile; emerald fill, glassmorphic tile per BRAND/DESIGN.md component rules.
- **Glow:** `.hydra-mark-glow` (drop-shadow 0 0 6px / 0 0 16px `currentColor`) may accompany loading marks.
- **Loading loop:** the approved live loading treatment is the pulse, never a spin. A stroke-draw reveal (see `13_MOTION_SYSTEM.md`) is approved for intros but must complete and settle; it must not loop as a busy spinner.

---

# 6. Manifest / PWA / Browser Icons

| Asset | File | Size | Notes |
|---|---|---|---|
| Browser favicon (SVG) | `/hydra-mark.svg` (served) | vector | Referenced in `WEBSITE_v1.1/index.html` as `%BASE_URL%hydra-mark.svg` |
| Browser favicon (ICO) | `favicon.ico` | 16/24/32/48/64 (+256) | Optional legacy fallback |
| Safari mask icon | `safari-pinned-tab.svg` | vector | Single-color silhouette; black fill; add `mask-icon` link |
| Apple touch icon | `apple-touch-icon.png` | 180×180 | Emerald fill, no transparency required (solid tile) |
| Android chrome | `android-chrome-192.png` / `android-chrome-512.png` | 192 / 512 | Emerald fill |
| PWA manifest | `manifest.webmanifest` | — | icons entries reference the 192/512 assets |

**Favicon 16 px gate:** the 16 px render must show three distinct head masses around a visible center core, optically centered, ≥75% of the tile (validated gate: 42% ink coverage; bbox 85.4% × 78.1%).

---

# 7. OpenGraph & Twitter Card

- **File:** `WEBSITE_v1.1/public/hydra_logo.jpg` (1024×1024, JPEG).
- **Field:** abyssal `#060c09`; **mark:** emerald `#10b981`, centered, dominant (mark coverage 84.6% × 77.1%).
- **Metadata source:** `WEBSITE_v1.1/metadata.json` → injected by `WEBSITE_v1.1/src/hooks/useOpenGraph.ts`.
  - `og:image` / `twitter:image`: `/hydra_logo.jpg` (resolved through Vite base path so GitHub Pages subpath deploys work).
  - `twitter:card`: `summary_large_image` (recommended min 600×600, this asset is 1024×1024).
- **Generation:** regenerate from the single source emerald paths only (rsvg-convert); never rebuild from a different palette.

---

# 8. Watermark

- **Purpose:** full-section or editorial watermark behind content.
- **Opacity:** 8–14% of `currentColor`; never above 20%.
- **Color:** white mono or emerald mono, matching the section's lighting.
- **Size:** up to 60–80% of the section height; behind text, not competing with it.
- **Motion:** static. A slow fade-in on scroll is permitted (see `13_MOTION_SYSTEM.md` timing rules).

---

# 9. Dark / Light Mode

| Token | Dark (`html.dark`) | Light |
|---|---|---|
| Canvas | `#060c09` (Abyssal Slate) | `#f8faf9` |
| Mark | Emerald `#10b981` | Emerald `#10b981` |
| Monochrome fallback | White mono for overlays | Black mono for print/light-critical |
| Glass layer | `rgba(255,255,255,0.04)` + `backdrop-blur-md` | keep translucent (light-tinted) |

Mode is controlled by `App.tsx` and `localStorage['hydra-theme']`. Both modes must pass the accessibility contrast checks in `16_BRAND_GOVERNANCE.md` and `18_QA_VALIDATION.md`.

---

# 10. Asset Manifest (website)

| File | Source | Status |
|---|---|---|
| `WEBSITE_v1.1/src/components/HydraLogo.tsx` | Master geometry | ✅ live |
| `WEBSITE_v1.1/public/hydra-mark.svg` | Derived (identical geometry) | ✅ live |
| `WEBSITE_v1.1/public/hydra_logo.jpg` | Derived (1024×1024 social card) | ✅ live |
| `favicon.ico`, `apple-touch-icon.png`, `safari-pinned-tab.svg`, manifest icons | Derived from master | 📦 pending generation |

All assets in the 📦 set are generated per `11_EXPORT_PIPELINE.md` and validated per `18_QA_VALIDATION.md`.
