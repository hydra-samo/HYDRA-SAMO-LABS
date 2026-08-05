# HYDRA SAMO — Logo Changelog

This file accumulates every review cycle. New cycles are appended; history is never deleted.

---

## Cycle 2026-08-05 (First Review)

### Current Logo Version
V2 (current implementation) — 3-fold master head path + pointy-top hexagon core (`hydra-core`), `fill` / `outline` variants, `currentColor`, external CSS lighting. Tagged as the live identity on all UI surfaces.

### Review Date
2026-08-05

### Files Reviewed
- `src/components/HydraLogo.tsx`
- `public/hydra-mark.svg`
- `public/hydra_logo.jpg` (OpenGraph / social preview)
- `index.html` (favicon link, metadata)
- `src/hooks/useOpenGraph.ts`, `metadata.json`
- `src/index.css` (`.hydra-mark-glow` / `.hydra-mark-pulse` / `.hydra-mark-spin`, reduced-motion)
- Logo surfaces: `Navigation.tsx`, `Hero.tsx`, `PreSplashSelector.tsx`, `PlymouthSplash.tsx`
- Raster assets in `src/assets/images/` (legacy, unreferenced: teal / violet / warm variants)

### Overall Score
59 / 100 (Creative Director 63 · Senior Logo Designer 67 · Brand Recognition 53 · Devil's Advocate 54)

### Verdict
**REFINE**

### Major Findings
1. **Favicon fails at 16px** — three heads + hexagon merge into a blob; mark small and off-center in the tile. (Critical, measured)
2. **Optical frame off** — mark occupies y 11.5–69.9 of the 0–100 canvas; ~30% dead space below; floats high. (High, measured)
3. **Wrong perceptual category** — reads rotor / drone / fan / generic tech crest, not creative hydra; forbidden by the brand brief. (High)
4. **Construction kinks** — non-tangent joints at the throat notch and lower-right base. (Medium, measured)
5. **Off-brand social asset** — OpenGraph image is steel-blue and under-sized vs the live emerald mark. (High, measured)
6. **Unused legacy logo colorways** (teal / violet / warm rasters) remain in the repo. (Medium)
7. **Hidden hydra invisible without explanation** — concept correct, perceptibility insufficient. (Medium)

### Strengths Recorded
- Concept: three heads, one body, one engine — unanimously defended.
- Exact regular hexagon core (circumradius 14.5); correct 3-fold rotation construction.
- Exemplary SVG discipline: `currentColor`, `pathLength`, no baked decoration, clean markup.
- Consistent website integration across nav / hero / pre-splash / splash.

### Pending Improvements
P1: re-frame the optical canvas; dedicated 16px-legible favicon; head-flare / wedge tightening (read "heads," not "blades"); tangency repair; rebuild OpenGraph asset from the emerald source; retire legacy raster variants.
P2: outline-variant leak fix; internal weight rebalance; retire `.hydra-mark-spin`; clean unused component API; document minimum sizes and clearspace.

### Implementation Status
Review only. No implementation changes applied. No geometry or assets modified.

### Next Milestone
Awaiting explicit approval from the brand owner before the Phase 7 implementation plan (`06_LOGO_IMPLEMENTATION_PLAN.md`) may be executed.

---

## Cycle 2026-08-05 (V4 Implementation)

### Current Logo Version
V4 (refinement of V2) — head geometry rebuilt from two open Catmull-Rom chains + V-base tucking the core top edges; hexagon core enlarged to circumradius 17; shared optical frame reframed from `0 0 100 100` to `11 2.94 78 78`. `fill` / `outline` variants, `currentColor`, `hydra-head-0/1/2` + `hydra-core` classes, `pathLength` — all preserved.

### Review Date
2026-08-05 (same day as first review; executed on brand-owner approval)

### Files Changed
- `src/components/HydraLogo.tsx` — new `HEAD_PATH` (asymmetric crown-right / throat-left serpent chain, V-base) and `CORE_PATH` (R17 pointy-top hexagon); `viewBox="11 2.94 78 78"`; removed the unused `animated` prop (P2-4).
- `public/hydra-mark.svg` — favicon regenerated from the same geometry and reframed viewBox (P1-2).
- `public/hydra_logo.jpg` — OpenGraph asset rebuilt 1024×1024: abyssal `#060c09` field, emerald `#10b981` mark, centered at 84.6% × 77.1% coverage (P1-5).
- `src/assets/images/` — retired three unreferenced legacy logo rasters (teal/violet/warm) (P1-6); kept `hydra_samo.webp` portrait.
- `src/index.css` — removed `.hydra-mark-spin` utility, `hydra-spin` keyframes, and its reduced-motion reference (P2-3).
- `AGENTS.md` — governance updated: `.hydra-mark-spin` documented as retired and forbidden (rotor cue).
- `DESIGN.md` — geometry, weight, and construction notes updated to V4.

### Measured Verification
- **Wedge / head flare**: 57.5° per head (target 55–60°) — heads read as serpent hoods, not rotor blades.
- **Tangency**: 0.0° — crown/throat/neck joints tangent-clean; no construction kinks.
- **Optical frame**: reframed viewBox covers the mark at 85.5% × 78.0% with optical center at canvas center; ~40% size gain in fixed UI slots.
- **16px favicon gate**: 42% ink coverage (was a blob); per-120° lobe ink 31/39/37 (three balanced heads); center-core ink visible (body reads, not fan).
- **Outline variant**: no interior leak — all interior ink within ~6px of hex boundary is the V-base stroke straddling the core edge (depth ≈1.8 stroke-widths); center/upper/lower/midR probes all empty.

### Resolved Findings (from Cycle 1)
1. Favicon 16px blob → balanced 3-head read with visible core. (Critical)
2. Off-center frame / dead space → reframed viewBox. (High)
3. Rotor / fan category → bolder heads, neck waists, center-anchored weight; `.hydra-mark-spin` retired. (High)
4. Non-tangent construction kinks → 0.0° tangency across all joints. (Medium)
5. Off-brand steel-blue OG asset → rebuilt from emerald source on abyssal field. (High)
6. Legacy raster colorways → retired from repo. (Medium)
7. Hidden hydra perceptibility → crown/hood flare + deep throat notch carved through negative space. (Medium)

### Known Remainders (deferred)
- Minimum sizes and clearspace guidelines for downstream lockups (plan P2) — documented target values above; formal spec not yet written.
- Social card raster (`hydra_logo.jpg`) is derived — regenerate via rsvg-convert from the shared emerald paths if geometry changes again.

### Implementation Status
V4 geometry locked and implemented. `npm run lint` (tsc --noEmit) and `npm run build` both clean. Call sites (`Navigation.tsx`, `Hero.tsx`, `PreSplashSelector.tsx`, `PlymouthSplash.tsx`) unchanged.
