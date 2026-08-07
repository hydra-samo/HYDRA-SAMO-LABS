# HYDRA SAMO — Master Asset Record

## Phase 01 — Master Asset

The single source of truth for every HYDRA SAMO brand asset. The certified V4 mark is immutable; this record is its canonical production ledger.

---

# 1. Asset Identity

| Field | Value |
|---|---|
| **Brand** | HYDRA SAMO |
| **Logo version** | **V4** (certified) |
| **Asset name** | `hydra-mark.svg` |
| **Canonical standalone filename** | `public/hydra-mark.svg` |
| **Live geometry source** | `src/components/HydraLogo.tsx` (React) |
| **Asset type** | Single-icon SVG brand mark (no text, no initials, no border, no background) |
| **Surface category** | Master vector — every other asset is derived from this file |

---

# 2. Version

| Field | Value |
|---|---|
| **Current version** | V4 |
| **Certification version** | V4 (refinement of V2) |
| **Versioning scheme** | `V{n}` — increment only via an approved rebranding initiative |
| **Superseded versions** | V2 (pre-refinement baseline), V1 (original concept) |
| **Changelog** | `OUTPUT/07_LOGO_CHANGELOG.md` |
| **Certification record** | `OUTPUT/08_FINAL_CERTIFICATION.md` |
| **Freeze record** | `OUTPUT/09_BRAND_FREEZE.md` |

---

# 3. Ownership

| Field | Value |
|---|---|
| **Brand owner** | Bendali Issam Eddine (Hydra Samo) — solo creative studio |
| **Brand owner role** | Sole approval authority for any branding decision |
| **System steward** | Lead Brand Systems Engineer (production pipeline) |
| **Repository** | `hydra-samo/HYDRA-SAMO-LABS` |
| **Live URL** | `https://hydra-samo.github.io/HYDRA-SAMO-LABS/` |

All asset generation, export optimization, and documentation updates require brand-owner sign-off before release. Geometry changes require brand-owner approval per the rebranding clause in `09_BRAND_FREEZE.md`.

---

# 4. Checksum

The master asset integrity fingerprint. **Placeholder — fill at first release.**

| Field | Value |
|---|---|
| **Algorithm** | SHA-256 |
| **Expected value** | `[PLACEHOLDER — set at release: sha256sum public/hydra-mark.svg]` |
| **File** | `public/hydra-mark.svg` |
| **Verification command** | `sha256sum public/hydra-mark.svg` |
| **Policy** | Any file whose checksum diverges from the recorded value on a released version is NOT the certified master and must be quarantined. |

---

# 5. Freeze Date

| Field | Value |
|---|---|
| **Freeze date** | **2026-08-05** |
| **Status** | 🟢 LOCKED — Permanent production identity |
| **Freeze authority** | Brand owner, per `08_FINAL_CERTIFICATION.md` verdict ✅ CERTIFIED |
| **Effective scope** | Geometry, palette, frame, construction, and all derived assets |

---

# 6. Licensing

| Field | Value |
|---|---|
| **Copyright holder** | Bendali Issam Eddine (Hydra Samo) |
| **License** | **Proprietary — all rights reserved** |
| **License identifier** | `[PLACEHOLDER — SPDX identifier TBD by brand owner]` |
| **Usage grant** | Internal brand system use only. Third-party reproduction, modification, or redistribution requires written approval from the brand owner. |
| **Derived assets** | All exports inherit the master license. |

---

# 7. Approved Colors

The certified palette. See `16_BRAND_GOVERNANCE.md` for full rules and forbidden colors.

| Token | Hex | Role |
|---|---|---|
| **Mythic Emerald** | `#10b981` | **Primary brand accent** — default mark color, all surfaces |
| **Deep Jade** | `#059669` | Secondary accent — depth, hovers, secondary detail |
| **Soft Mint** | `#34d399` | Ambient glow / highlight |
| **Abyssal Slate** | `#060c09` | Primary canvas (dark mode) |
| **Bone** | `#f3f4f6` | Typography primary (off-white) |
| **Slate Muted** | `#94a3b8` | Typography muted |

**Monochrome modes (certified):**

| Mode | Color | Use |
|---|---|---|
| White mono | `#ffffff` | Mark on dark surfaces (canvas, images, embossing) |
| Black mono | `#000000` | Mark on light surfaces (print light paper, etching) |

---

# 8. Modification Policy

Only the following modifications are permitted to the master asset (from `09_BRAND_FREEZE.md`):

- SVG optimization (path size, coordinate rounding, markup hygiene) **with no visual change**
- Export optimization
- Asset generation (favicons, social cards, avatars, lockups, alternate formats) **derived from the single source**
- Additional file formats
- Technical bug fixes (rendering, accessibility, packaging)
- Documentation updates

**Prohibited without a formal rebranding initiative approved by the brand owner:**

- Head path geometry and the 57.5° wedge / 0.0° tangency construction
- Hexagon core (circumradius 17, pointy-top orientation)
- Shared optical frame `viewBox="11 2.94 78 78"`
- 3-fold rotational symmetry about `(50, 50)` and the `hydra-head-0/1/2` + `hydra-core` class contract
- Monochrome-true, `currentColor` rendering with external CSS lighting only
- The retired continuous-rotation cue (`.hydra-mark-spin`) — remains forbidden

---

# 9. Source-of-Truth Location

| Asset | Location | Role |
|---|---|---|
| **Live geometry (React)** | `src/components/HydraLogo.tsx` | Master geometry used by every UI surface |
| **Standalone SVG** | `public/hydra-mark.svg` | Canonical static SVG (favicon, downloads, static tools) — generated from the same geometry |
| **Social card** | `public/hydra_logo.jpg` | Derived OpenGraph / Twitter card (1024×1024) |
| **Production guidelines** | `OUTPUT/` | `10_MASTER_ASSET.md` … `19_FINAL_RELEASE.md` |
| **Design spec** | `DESIGN.md` | System design specification |
| **Agent governance** | `AGENTS.md` | Project + brand governance |

**Rule — Single source of truth:** every raster, icon, social asset, print file, or motion asset MUST be generated from `hydra-mark.svg` (or the identical geometry in `HydraLogo.tsx`). It is forbidden to re-draw, re-trace, or re-imagine the mark for any export. Re-export only, never re-create.

---

## Record Signature

- **Recorded by:** Lead Brand Systems Engineer
- **Date:** 2026-08-05
- **Approval:** Pending brand-owner signature on release (`19_FINAL_RELEASE.md`)
