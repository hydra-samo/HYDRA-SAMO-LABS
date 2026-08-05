# Geometry Sheet — Hydra Samo Mark V4

Certified parameters, from `MASTER/hydra-mark_v4_master.svg`.

| Parameter | Value |
| --- | --- |
| viewBox | `11 2.94 78 78` (square) |
| Paths | 4 (3 heads + hex core) |
| Origin / rotation center | `(50, 50)` |
| Head rotations | `0°`, `120°`, `240°` (static `rotate(...)` only) |
| Head tip (head 0) | `(50, 11.50)` |
| Head → core junction | `(50, 33.00)` |
| Head height (safe-zone module) | `21.5 u` |
| Core hexagon | vertices `(50,33) (64.72,41.5) (64.72,58.5) (50,67) (35.28,58.5) (35.28,41.5)` |
| Core circumradius | `16 u` |
| Tip circle radius | `38.5 u` (through head tips) |
| Full mark extent | x `16.65…83.35`, y `11.5…72.2` (incl. rotated head tips) |
| pathLength | `1` on all four paths (for draw/trace math) |

## Rules

1. Never reshape `d`; only rotate/scale the certified paths.
2. No text, initials, borders, or gradients inside the mark.
3. Glow/reflections live in CSS (`.hydra-mark-glow`), never in the SVG.
4. Rotation animation is forbidden (`.hydra-mark-spin` retired).
