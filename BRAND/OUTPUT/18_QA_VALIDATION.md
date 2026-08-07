# HYDRA SAMO — QA Validation Checklist

## Phase 09 — Final Production QA

Every checklist item defines **PASS criteria**, **FAIL criteria**, and a **verification method**. Run the full checklist on every release; partial runs are allowed for point changes but must be recorded as such.

---

# 1. SVG Integrity

| Item | PASS | FAIL | Verification |
|---|---|---|---|
| Master geometry unchanged | Path data in the deployed file matches the certified V4 paths; viewBox `11 2.94 78 78`; no added/replaced paths | Any path data diff, frame change, merged/added path | `diff` against certified path strings; re-measure wedge 57.5° ± tolerance and tangency 0.0° |
| Class contract intact | `hydra-head-0/1/2` + `hydra-core` present; 3-fold `rotate(120/240 50 50)`; `pathLength={1}`; `currentColor` | Missing/renamed classes, removed transforms or pathLength | Grep the SVG and `HydraLogo.tsx` for the class + attribute set |
| No baked decoration | No gradients, glow, shadows, or reflections inside the SVG; no `<defs>` lighting | Any `<linearGradient>`, `<filter>`, drop-shadow, or fill-rule abuse | Inspect markup; `rg -n "gradient|filter|drop-shadow"` on the master |
| Checksum matches | `sha256sum` equals the recorded master checksum (once set) | Checksum mismatch | `sha256sum WEBSITE_v1.1/public/hydra-mark.svg` vs `10_MASTER_ASSET.md` |

# 2. Favicon Readability

| Item | PASS | FAIL | Verification |
|---|---|---|---|
| 16 px legibility | Three distinct head masses + visible center core; no merged blob | Single blob; heads or core invisible | Rasterize 16 px (or 64→16 px LANCZOS) and inspect; ink coverage ≈42%, bbox ≥75% of tile |
| Optical centering | Mark optically centered in tile | Off-center >5% | Pixel bbox measurement on the rasterized tile |
| Contrast | Silhouette legible against light + dark browser UIs | Mark indistinguishable | Render on both backgrounds |

# 3. Website Integration

| Item | PASS | FAIL | Verification |
|---|---|---|---|
| All surfaces use one mark | Nav, hero, footer, splash, favicon, OG all show the certified mark | Any surface shows a legacy/different asset | Visual diff per surface; grep legacy references |
| Favicon wired | `WEBSITE_v1.1/index.html` references `%BASE_URL%hydra-mark.svg`; resolves on the deployed subpath | 404 favicon; wrong base path | Open deployed site; `curl` the favicon URL |
| OG wired | `WEBSITE_v1.1/metadata.json` → `useOpenGraph.ts` injects `og:image` / `twitter:image` pointing at `/hydra_logo.jpg` resolved through BASE_URL | Missing/incorrect OG tags or image URL | Inspect `<head>` on deployed site; validate with a card debugger |
| Build clean | `npm run lint` (tsc --noEmit) and `npm run build` pass; call sites unchanged | Type errors or broken surfaces | Run both commands |

# 4. Motion Compatibility

| Item | PASS | FAIL | Verification |
|---|---|---|---|
| Stroke-draw readiness | All paths stroke-draw cleanly via `pathLength`; reveal ends at full fill | Dashed leftover, incomplete reveal, or path drift | Animate a test reveal at display size |
| No spin | No `.hydra-mark-spin` or equivalent rotation anywhere | Any continuous rotation reference | `rg -n "spin|rotate" WEBSITE_v1.1/src/index.css WEBSITE_v1.1/src/components` |
| Motion settles | Approved reveals settle; only the loading pulse loops | Busy/infinite non-approved loop | Watch each motion surface |
| Reduced motion | `prefers-reduced-motion: reduce` disables pulse/ambient/reveals; mark renders static | Animation continues under reduced motion | Emulate the media query and inspect |

# 5. Print Readiness

| Item | PASS | FAIL | Verification |
|---|---|---|---|
| Vector print files | PDF/EPS/AI exports carry the mark as vector, no fonts unembedded, no raster placeholders | Rasterized mark, missing fonts | Open in Acrobat/AI; font + vector check |
| Spot color named | Mark uses spot `HYDRA EMERALD` (or solid emerald/foil) | Mark built from tint mixes | Inspect color separations |
| Minimum sizes honored | Mark meets the per-process minimum (embroidery 45 mm, laser 12 mm, foil 15 mm, vinyl 40 mm) | Below minimum | Layout measure |
| Line widths | Minimum line widths per `15_PRINT_SYSTEM.md` §4 met | Hairlines that will close up | Measure on the vector |

# 6. Responsive Scaling

| Item | PASS | FAIL | Verification |
|---|---|---|---|
| 16→2048 px | Mark legible and on-identity at every step (16/24/32/48/64/128/256/512/1024/2048) | Any size breaks the tri-head read or collapses detail | Rasterize full matrix; eyeball + ink checks |
| Retina | Renders sharp at 2× and 3× DPR | Softness, moiré, halo | 1024 px render viewed at 2× and 3× device scale |
| Uniform aspect | All exports are 1:1 and un-distorted | Squash/stretch | Compare exported dimensions |

# 7. Retina Displays

| Item | PASS | FAIL | Verification |
|---|---|---|---|
| 2× assets present | UI/favicon/OG assets exported at ≥2× target and downscaled | 1×-only assets scaled up | Check export matrix (`11_EXPORT_PIPELINE.md` §1.2) |
| Alpha preserved | Transparent exports show no fringe on dark and light | Halos/fringe | Checkerboard + both-background check |

# 8. Accessibility

| Item | PASS | FAIL | Verification |
|---|---|---|---|
| Mark decorative | `aria-hidden="true"`, `focusable="false"`; brand name as text | Screen readers announce meaningless mark paths | Inspect markup; run a screen-reader pass |
| Reduced motion | See §4 | — | — |
| Contrast | Emerald mark ≥3:1 on its background; body text AA | Below-threshold contrast | Contrast checker on the reference pairings |

# 9. Animation Consistency

| Item | PASS | FAIL | Verification |
|---|---|---|---|
| One motion language | All surfaces use the durations/easings in `13_MOTION_SYSTEM.md` (§5) | Errant timing/easing per surface | Audit keyframes and Framer Motion props |
| Stagger order | Heads then core on reveals; mark before text | Wrong draw order | Watch reveals |
| Color consistency | All motion uses certified palette; no cyan/neon flashes | Palette drift in motion | Frame grab + hex check |

# 10. Folder Consistency

| Item | PASS | FAIL | Verification |
|---|---|---|---|
| Hierarchy exists | `17_FILE_STRUCTURE.md` tree populated for released categories | Missing required directories | Compare `find` output to the tree |
| MASTER immutable | Master dir clean; only approved writes | Unapproved modifications in MASTER | `git status` + checksum |
| ARCHIVE read-only | Retired assets present and unmodified | Retired assets reused | Timestamps + review |

# 11. Naming Consistency

| Item | PASS | FAIL | Verification |
|---|---|---|---|
| Convention followed | All files match `11_EXPORT_PIPELINE.md` §2 template | Non-conforming names | Glob + regex audit |
| No version stamps in EXPORTS | Names carry only asset/colorway/variant/size | `_v4`, `final`, dates in names | Filename audit |

# 12. Documentation Completeness

| Item | PASS | FAIL | Verification |
|---|---|---|---|
| All 10 docs present | `10` … `19_FINAL_RELEASE.md` exist in `BRAND/OUTPUT/` | Missing phase doc | List `BRAND/OUTPUT/` |
| Cross-references resolve | Referenced docs/filenames exist | Broken references | Link check the 10 docs |
| Release manifest up to date | `19_FINAL_RELEASE.md` reflects this release's assets and checksums | Stale manifest | Diff manifest vs actual files |

---

# Result Recording

- **All PASS:** release is production-ready; proceed to `19_FINAL_RELEASE.md`.
- **Any FAIL:** block release; fix at the source (master/pipeline), re-export, re-run the failed items, then re-run the full checklist.
