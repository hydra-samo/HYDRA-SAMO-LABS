# Export Specification — Hydra Samo V4

## Master parameters (locked)

- Geometry: V4, `viewBox="11 2.94 78 78"`, 4 paths, pure `currentColor`-compatible fills.
- Origin: `(50, 50)`; three heads rotated 120°/240°; hex core.
- Head height (safe-zone module): 21.5 SVG units (tip `y=11.5` → core junction `y=33`).
- Mark bounding box: `x 35.28 … 64.72`, `y 11.5 … 67.0` (height ≈ 55.5 u) — always export with certified viewBox padding.

## Raster rules

| Use | Minimum | Preferred |
| --- | --- | --- |
| Favicon | 16 px | 32 px (ICO multi-res 16/32/48/64) |
| App icon | 48 px | 512 px, tile-to-edge for OS masks |
| OG / social | 512 px | 1024 px, optional abyssal tile |
| Hero / print proof | 1024 px | 3000 px |

- Export from SVG, never upscale a smaller raster.
- PNG `sRGB`; print `CMYK` separated from vector; alpha only for transparent deliveries.

## Naming

`hydra-mark_v4_<variant>-<size>px.<ext>` in `PNG/`, `FAVICON/`, `WEB/`, `SOCIAL/`, `APP/`, `PRINT/`.

## Deliverables that are intentionally absent

`.ai`, `.fig`, `.aep`, `.riv` are not generated (environment cannot author them natively).
Adobe workflows consume `PRINT/hydra-mark_v4_print.{pdf,eps,svg}`; AE consumes `MOTION/stroke-reveal.svg` + spec; Rive-compatible geometry ships as standard SVG paths.
