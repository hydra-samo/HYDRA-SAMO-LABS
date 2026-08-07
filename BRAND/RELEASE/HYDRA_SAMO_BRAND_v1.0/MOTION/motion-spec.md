# Hydra Samo — Motion Spec (Technical Reference)

| Property        | Value                                                        |
| --------------- | ------------------------------------------------------------ |
| Governing doc   | `13_MOTION_SYSTEM` (audit) / `14_INTERACTION_MODEL`          |
| Source geometry | `ASSETS/MASTER/hydra-mark_v4_master.svg` (certified V4)      |
| Certified state | V4 logo, `viewBox="11 2.94 78 78"`, 4 paths, `pathLength="1"` |
| Class hooks     | `.hydra-mark-glow`, `.hydra-mark-pulse` (CSS utility layer, `src/index.css`) |
| Forbidden       | Continuous rotation (`.hydra-mark-spin` retired). See `rotation-forbidden.md`. |

## Motion library

| File                   | Purpose                              | Duration | Loop |
| ---------------------- | ------------------------------------ | -------- | ---- |
| `stroke-reveal.svg`    | Page load / hero entrance            | 1.4 s    | no   |
| `outline-trace.svg`    | Outline-only accent trace            | 1.6 s    | no   |
| `loading-loop.svg`     | Loading state (approved pulse)       | 3.2 s    | yes  |
| `idle-pulse.svg`       | Subtle breathing, non-primary only   | 4.5 s    | yes  |
| `hover.svg`            | Hover lift (scale 1.05)              | 0.2 s    | no   |

## Presets

- **Easing**: `cubic-bezier(0.65, 0, 0.35, 1)` for entrances; `ease-out` for traces.
- **Stagger**: 0.15 s between heads (draw order: head 1 → 2 → 3 → core).
- **Pulse**: opacity `1 → 0.55`, scale `1 → 0.9`, 3.2 s infinite.
- **Reduced motion**: every demo honors `prefers-reduced-motion: reduce` (animation disabled, geometry static, no fill animation).

## Rules

1. Lighting/glow stay in the CSS layer (`.hydra-mark-glow`); never bake into SVG.
2. Never re-trace paths; reuse the four certified path geometries.
3. Animation must not distort geometry — only opacity/transform/stroke-dash.
