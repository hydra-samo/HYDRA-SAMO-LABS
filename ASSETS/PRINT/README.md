# Print Package — Hydra Samo Brand Mark V4

| File | Type | Use |
| --- | --- | --- |
| `hydra-mark_v4_print.pdf` | Vector PDF 1.7 | Adobe-ready master for print agencies |
| `hydra-mark_v4_print.eps` | Vector EPS (DSC 3.0) | Legacy desktop publishing (InDesign/Illustrator) |
| `hydra-mark_v4_print.svg` | Vector SVG | Canonical geometry (same file as MASTER) |
| `hydra-mark_v4_rgb-3000px.png` | RGB PNG | Previews / digital proofing |
| `hydra-mark_v4_cmyk-3000px.tiff` | CMYK TIFF | CMYK preview — always re-separate from vector for press |
| `hydra-mark_v4_black-3000px.png` | 1-color PNG | One-color/grayscale proof |
| `hydra-mark_v4_white-on-abyss-3000px.png` | PNG | Reverse on abyssal `#060c09` |
| `hydra-mark_v4_laser-3000px.png` | PNG | Laser-cut silhouette template |
| `hydra-mark_v4_outline-3000px.png` | PNG | Outline/etch proof |

## Production notes

- **Canonical print source**: `hydra-mark_v4_print.svg` (V4 master). All print derivatives re-separate from it; never from a raster.
- **`.ai` / `.fig` / `.aep` / `.riv` are not shipped** — the build environment cannot natively author those formats. Vendors open the EPS/PDF/SVG directly.
- **Spot (foil, embroidery, vinyl)**: supply `hydra-mark_v4_print.svg` to the vendor. Do not pre-fill spot colors; specify spot per vendor (e.g., foil PANTONE 7479 C / bright emerald).
- **Foil / foil-stamp dies**: use the `outline` or `black` geometry; confirm die tolerance (min 0.15 mm bridges at the three head joints).
- **CMYK**: brand emerald is best reproduced with a dedicated spot. For 4/c process proofing reference the TIFF; final separations from vector.
- **Bleed & safe area**: the mark's certified geometry includes no internal clearance requirement beyond the standard safe zone of one head-height (`21.5` SVG units, tip-to-core-junction) on every side; the abyssal tile (if used) must extend to bleed.

## Safe zone

Keep clear space equal to one head height (21.5 SVG units) on all sides unless overlaid on approved photographic hero treatments.
