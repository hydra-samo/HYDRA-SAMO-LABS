# HYDRA SAMO — Senior Logo Designer Technical Review

**Role:** Senior Identity Designer, 20 years, production-focused
**Target:** `WEBSITE_v1.1/src/components/HydraLogo.tsx`, `WEBSITE_v1.1/public/hydra-mark.svg`, favicon behavior, all render surfaces
**Date:** 2026-08-05

I inspected the mark as if it were entering production: engraving, embroidery, laser cut, animation, and scaling from 16px to billboard. Marketing and storytelling are ignored.

---

## Category Scores (out of 10)

| Category | Score |
|---|---|
| Geometry | 7 |
| Bézier curves | 6 |
| Anchor points | 6 |
| Optical balance | 6 |
| Construction grid | 7 |
| Negative space | 6 |
| Symmetry | 5 |
| Visual rhythm | 6 |
| Weight distribution | 6 |
| Stroke consistency | 8 |
| Silhouette | 6 |
| SVG cleanliness | 9 |
| Construction efficiency | 8 |
| Animation readiness | 7 |
| Pixel precision | 6 |
| currentColor implementation | 10 |
| Favicon performance | 3 |
| Monochrome quality | 8 |
| Laser engraving | 7 |
| Embroidery | 6 |
| Vinyl cutting | 7 |
| Manufacturing robustness | 7 |
| **Total** | **147 / 220 (≈ 67 / 100)** |

---

## Technical Audit

### What is built correctly (credit where due)

1. **The core is a perfect regular hexagon.** `CORE_PATH` vertices (50,35.5), (62.56,42.75), (62.56,57.25), (50,64.5), (37.44,57.25), (37.44,42.75) are an exact flat-top regular hexagon, circumradius 14.5. 12.56 = 14.5 × sin(60°). Whoever set these numbers knew the grid. This is the strongest single piece of geometry in the file.
2. **3-fold symmetry by transform, not by re-drawing.** One master head path reused via `rotate(120 50 50)` / `rotate(240 50 50)` is the correct, minimal construction. No path duplication, no drift between copies.
3. **The head tucks under the core cleanly.** The head base (y ≈ 42.5–43.8) lies inside the hexagon's interior, and the core paints after the heads, so in the fill variant the junction is seamless. The neck visually merges into the body.
4. **SVG hygiene is exemplary.** Single viewBox, no metadata, no `style` attributes, no stray groups, `aria-hidden`, `focusable={false}`, `pathLength={1}` on every path, `currentColor` fills. This file is production-clean at the markup level.
5. **Rotationally symmetric mass.** Each head's centroid is within ~0.8 units of its radial axis (≈2.2° lean), so the three-copy composite does not wobble.

### Construction issues (geometric, mechanical)

**G-1. Optical frame is off.** The composite mark occupies y 11.5–69.9 in the 100×100 viewBox (top margin 11.5, bottom margin 30.1). The optical center of the mark is y ≈ 40.7, not 50. The canvas has ~30% dead space at the bottom and the mark floats high. This is not a path error — it is a framing error — but it directly degrades favicon rendering, navbar optical alignment, and any fixed-canvas usage.

**G-2. Head sweep too narrow; negative wedges too wide.** Each head covers only ≈37° of arc at its outer radius; the empty wedge between adjacent heads is ≈83°. The mark is 3 thin tapers on a hex hub, not 3 heads fused to a body. The dead triangles between the arms are the largest empty zones in the mark and are what produce the blade/rotor silhouette.

**G-3. Non-tangent anchor at the throat notch.** At the point (47.3, 27): the incoming segment ends with a vertical tangent (both controls at x = 47.3) and the outgoing segment starts with a down-left tangent ≈20° off vertical. This is a visible kink — a corner, not a curve. If the throat notch is intentional, it should be constructed as a smooth S, not an angle.

**G-4. Non-tangent anchor at the lower-right base.** At (53.2, 42.5): incoming tangent is vertical; outgoing tangent is ≈26.6° off vertical. Another corner. Because this corner is hidden under the hexagon in the fill variant it is invisible today — but it leaks in the outline variant (see G-6).

**G-5. Head asymmetry is strong but unexplained by the grid.** Right edge bulges to x ≈ 57.4 (≈7.4 from axis); left throat dips to x ≈ 44.6 (≈5.4 from axis). The intended "convex back / concave throat" reading is present, but the differential (≈2 units wider on one side) is large enough that the head reads as leaning/curling rather than faceted. At 16px this asymmetry collapses into noise.

**G-6. Outline variant leaks into the core.** In the `outline` variant the hexagon is fill-less, but the head bases (x 44.5–53.2, y 42.5–43.8) fall inside the hexagon's interior. Three head-base strokes will be visible crossing the transparent hexagon — a tail-clutter artifact unique to the outline variant. It is currently unreachable (no call site passes `variant="outline"`), but the variant exists in the public API, so the defect ships.

**G-7. Favicon failure.** At 16px the mark rasterizes to ~10×9 px of ink occupying x 19–75% / y 12.5–62.5% of the tile, top-left of center, and the three heads merge into a single bell-shaped blob. The hexagon center, the throat notches, and the head separation are entirely lost. Measured: the 16px render shows one lumpy teardrop with a hollow center, no perceptible tri-head structure. This is the single worst production defect in the system.

**G-8. Bottom-heavy weight distribution within the mark.** 59% of the ink in the full-canvas render sits below the canvas midline (the two lower heads carry their crown mass lower than the upper head does). Combined with G-1 the mark reads simultaneously high in its frame and heavy at its bottom — a double optical distortion.

### Optical / visual issues

- The crown mass (widest part of each head, y ≈ 24–28) sits at radius ≈ 23.5; the hexagon radius is 14.5. The gap between crown inner edge and core edge creates a ring of dead negative space that echoes the rotor-hub look.
- The throat notch (G-3 kink) and the right-side bulge (G-5) are the only features differentiating the heads from blades; at every small size they vanish, and the mark reverts to a pure tri-blade.
- Vertical centering of the whole composite about its own optical center is fine (x center = 50.00 exactly). The vertical axis is the problem, not the horizontal.

---

## Perception Findings (as constructed)

- **Rotor / spinner / propeller:** unavoidable. Three swept arcs around a hub is the rotor gestalt; the asymmetry even imparts a clockwise swirl direction, so the mark looks like it wants to spin.
- **Gaming / crypto / generic-startup:** the tri-blade + hexagon crest is a heavily used "tech crest" archetype; the mark does not escape it.
- **Construction inconsistency:** the two kinks (G-3, G-4) are the only genuinely sloppy joints in an otherwise disciplined file.

---

## Geometric Improvement Recommendations (construction only)

1. Re-frame the canvas: shift/scale the viewBox so the composite is optically centered and occupies ≥75% of the canvas. Do not touch the paths for this.
2. Broaden the head's angular sweep or flare the neck base so the wedges between arms shrink from ~83° toward ~55–60° — this converts "three blades" into "three heads on one body."
3. Rebuild the throat notch as a tangent-continuous S-curve (eliminate the G-3 corner) and make the lower base join tangent-continuous (eliminate G-4).
4. If the outline variant is to remain public, tuck the head bases deeper under the core or add a fill to the core in outline mode so the tail strokes do not cross the interior.
5. For 16px, provide a dedicated favicon cropped tightly around the mark (or a simplified 16px-safe geometry) rather than relying on the shared full-canvas SVG.

---

## Production Readiness

**Production Ready: NO.**

The file is clean, the grid philosophy is right, and the core geometry is excellent — but a mark cannot be called production-ready when its favicon dissolves into a blob at 16px, its optical frame is 30% empty, its head-to-core transition contains visible corner kinks, and its outline variant has a tail-clutter defect. All of these are fixable with geometry and framing adjustments; none of them require a redesign. The foundation is sound; the finish is not.
