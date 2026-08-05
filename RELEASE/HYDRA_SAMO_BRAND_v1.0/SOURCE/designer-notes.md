# Designer Notes — Hydra Samo Brand Mark V4

## The concept

A single mark, three heads, one shared core. The Hydra is not a logo about repetition —
it is about many directions of intent growing from one source. Preserve that in every
retouch: heads always trace back to the central hexagon.

## Do

- Use only the four certified paths; transform them (rotate/scale) but never reshape `d`.
- Keep fills `currentColor`-ready; externalize glow (`hydra-mark-glow`) and pulse.
- Respect the safe zone (one head height = 21.5 u) and the abyssal/emerald palette.

## Never

- Add text, initials, typography, slogans, or borders to the mark (icon-only governance).
- Re-trace or re-import raster artwork into the SVG.
- Use neon cyan (`#00FFCC`, `#00F0FF`), bright blue gradients, or SaaS-style badges near the mark.
- Animate rotation (`.hydra-mark-spin` retired); a 3-fold rotating mark reads as a generic fan.

## Construction reference

- Tip circle: `R 38.5` from `(50,50)`.
- Core hexagon: inscribed in `R 16` from `(50,50)`.
- Heads at 120°; head tip `(50,11.5)`; head-to-core junction `(50,33)`.
- See `hydra-mark_v4_construction.svg` and `hydra-mark_v4_spacing.svg`.
