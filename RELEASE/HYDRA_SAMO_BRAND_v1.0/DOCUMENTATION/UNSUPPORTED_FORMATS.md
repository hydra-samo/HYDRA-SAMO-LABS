# Unsupported Proprietary Formats

The production environment cannot natively author proprietary binary formats.
Per pipeline rule, these are documented — never fabricated. Adobe/Rive/Figma
workflows consume the shipped vector deliverables and re-author on demand.

| Deliverable | Purpose | Expected format | Creation software | Source asset | Destination | Status |
| --- | --- | --- | --- | --- | --- | --- |
| `hydra-mark_v4_master.ai` | Native Illustrator master | `.ai` (CS6+) | Adobe Illustrator | `PRINT/hydra-mark_v4_print.svg` | `PRINT/hydra-mark_v4_master.ai` | Not generated — use `print.svg` / `print.eps` / `print.pdf` |
| `hydra-mark_v4_source.fig` | Editable Figma source | `.fig` | Figma | `SOURCE/hydra-mark_v4_editable.svg` | `SOURCE/hydra-mark_v4_source.fig` | Not generated — import SVG directly |
| `hydra-mark_v4_stroke-reveal.aep` | AE entrance comp | `.aep` | Adobe After Effects | `MOTION/stroke-reveal.svg` + `MOTION/motion-spec.md` | `MOTION/stroke-reveal.aep` | Not generated — recreate from SVG + spec |
| `hydra-mark_v4.riv` | Rive animation source | `.riv` | Rive | `MOTION/stroke-reveal.svg` + `motion-spec.md` | `MOTION/hydra-mark_v4.riv` | Not generated — geometry imports as standard SVG paths |

## Manual creation workflows

1. **Illustrator (.ai)**: `File → Open → PRINT/hydra-mark_v4_print.svg` → `Save As → Adobe Illustrator (.ai)`. Keep the four paths untouched; do not add text, borders, or internal gradients (icon-only governance).
2. **Figma (.fig)**: drag `SOURCE/hydra-mark_v4_editable.svg` onto the canvas → `File → Save local copy (.fig)`. Externalize glow to effect layers.
3. **After Effects (.aep)**: import `MOTION/stroke-reveal.svg` as a composition. Keyframe `stroke-dashoffset` (1 → 0) per path with 0.15 s stagger, easing `cubic-bezier(0.65,0,0.35,1)`. Honor `prefers-reduced-motion`.
4. **Rive (.riv)**: import the four SVG paths; drive with a timeline. Keep `pathLength="1"` for uniform draw.

**Status**: all four are intentionally absent; QA treats documented unsupported formats as PASS.
