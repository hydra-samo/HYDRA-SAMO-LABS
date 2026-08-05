# HYDRA SAMO — Export Pipeline

## Phase 02 — Export Pipeline Specification

Every export is generated from the certified master (`public/hydra-mark.svg`, geometry identical to `src/components/HydraLogo.tsx`). **No export may be hand-recreated.** Export from the source, verify, then release.

---

# 1. Export Matrix

## 1.1 Formats

| Format | Ext | Use | Resolution/Vector | Transparency |
|---|---|---|---|---|
| **SVG** | `.svg` | Master, web, favicon, vector editing, motion | Vector | Yes (native) |
| **PNG** | `.png` | Raster web assets, favicons, social, print raster | 16–2048 px | Yes |
| **WEBP** | `.webp` | Compressed web delivery | 512–2048 px | Yes |
| **ICO** | `.ico` | Windows browser favicon | Multi-res (16–64 px, +256) | Yes |
| **PDF** | `.pdf` | Vector print / client deliverables | Vector | Yes |
| **EPS** | `.eps` | Legacy vector print (Illustrator) | Vector | Yes |
| **AI** | `.ai` | Editable Illustrator master for print partners | Vector | Yes |
| **FIG** | `.fig` | Figma brand library / site UI token | Vector | Yes |

## 1.2 Required raster sizes

Applies to PNG and WEBP where applicable:

| px | Typical surface |
|---|---|
| 16 | Favicon (minimum legible surface) |
| 24 | UI inline, browser toolbar |
| 32 | Favicon / window icon |
| 48 | App icon grid, OS docks |
| 64 | Browser icon, small avatars |
| 128 | Standard avatar (GitHub, Discord) |
| 256 | App icon, storefront (2× of 128) |
| 512 | PWA / Android maskable icon |
| 1024 | OpenGraph / social card, App Store |
| 2048 | Full-bleed print raster, retina canvas |

---

# 2. Naming Conventions

Standard template:

```
hydra-{asset}-{colorway}-{variant}-{size}px.{ext}
```

| Segment | Allowed values |
|---|---|
| `asset` | `mark` (standard), `favicon`, `og` (social card), `avatar`, `appicon`, `mask` (Safari), `touch` (Apple), `logo` (print) |
| `colorway` | `emerald`, `jade`, `mint`, `white`, `black` |
| `variant` | `fill`, `outline` |
| `size` | numeric px: `16`, `24`, `32`, `48`, `64`, `128`, `256`, `512`, `1024`, `2048` (vector formats omit `{size}`) |
| `ext` | `svg`, `png`, `webp`, `ico`, `pdf`, `eps`, `ai`, `fig` |

**Examples:**

- `hydra-mark-emerald-fill-512px.png`
- `hydra-mark-white-fill-128px.svg`
- `hydra-favicon-emerald-fill-32px.ico`
- `hydra-og-emerald-fill-1024px.webp`
- `hydra-mark-emerald-fill-master.pdf`

**Rules:**

- Lowercase, kebab-case, no spaces.
- Version tag only on MASTER assets (`hydra-mark_v4.svg`); all derived exports drop the version tag (the folder version covers it).
- Never include author initials, dates, or "final/final2" in filenames.

---

# 3. Folder Structure (target)

Exports are mirrored in the production hierarchy defined by `17_FILE_STRUCTURE.md`:

```
EXPORTS/
├── svg/
│   ├── emerald_fill/
│   ├── emerald_outline/
│   ├── white_fill/
│   └── black_fill/
├── png/
│   ├── emerald_fill/
│   ├── emerald_outline/
│   ├── white_fill/
│   └── black_fill/
├── webp/
├── ico/
├── pdf/
├── eps/
├── ai/
└── fig/
```

Each size folder inside the colorway/variant folders may be used (`16/`, `24/`, … `2048/`) when many sizes accumulate.

---

# 4. Variant Specification

## 4.1 Transparent variants

- **Canvas:** fully transparent background (`rgba(0,0,0,0)`), no matte baked in.
- **SVG:** native transparency (no background rect).
- **PNG/WEBP:** alpha channel retained; verify with checkerboard view.
- **PDF/EPS/AI:** transparent artboard, no background shape.

## 4.2 Monochrome variants

| Variant | Fill | Use |
|---|---|---|
| `white_fill` | `#ffffff` | Dark surfaces, embossing, overlays on imagery |
| `black_fill` | `#000000` | Light surfaces, light print paper, etching |

The mark is **monochrome-true** — the certified geometry renders correctly in pure black and pure white with no fill fragility.

## 4.3 Outline variants

- `emerald_outline` — emerald stroke (`#10b981`, stroke width 3 units at source scale), transparent core, `stroke-linecap="round"`.
- Certified behaviour: **no interior tail strokes** cross the transparent hexagon (validated in `05_LOGO_REVIEW_REPORT.md`, outline-leak gate).
- Outline is for technical/annotation contexts; it is not a substitute for the fill mark in primary brand placement.

## 4.4 Filled variants

- Default `fill` variant: solid `currentColor`-equivalent fill, no strokes.
- Colorways: emerald, jade, mint, white, black.

---

# 5. Export Commands (reference)

Recorded here for repeatability. Tool availability must be confirmed before execution; nothing below modifies the master.

## 5.1 PNG (rsvg-convert — used during certification validation)

```bash
rsvg-convert -w 512 -h 512 public/hydra-mark.svg -o hydra-mark-emerald-fill-512px.png
```

Repeat for each required size. Use 2× (or 4×) supersampling then downscale with LANCZOS for sub-32 px exports to preserve the tri-head read (see `18_QA_VALIDATION.md`).

## 5.2 WEBP (from PNG)

```bash
cwebp -q 90 hydra-mark-emerald-fill-1024px.png -o hydra-og-emerald-fill-1024px.webp
```

## 5.3 ICO (ImageMagick, multi-resolution)

```bash
magick hydra-mark-emerald-fill-16px.png hydra-mark-emerald-fill-32px.png \
        hydra-mark-emerald-fill-48px.png hydra-mark-emerald-fill-64px.png \
        -compress None hydra-favicon-emerald-fill-32px.ico
```

## 5.4 PDF / EPS (Inkscape or Illustrator)

```bash
inkscape public/hydra-mark.svg --export-type=pdf --export-filename=hydra-mark-emerald-fill.pdf
inkscape public/hydra-mark.svg --export-type=eps --export-filename=hydra-mark-emerald-fill.eps
```

## 5.5 AI / FIG

- **AI:** open `hydra-mark.svg` in Adobe Illustrator, save as `.ai` (no re-draw, no path edits).
- **FIG:** import the SVG into the brand library component (or embed via the Figma API) as an instance of the master; do not re-trace.

---

# 6. Quality Gates (every export)

| Gate | Requirement |
|---|---|
| Source | Generated from master only; no re-drawing |
| Geometry | Unchanged — diff the SVG path data before/after any export |
| Colors | Match approved palette (no hex drift) |
| Transparency | Alpha correct; no halo/background leak |
| Legibility | 16 px shows three head masses + visible core (42% ink gate) |
| Naming | Conforms to §2 |
| Checksum | Master checksum recorded in `10_MASTER_ASSET.md` |
| QA | Each batch passes the relevant items of `18_QA_VALIDATION.md` |

---

# 7. Retry / Re-export Policy

- Re-exports are free and encouraged; **re-creations are prohibited**.
- If a tool introduces a rendering artifact, correct the tooling, never the mark.
- Export errors are documented in the release notes (`19_FINAL_RELEASE.md`).
