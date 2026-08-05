# HYDRA SAMO — Motion System

## Phase 04 — Production Animation Standards

The certified mark is **motion-ready**: `pathLength={1}` on every path, stable classes (`hydra-head-0/1/2`, `hydra-core`), unmerged paths, `currentColor`, and external CSS lighting. This document sets the production animation standard built on those capabilities.

**Hard rule:** continuous rotation (`.hydra-mark-spin`) is retired and **forbidden** — the 3-fold mark is rotationally self-similar, so spinning reads as a generic fan and re-opens the rotor defect closed at certification.

---

# 1. Animation Principles

1. **Identity before effect.** Every animation preserves the "three heads, one body" read. If an effect obscures the heads or the core, it fails.
2. **Settle, don't loop.** Approved intros reveal the mark and **settle**. The only approved continuous treatment is the low-key **pulse** (loading).
3. **External lighting only.** Glow, shadow, and bloom live in CSS utilities, never inside the SVG.
4. **Motion is opt-in by size.** Heavy effects are for display sizes (≥96 px). At ≤32 px, restrict to opacity/glow.
5. **Reduced motion wins.** Every animation honors `prefers-reduced-motion: reduce`.

---

# 2. Technique Layers

## 2.1 SVG animation

- **Stroke drawing:** all paths carry `pathLength={1}` — set `stroke-dasharray: 1; stroke-dashoffset: 1 → 0` per path (CSS or SMIL) to reveal heads and core.
- **Order:** draw the three heads (0, 1, 2) first, then the core — heads merge into the body, matching the construction narrative.
- **Restriction:** `transform="rotate(120/240 50 50)"` on the head copies must never be animated in a way that suggests independent head motion (heads are fixed members of one body).

## 2.2 CSS animation

- **Existing utilities:** `.hydra-mark-glow` (drop-shadow 0 0 6px / 0 0 16px `currentColor`) and `.hydra-mark-pulse` (`hydra-pulse 3.2s ease-in-out infinite`: opacity 1→0.55, scale 1→0.9).
- **New utilities** must live in `src/index.css` under the mark block and respect reduced motion.
- **Prefer `opacity` / `filter` / small `scale`** over `width`/`transform` churn on the mark for GPU economy.

## 2.3 Framer Motion

- Framer Motion is the site motion runtime (package: `framer-motion`).
- **Approved usages:** entrance reveals (fade + slight scale + optional stroke draw), scroll-triggered watermark fade, hover lift on navigation.
- **API discipline:** animate the wrapper/motion element, never mutate the `HydraLogo` path data or per-head transforms at runtime.
- **Reduced motion:** gate via `useReducedMotion()`; fall back to opacity-only.

---

# 3. Approved Effects

| Effect | Duration | Easing | Notes |
|---|---|---|---|
| **Stroke Reveal** | 900–1400 ms | `cubic-bezier(0.65, 0, 0.35, 1)` | Heads then core; settle to full opacity fill |
| **Outline Trace** | 700–1000 ms | ease-out | Outline variant only; may linger as outline, then fill-in |
| **Idle Animation** | — | — | Static by default; no idle motion on the primary mark |
| **Hover** | 150–250 ms | ease-out | Opacity/scale ≤1.05, or glow on; no rotation |
| **Glow Layer** | 300–600 ms | ease-in-out | `.hydra-mark-glow`; follows `currentColor` |
| **Pulse** | 3.2 s loop | ease-in-out | Loading only; opacity 1→0.55, scale 1→0.9 |
| **Rotation** | — | — | **FORBIDDEN** (`.hydra-mark-spin` retired) |
| **Loading Loop** | single-shot or ≤3 repeats | — | Reveal + settle; never an infinite busy spinner |

---

# 4. Toolchain Guidelines

| Tool | Role | Rule |
|---|---|---|
| **After Effects** | Video/OG/marketing animations, motion tests | Export the mark from the master SVG; never re-trace. Use emerald family only. |
| **Lottie** | Lightweight web animation | Export via bodymovin from AE. Cap at the approved effects; honor reduced motion (`Lottie.setReducedMotionHook`). |
| **Rive** | Interactive/interpolated web states | Import the master paths (or a Lottie of the master); keep `currentColor`-equivalent single palette. |
| **Blender** | 3D / depth treatments (hero, video intros) | Extrude/bevel only from the certified 2D silhouette; a 3D render is a derived asset, not a new geometry. |

**Cross-tool rule:** every motion asset starts from `hydra-mark.svg` (or the identical `HydraLogo.tsx` geometry). Any vector exported from AE/Lottie/Rive/Blender must be re-imported and diffed for drift before release.

---

# 5. Timing & Rhythm

- **Global motion language:** 140–240 ms for micro-interactions; 600–1400 ms for reveals; 3.2 s for the pulse loop.
- **Staggering:** multi-element reveals use 60–90 ms offsets; the mark reveals before its supporting text.
- **Ambient:** `ambient-drift` (30 s+ slow background drift) is a background system, not a mark effect.
- **Sync:** loading sequences keep a total budget under 1600 ms so the site is interactive quickly.

---

# 6. Animation Restrictions

1. **No continuous rotation.** `.hydra-mark-spin` remains retired and forbidden (`AGENTS.md`, `09_BRAND_FREEZE.md`).
2. **No per-head independent motion.** The three heads are welded to one body.
3. **No color-shifting flashes.** Stick to the certified palette; no neon/cyan strobing.
4. **No morphing paths.** The certified path data is frozen; effects animate stroke/opacity/transform wrappers only.
5. **No baked lighting.** Motion may trigger CSS glow, never gradient/bloom baked into the SVG.
6. **No busy looping.** Loading must settle; a perpetual spinner reads as a wait state (the exact rotor defect the reviews flagged).
7. **Reduced motion:** `@media (prefers-reduced-motion: reduce)` disables pulse, ambient drift, and auto-plays; Framer Motion gates via `useReducedMotion()`.

---

# 7. Motion QA (summary)

Full checks live in `18_QA_VALIDATION.md`. Key gates:

- Stroke reveal ends at full legibility (three heads + visible core).
- No animation continues after it settles (except the approved loading pulse).
- Reduced-motion context renders the mark static and fully legible.
- No vector drift: exported motion art re-imported and diffed against the master.
