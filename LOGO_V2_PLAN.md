# Hydra Mark Evolution V2 — Implementation Plan

> **Status:** PROPOSED
This document is an implementation specification, not the implementation itself.

Numeric coordinates, radii, Bézier control points, and construction values are
reference targets intended to preserve the current identity. During implementation,
minor adjustments are permitted if they improve optical balance while preserving
the silhouette, symmetry, hidden-hydra concept, and compatibility requirements.

## 1. Goal

Evolve the existing `HydraLogo` (Version 1) into Version 2 without replacing it.
Preserve the visual identity already live across the website; refine the geometry
so the mark reads as a **hidden three-headed hydra** instead of a tri-blade /
drone rotor / loading spinner.

## 2. Diagnosis of V1 (why it reads as a "blade / rotor")

Current master head path (`HEAD_PATH` in `src/components/HydraLogo.tsx`):

```
M 50 11 C 53 15, 56 19, 57.8 24 C 59.5 28.5, 56.5 38, 54 45
C 53.2 47, 52.6 48, 52 48.6 C 48.5 49.4, 47 48.6, 46.6 44
C 45.8 36, 44.8 30, 45.5 26 C 46.5 21, 47.8 16, 50 11 Z
```

Three structural problems:

1. **No head/neck separation** — a single smooth taper from the head bulge down
   to a long, thin (~5-unit) neck. One continuous sweep = propeller-blade geometry.
2. **Empty center** — the three thin necks meet but never merge into a substantial
   body = rotor-hub look.
3. **Weight at the tips** — widest mass at the outer heads, thinnest at the center
   = spinner silhouette.

V2 fixes these **through geometry only** (no eyes, mouth, teeth, scales, gradients,
glow, decorative cuts, or added complexity).

## 3. V2 Construction (identity-preserving)

Unchanged (kept identical to V1):

- `viewBox="0 0 100 100"`, center `(50, 50)`.
- **3-fold rotational symmetry**: one master head path, copies at
  `rotate(120 50 50)` and `rotate(240 50 50)`.
- Snouts on the **pointy-top hexagonal grid** vertices at `90° / 210° / 330°`
  (outer construction radius ≈ 38, snout at `y ≈ 11.5`).
- Head profile asymmetry per head: convex back (right), concave throat (left).
- `currentColor` fills/strokes, `fill` / `outline` variants, CSS-driven glow/pulse/
  spin, navbar + favicon sizing.

### 3.1 New central core (the "one body" anchor)

- A **pointy-top hexagon**, circumradius `Rc ≈ 12.5`, added as a separate path:
  - class `hydra-core`, `pathLength={1}`, drawn in both `fill` and `outline` variants.
- The three necks converge into it → **one body, three heads**.
- Crisp 60° edges = engineered, hex-grid-constructed look.
- Kills the empty-center problem and pulls optical weight inward.

```
CORE_PATH = M 50 37.5 L 60.82 43.75 L 60.82 56.25 L 50 62.5 L 39.18 56.25 L 39.18 43.75 Z
```

### 3.2 Evolved head profile (per head)

1. **Pointed snout** — kept at the outer radius (silhouette preserved).
2. **Bolder crown / hood** — head mass widened to ~13.5–14 units (V1 ≈ 12.3) so the
   head clearly overhangs the neck. Outer bound ≈ `x 57.8` (same as V1 → footprint unchanged).
3. **Concave throat notch** — a rightward dip between the jaw and the neck carves an
   **implied hood through negative space** (head hangs over a hollow = serpent cue).
4. **Short, thicker neck** that **flares back out** and overlaps into the hexagon core —
   removes the thin-stem extremity.

### 3.3 Draft master head path (pointing up) — final anchors tuned by eye at implementation

```
HEAD_PATH =
M 50 11.5
C 52.6 15, 55.4 18.6, 56.6 22
C 57.8 26, 57.4 29, 55.6 32.4
C 54.5 34.8, 53.6 36.6, 53.2 38.4
C 53 39.8, 52.9 41, 52.8 42.4
C 49.4 43.2, 46.2 43, 43.5 42.4
C 44.4 38, 44.8 34.5, 45 33.2
C 45.3 30.8, 46.2 30.2, 46.6 28.6   ← throat notch (concave hollow)
C 46 24.9, 45.5 24.3, 45.2 23.8      ← jaw overhang
C 46.3 20.6, 47.7 17, 48.5 14.5
C 49.2 13, 49.6 12, 50 11.5
Z
```

`hydra-head-1` = `rotate(120 50 50)`, `hydra-head-2` = `rotate(240 50 50)`.

### 3.4 Weight redistribution (+~20% optical weight)

- Mass moved from the thin neck into the center (hex core + flared neck bases).
- Heads marginally bolder, center substantially stronger.
- Snout radius and outer silhouette unchanged.

## 4. Compatibility check (must all stay true)

| Requirement | Status |
|---|---|
| Overall silhouette / three-way symmetry / center alignment | Unchanged construction, same radii |
| `hydra-head-0`, `hydra-head-1`, `hydra-head-2` classes | Preserved (paths kept separate) |
| `pathLength` / stroke-drawing / outline tracing | Preserved on every path (3 heads + 1 core) |
| Pulse / hover glow / slow rotation | Preserved — no CSS changes needed |
| `currentColor` implementation | Preserved |
| Navbar sizing / favicon usage | Preserved (no API/prop changes) |
| Invisible hexagonal construction philosophy | Strengthened (explicit hex core) |

**No path merging** — animation flexibility is kept.

## 5. Files to change

1. **`src/components/HydraLogo.tsx`**
   - Replace `HEAD_PATH` with the V2 draft above.
   - Add `CORE_PATH` (hexagon) and a `<path className="hydra-core" pathLength={1}>`
     inside the existing `<g className="hydra-heads">`.
   - Fill/outline logic unchanged (core inherits the same group fill/stroke).
   - No prop/API/class-name changes → all existing call sites keep working.
2. **`public/hydra-mark.svg`**
   - Regenerate favicon with V2 geometry: 3 arms + hex core, fill `#10b981`.
3. **`DESIGN.md`**
   - Update the *Implementation* bullets under `## HYDRA SAMO — Master Logo Design System`
     to document V2: hex core (`Rc ≈ 12.5`, `hydra-core`), throat-notch hood,
     weight redistribution, monochrome / 16px behavior.
   - The Master Brief section stays **verbatim, untouched**.
4. **`AGENTS.md`**
   - One-line governance update: add `hydra-core` to the class list in
     `## Logo & Brand Mark Governance`.

**Not changed:** `Navigation.tsx`, `Hero.tsx`, `PreSplashSelector.tsx`,
`PlymouthSplash.tsx`, `index.html`, `src/index.css`, translations, data.

## 6. Verification

- `npm run lint` (tsc --noEmit) — must stay clean.
- `npm run build` — must stay clean.
- **Visual pass (by you):** `npm run dev` — check navbar mark, hero mark,
  pre-splash / splash mark, and the favicon at 16px. Final ±1-unit anchor
  tuning happens based on what you see (I cannot render images).

## 7. Favicon / 16px expectation

- At 16px the silhouette stays a compact triangular-hex emblem: three snouts,
  a solid center, three head masses.
- Internal detail (throat notch) naturally disappears — acceptable and expected.

## 8. Decisions (recommended defaults — flag to override)

1. **Core = solid hexagon** — strongest anchor, clean at 16px.
   Alternative: hollow hex-ring with a small central void (more mechanical, weaker weight).
2. **Head read = moderate** — one concave throat notch + bolder crown, still fully abstract.
3. **Outline variant** draws arms + core hexagon → engineering-line "technical" look
   (intentional).

---
