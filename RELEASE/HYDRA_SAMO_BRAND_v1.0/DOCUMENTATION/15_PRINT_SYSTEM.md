# HYDRA SAMO — Print System

## Phase 06 — Production Print Specifications

The certified V4 mark is monochrome-true and manufacturing-robust (validated for engraving, vinyl, and print in the review pipeline). All print files are exported from the master SVG per `11_EXPORT_PIPELINE.md` (PDF/EPS/AI vector, or ≥2048 px PNG for raster workflows).

---

# 1. Print Surfaces

## 1.1 Business Cards

| Field | Spec |
|---|---|
| Size | 85×55 mm (standard) / 90×50 mm (optional) |
| Mark | Front face, center or corner anchor; min height 12 mm |
| Paper | ≥300 gsm matte or soft-touch stock |
| Finish options | Spot-UV on mark, black-on-black deboss, or emerald foil |
| Clear space | 1 mark-height on all sides of the mark |

## 1.2 Letterheads

| Field | Spec |
|---|---|
| Size | A4 (210×297 mm) |
| Mark | Header zone, 18–22 mm height, top-left or centered |
| Footer rule | 0.4 pt hairline in Deep Jade `#059669` (or 20% emerald tint) |
| Type | Geist family; body 9–10 pt |

## 1.3 Invoices

| Field | Spec |
|---|---|
| Size | A4 |
| Mark | Header 16–18 mm; watermark ≤8% opacity center (optional) |
| Legal line | 7 pt muted slate |

## 1.4 Contracts

| Field | Spec |
|---|---|
| Size | A4 |
| Mark | Cover page center 28–32 mm; running footer 10 mm |
| Signature block | Mark + name line; mark height ≥ 8 mm |

## 1.5 Presentation Slides

| Field | Spec |
|---|---|
| Ratio | 16:9 (1920×1080) |
| Mark | Corner anchor 24–32 px at 100% zoom; title-slide center 96–128 px |
| Background | Abyssal `#060c09` (dark decks) or white (light decks) |
| Watermark | ≤10% opacity bottom-right |

## 1.6 Packaging

| Field | Spec |
|---|---|
| Mark | Primary panel ≥20 mm height; contrast against stock |
| Material note | On dark packaging use emerald foil or emboss; on kraft/light use black mono |
| Dieline | Never place the mark on a fold line or >3 mm from an edge |

## 1.7 Merchandise

| Field | Spec |
|---|---|
| Apparel | Chest mark 60–80 mm; left-sleeve mark 35–45 mm |
| Mug / drinkware | Mark 45–55 mm high, centered |
| Stickers | Die-cut to mark silhouette; min 25 mm |
| Drawstring/pouch | Black mono or emerald foil |

---

# 2. Specialty Processes

## 2.1 Embroidery

| Constraint | Spec |
|---|---|
| Minimum mark size | 45 mm height |
| Minimum stitch width | 2 mm (use a perimeter stroke ≥1.5 mm if under this) |
| Colors | Emerald `#10b981` thread or white mono on dark; one-color max |
| Density | Avoid tiny interior details below 3 mm; the throat notch needs ≥4 mm to read |

## 2.2 Laser Engraving

| Constraint | Spec |
|---|---|
| Minimum mark size | 12 mm height (metal/acrylic) |
| Minimum line width | 0.3 mm |
| Mode | Filled silhouette best; outline mode needs 0.5 mm+ stroke |
| Materials | Stainless, anodized aluminum, acrylic, leather — all verified acceptable in review |

## 2.3 Foil Stamping

| Constraint | Spec |
|---|---|
| Minimum mark size | 15 mm height |
| Foil color | Emerald foil preferred; gold/black foil optional per surface |
| Minimum line width | 0.25 mm (engraved die) |
| Surfaces | Business cards, letterheads, packaging, merch tags |

## 2.4 Vinyl Cutting

| Constraint | Spec |
|---|---|
| Minimum mark size | 40 mm height |
| Minimum bridge width | 1.5 mm between islands (throat notch, hex interior) |
| Weeding | One-color; black or emerald film |

---

# 3. Color Notes

## 3.1 CMYK equivalents

| Token | Hex | CMYK approx | Purpose |
|---|---|---|---|
| Mythic Emerald | `#10b981` | C 84 / M 0 / Y 55 / K 7 | Spot-foil match; rich emerald |
| Deep Jade | `#059669` | C 88 / M 0 / Y 60 / K 18 | Depth accents |
| Soft Mint | `#34d399` | C 68 / M 0 / Y 50 / K 0 | Highlight (print rarely uses) |
| Abyssal Slate | `#060c09` | C 80 / M 55 / Y 70 / K 95 | Dark canvases |
| Bone | `#f3f4f6` | C 3 / M 2 / Y 3 / K 0 | Off-white text |

> CMYK values are process approximations for 4-color jobs. For exact brand color use spot/Pantone equivalents (`PMS 16-6340`-class green; confirm the Pantone chip with the printer) or emerald foil.

## 3.2 Spot colors

- Prefer a single spot emerald for logo-critical print (foil or PMS ink) to guarantee brand accuracy.
- Never mix the mark from CMYK tints of two inks; print it spot or solid.

---

# 4. Minimum Line Widths

| Process | Minimum | Notes |
|---|---|---|
| Offset / digital print | 0.1 pt (0.035 mm) | Hairline rules 0.4 pt min |
| Laser engrave | 0.3 mm | |
| Foil stamp | 0.25 mm | |
| Vinyl cut | 1.5 mm bridge | |
| Embroidery | 1.5–2 mm | |

---

# 5. Print QA (summary)

- Vector files carry no fonts (all type outlined or embedded) and no placed rasters unless intended.
- Raster print files ≥2048 px on the shortest mark axis; 300 DPI at final size.
- Verify the mark's throat-notch and hex-core details survive at the chosen process's minimum size (per §2).
- Spot color swatches are named `HYDRA EMERALD` and applied only to the mark; no alternate colorways.
