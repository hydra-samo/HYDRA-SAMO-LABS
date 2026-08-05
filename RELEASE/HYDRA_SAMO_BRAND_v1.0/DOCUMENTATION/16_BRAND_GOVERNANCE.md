# HYDRA SAMO — Brand Governance

## Phase 07 — Usage Rules & Protection Standards

The certified V4 mark is the permanent identity. This governance is the rulebook for every surface, from 16 px favicon to print and motion. It extends and codifies the constraints in `DESIGN.md`, `AGENTS.md`, and `09_BRAND_FREEZE.md`.

---

# 1. Clear Space

- **Rule:** keep an exclusion zone equal to **one hex-core unit** (17 units at source scale ≈ one head-height ≈ the mark's inner radius) clear on all four sides of the mark.
- **Practical values:** at 24 px mark height → 24 px clear space; at 100 px → 100 px.
- **Applies to:** text, other logos, image edges, crop marks, decorative elements, and watermarks.
- **Minimum visual guard:** the clear space is the minimum, never the target — give the mark room.

# 2. Minimum Size

| Surface | Minimum | Notes |
|---|---|---|
| Favicon / browser | 16 px | Three head masses + visible core required (validated gate) |
| UI (navbar, inline) | 24 px | Never below |
| App icon / avatar | 48 px | |
| Social avatar | 128 px | 512 px source |
| Print (ink) | 12 mm mark height | |
| Print (embroidery) | 45 mm | per `15_PRINT_SYSTEM.md` |
| Vector | no limit | scales cleanly to billboard |

Below the minimum, do not render the mark — use the wordmark/name in type instead.

# 3. Allowed Colors

| Colorway | Hex | Where |
|---|---|---|
| Mythic Emerald | `#10b981` | **Primary everywhere** (site, social, print spot, motion) |
| Deep Jade | `#059669` | Secondary accents, depth |
| Soft Mint | `#34d399` | Glow / highlight treatments |
| White mono | `#ffffff` | Dark surfaces, imagery overlays, embossing |
| Black mono | `#000000` | Light surfaces, light print, etching |

# 4. Forbidden Colors

- **No neon cyan** (`#00FFCC`, `#00F0FF`, or `#00E5FF`) — explicitly banned by `AGENTS.md`; the historical design-brief recolor candidates (Neon Green `#39FF14`, Electric Cyan `#00E5FF`) are **not certified** and must not be used in any surface.
- **No cyan/blue gradients** or bright blue accents.
- **No legacy colorways** (teal/violet/warm logo variants were retired at certification).
- **No out-of-palette hex drift** — verify hex values against the approved table before export.

# 5. Background Rules

| Background | Mark color |
|---|---|
| Abyssal `#060c09` (default) | Emerald `#10b981` |
| Any dark image | Emerald with `.hydra-mark-glow`, or white mono |
| Light canvas / paper | Black mono (or emerald if contrast ≥ 4.5:1 on the specific surface) |
| Mid-tone photography | White mono with soft drop shadow, or emerald in a glass chip |
| Anything busy | Keep the mark in a glass/abyssal tile — never place directly on high-frequency imagery |

# 6. Incorrect Usage (never)

1. Re-draw, re-trace, re-interpret, or simplify the mark for any asset.
2. Stretch, squash, skew, or otherwise distort proportions.
3. Rotate the mark (continuous rotation or any fixed non-0° placement other than the certified geometry's internal 120°/240° transforms).
4. Add text, initials, slogan, borders, or badge elements inside/around the mark SVG.
5. Apply gradients, glow, shadows, or reflections inside the SVG (lighting is external CSS only).
6. Recolor to any forbidden color (see §4).
7. Place on a clashing background or below minimum size (see §2).
8. Animate with the retired spin treatment or any busy looping spinner.
9. Mirror/flip the mark or break the 3-fold symmetry.
10. Use a legacy raster or a screenshot of the site as the brand asset.

# 7. Accessibility

- **Reduced motion:** all mark animation must honor `prefers-reduced-motion: reduce` (pulse, ambient drift, reveals freeze).
- **Decorative mark:** the `HydraLogo` component renders `aria-hidden="true"` and `focusable="false"` — never attach meaning-bearing content inside it; use visible text for the brand name.
- **Text contrast:** brand text tokens — Bone `#f3f4f6` on Abyssal `#060c09`, and muted `#94a3b8` on Abyssal — meet WCAG AA for their roles (verify per layout; body text ≥ 4.5:1, large text ≥ 3:1).

# 8. Contrast

- The emerald mark must maintain **≥ 3:1 contrast** against any background it sits on (WCAG AA for graphical objects).
- Emerald `#10b981` on Abyssal `#060c09` is the reference pairing and passes; on light backgrounds verify the specific surface, otherwise switch to black mono.
- The 16 px favicon must read as a silhouette (three heads + core) at any contrast — this is a structural gate, validated by ink-coverage measurement.

# 9. Vector Rules

- Single source: `hydra-mark.svg` / `HydraLogo.tsx` geometry. Never regenerate from a raster.
- Keep `viewBox="11 2.94 78 78"`, `currentColor` fills, `pathLength={1}`, unmerged paths, and the `hydra-head-0/1/2` + `hydra-core` classes.
- No gradients, no effects, no embedded rasters in the master vector.
- Outline variant permitted only where a technical/annotation treatment is required; fill is the default.

# 10. Raster Rules

- Generate at 2× target (or 4× for ≤32 px) and downscale with LANCZOS; never upscale.
- Preserve the alpha channel; no background matte in transparent exports.
- Validate the 16 px gate (42% ink coverage; bbox ≥75% of tile) on every favicon-class batch.
- Store masters at the highest size (≥1024 px) and derive smaller sizes from the master raster — never from a smaller copy.

# 11. Logo Rotation Policy

- **Continuous rotation: forbidden.** `.hydra-mark-spin` is retired and must never be reintroduced (rotor/fan cue; the 3-fold mark is rotationally self-similar).
- **Static placement:** the mark sits upright as certified. No fixed non-upright placement unless a specific approved layout demands a deliberate tilt (e.g., editorial print), and such tilts are limited to ≤15° and must be approved by the brand owner per asset.

# 12. Distortion Policy

- The mark is never stretched, squashed, reflected, or mirrored.
- Aspect ratio is locked at 1:1 (frame `11 2.94 78 78` is square).
- Scale is always uniform; any non-uniform transform is a governance violation and must be re-exported.

---

# Enforcement

- Violations in source code are caught by review (`npm run lint`, code review).
- Violations in generated assets are caught by the QA gate in `18_QA_VALIDATION.md` and the checksum record in `10_MASTER_ASSET.md`.
- Persistent or deliberate violations constitute a governance breach reportable to the brand owner.
