# HYDRA SAMO — Logo Implementation Plan (Refinement)

**Source:** Master Logo Review Report (Overall 59/100 — REFINE)
**Date:** 2026-08-05
**Constraint:** This document contains implementation tasks only. No SVG. No code. No redesign. No path data. The geometric execution is left to the implementer, guided by the objectives and acceptance criteria below.

---

# Goal

Refine the current HYDRA SAMO mark so it reads as a **hidden three-headed hydra on one body** instead of a rotor / fan / tri-blade device, and make every surface of the brand — favicon, social preview, all UI — carry the **same mark in the same emerald palette** at every size, from 16px to billboard.

The concept is approved for refinement. The current geometry is not to be replaced; it is to be corrected and re-framed.

---

# Design Objectives

1. **Flip the dominant read** from "three blades on a hub" to "three heads on one body." The hexagonal core is the body; the three forms are heads, not blades.
2. **Preserve the identity.** Keep 3-fold rotational symmetry, one master head path with 120°/240° copies, the hexagon core, the `hydra-head-0/1/2` + `hydra-core` class structure, `pathLength`, and the `fill` / `outline` variants and their current API.
3. **Make the hydra legible without the brand story.** The serpent cue (crown + throat) must survive at small sizes, not only at large sizes.
4. **One mark, one palette, everywhere.** Every surface — favicon, OpenGraph, UI — must use the single source of truth and the Mythic Emerald colorway.
5. **Keep the vector discipline.** No gradients, glow, shadows, or reflections inside the SVG. All lighting stays external in the CSS layer.

---

# Priority 1 Changes

These are launch-blocking and must be done first.

### P1-1. Fix the optical frame (viewBox re-balance)
- Re-frame the shared 100×100 canvas so the composite mark is optically centered and occupies at least 75% of the canvas on all four sides.
- Target: remove the ~30% dead space at the bottom and the excess headroom at the top; optical center at the canvas center.
- Do not change the paths for this task — frame to the geometry, then verify.
- Apply the same framing to the React component, the favicon asset, and any generated social asset.

### P1-2. Provide a dedicated favicon that reads at 16px
- Produce a favicon-specific asset generated from the single source SVG, tightly cropped to the re-framed mark, emerald fill on the brand canvas.
- The 16px render must show three distinct head masses around a visible center (see Acceptance Criteria). If the refined geometry alone cannot achieve this, add the minimum 16px-safe simplification to the favicon asset only — never to the live component geometry.
- Update `index.html` to reference the new favicon asset.

### P1-3. Make the head read as a head, not a blade
- Broaden the connection between each head and the core so the arms flare into the body instead of tapering like blades.
- Reduce the empty wedge between adjacent heads (currently ≈83°) toward ≈55–60° by increasing the effective angular presence of each head at its base.
- Strengthen the crown + throat (concave-hollow) relationship so the serpent cue is perceptible at 32px, not only at large sizes.
- Preserve the current outer snout radius and overall footprint.

### P1-4. Repair construction tangency
- Eliminate the non-tangent kink at the throat notch and the lower-right base so every joint is tangent-continuous.
- Net result: the head must read as one continuous serpentine curve. No corners, no visible angles at any zoom.

### P1-5. Rebuild the OpenGraph / social preview asset
- Regenerate `public/hydra_logo.jpg` (or the configured OG image) from the single source SVG so the social card shows the real emerald mark, properly centered and framed.
- Target frame behavior: the mark should occupy a dominant share of the 1024×1024 canvas, centered, on the abyssal dark canvas.
- Keep `metadata.json` pointing at the regenerated asset; no other metadata changes.

### P1-6. Retire the legacy raster logo variants
- Remove or regenerate the unreferenced teal / violet / warm logo rasters in `src/assets/images/` so the repository contains exactly one logo source of truth plus derived assets.
- If any are needed for historical reference, move them out of the active asset tree.

---

# Priority 2 Changes

These improve quality and durability; they should follow P1.

### P2-1. Fix the outline variant
- Resolve the leak where the head-base outlines cross the interior of the transparent hexagon in `variant="outline"`.
- Chosen approach is the implementer's call (tuck bases deeper under the core, or give the outline core a matching treatment) — but the variant must render cleanly with no interior tail strokes.

### P2-2. Rebalance internal weight
- Address the bottom-heavy ink distribution (≈59% of ink below the canvas midline) so the three heads feel equally weighted around the center.

### P2-3. Decide the fate of `.hydra-mark-spin`
- Remove the unused continuous-rotation animation, or gate it so it is never used on the primary mark. Continuous rotation is a confirmed rotor cue.
- If a live treatment is wanted, prefer the existing slow pulse or a subtle breathing glow — never a full spin.

### P2-4. Clean the component API surface
- Remove or repurpose the currently unused `animated` and `variant` props if they remain unused after P2-1. No dead public API.

### P2-5. Document minimum sizes and clearspace
- Record in DESIGN.md/AGENTS.md: minimum render size (target 24px for UI, 16px favicon), clearspace rule, and the rule that the mark is never to be re-generated from any asset other than the single source SVG.

---

# Optional Refinements

- Add a subtle clockwise counter-lean study: test whether a *neutral* (non-leaning) head reads more "heads" and less "fan" at small sizes. Only adopt if it tests better; the current lean is part of the identity's quiet motion.
- Consider a light-gate treatment for the social card (mark + minimal type) only if it improves the share-card legibility — otherwise keep it mark-only.
- Evaluate one favicon alternative with a slightly larger center-core emphasis to guarantee tri-head legibility at 16px.

---

# Geometry Adjustments

- **Target tangency:** all anchor joints tangent-continuous; zero visible corners.
- **Target wedges:** ≈55–60° between adjacent head silhouettes at the outer radius (from ≈83° today).
- **Target frame:** mark optical center at the canvas center; ≥75% canvas coverage.
- **Target head base:** head-forms must visibly flare/overlap into the hexagonal core so the junction reads as a neck into a body.
- **Fixed constraints:** 3-fold rotational symmetry, one master head path, outer snout radius unchanged, hexagon core retained, fill + outline variants retained.

---

# SVG Requirements

- Keep the single-source philosophy: `HydraLogo.tsx` remains the live geometry; `public/hydra-mark.svg` and any social/favicon assets are derived from it.
- No gradients, glow, shadows, or reflections inside any SVG. Lighting stays in the CSS layer utilities.
- `currentColor` fills/strokes, `pathLength={1}` on every path, `aria-hidden`, `focusable={false}` retained.
- One viewBox shared by the component; dedicated tight crops only for favicon/social derived assets.
- Rebuild output must pass `npm run lint` (tsc --noEmit) and `npm run build`.

---

# Animation Compatibility

- Preserve `pathLength`-based stroke-drawing capability on every path (3 heads + 1 core).
- Preserve external CSS glow (`hydra-mark-glow`) and pulse (`hydra-mark-pulse`) as-is.
- Do not reintroduce full rotation on the primary mark; if kept at all, it must be opt-in and never the default treatment.
- Respect `prefers-reduced-motion` exactly as the current CSS does.

---

# Website Compatibility

- No prop/API/class-name changes that break existing call sites: Navigation, Hero, PreSplashSelector, PlymouthSplash must keep working unchanged.
- All UI surfaces must show the same mark in the same emerald family (`#10b981` / `#34d399` accents as already used).
- Favicon link in `index.html` must keep respecting VITE's base path (`%BASE_URL%`) so GitHub Pages sub-path deploy keeps working.
- The OpenGraph hook must keep resolving the regenerated image through the existing base-path logic; only the image asset changes.

---

# Acceptance Criteria

1. **16px favicon:** three distinct head masses and a visible center are discernible; mark is optically centered and fills ≥75% of the icon tile. (Primary launch gate.)
2. **Perceptual:** at a 3-second glance the mark reads "three heads on one body" (hydra) more strongly than "fan/rotor." Confirmed by at least two independent viewers.
3. **Frame:** optical center at canvas center; ≥75% coverage in the shared viewBox.
4. **Construction:** zero visible corners; all joints tangent-continuous.
5. **Outline variant:** renders with no head-tail strokes crossing the hexagon interior.
6. **Social card:** shows the emerald mark, centered, dominant in frame; matches the live mark.
7. **Palette governance:** exactly one logo source of truth in the repo; legacy colorway rasters removed.
8. **Build:** `npm run lint` and `npm run build` both clean; all existing call sites functional.
9. **Accessibility:** `prefers-reduced-motion` respected; markup attributes unchanged.

---

# Risks

- **Risk: over-tightening the wedges shrinks the airy, premium negative space.** Mitigation: keep the change moderate (55–60°); verify the mark does not become a solid mass.
- **Risk: head-form changes read as a new logo, eroding the identity already live on the site.** Mitigation: preserve outer snout radius, 3-fold symmetry, and hex core; change the base/neck and tangency only; keep a visual diff against the current mark.
- **Risk: a "16px-safe" favicon diverges from the live mark and reintroduces two-logo drift.** Mitigation: derive the favicon from the same source geometry; any simplification must be minimum-necessary and documented.
- **Risk: regenerating the social asset without a render pipeline produces a low-quality card.** Mitigation: generate at ≥1024×1024 from the vector, review at avatar size.
- **Risk: removing the spin utility surprises existing animation references.** Mitigation: it is currently unused in the app; verify with a grep before removal.

---

# Estimated Difficulty

- P1-1 frame re-balance: **Low** (framing-only)
- P1-2 favicon asset: **Low–Medium** (depends on geometry outcome)
- P1-3 head/neck rework: **Medium** (path tuning, identity-sensitive)
- P1-4 tangency repair: **Medium** (anchor surgery)
- P1-5 social asset: **Low**
- P1-6 raster cleanup: **Low**
- P2-1 outline variant: **Low–Medium**
- P2-3 spin decision: **Low**
- Overall: **Medium.** No redesign, no new construction system — a disciplined corrective pass on a sound concept.
