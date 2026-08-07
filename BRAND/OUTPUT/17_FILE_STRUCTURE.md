# HYDRA SAMO — Production File Structure

## Phase 08 — Complete Brand Folder Hierarchy

The production archive layout for the entire brand asset ecosystem. This is the target structure under the brand asset root (recommended as `brand/` at the repository root or a managed drive). Directories are created and populated by the export pipeline (`11_EXPORT_PIPELINE.md`); the certified assets already live at the paths noted below.

---

# 1. Hierarchy

```
brand/
├── MASTER/
│   ├── vector/
│   │   ├── hydra-mark_v4.svg          # certified standalone master (≡ public/hydra-mark.svg)
│   │   ├── hydra-mark_v4_fill.svg
│   │   ├── hydra-mark_v4_outline.svg
│   │   └── hydra-mark_v4_white_mono.svg
│   ├── component/
│   │   └── HydraLogo.tsx              # live geometry source (repo mirror)
│   ├── social_card/
│   │   └── hydra_logo_v4.jpg          # 1024×1024 OG/Twitter card
│   └── MANIFEST.md                    # checksums, owners, freeze record (≡ OUTPUT/10_MASTER_ASSET.md)
│
├── EXPORTS/
│   ├── svg/
│   ├── png/
│   ├── webp/
│   ├── ico/
│   ├── pdf/
│   ├── eps/
│   ├── ai/
│   └── fig/
│       (each: emerald_fill/ emerald_outline/ white_fill/ black_fill/,
│        size folders 16/ 24/ 32/ 48/ 64/ 128/ 256/ 512/ 1024/ 2048/ as needed)
│
├── WEBSITE/
│   ├── favicon/                       # hydra-mark.svg ref, favicon.ico, apple-touch-icon.png, safari-pinned-tab.svg
│   ├── manifest/                      # android-chrome-192/512.png, manifest.webmanifest
│   ├── og/                            # hydra_logo.jpg (1024), og.webp variants
│   └── ui/                            # HydraLogo.tsx mirror, mark utilities notes
│
├── SOCIAL/
│   ├── instagram/
│   ├── behance/
│   ├── linkedin/
│   ├── github/
│   ├── youtube/
│   ├── discord/
│   ├── x/
│   └── portfolio/
│       (avatars/, banners/, thumbnails/ per platform spec — OUTPUT/14_SOCIAL_SYSTEM.md)
│
├── PRINT/
│   ├── business-cards/
│   ├── letterheads/
│   ├── invoices/
│   ├── contracts/
│   ├── slides/
│   ├── packaging/
│   ├── merchandise/
│   └── process-specs/                 # spot colors, line-width matrix (≡ OUTPUT/15_PRINT_SYSTEM.md)
│
├── MOTION/
│   ├── ae/                            # After Effects source projects
│   ├── lottie/                        # exported .json
│   ├── rive/                          # .riv sources
│   ├── blender/                       # 3D source scenes
│   └── renders/                       # final motion deliverables
│
├── GUIDELINES/
│   ├── 10_MASTER_ASSET.md
│   ├── 11_EXPORT_PIPELINE.md
│   ├── 12_WEBSITE_ASSETS.md
│   ├── 13_MOTION_SYSTEM.md
│   ├── 14_SOCIAL_SYSTEM.md
│   ├── 15_PRINT_SYSTEM.md
│   ├── 16_BRAND_GOVERNANCE.md
│   ├── 17_FILE_STRUCTURE.md
│   ├── 18_QA_VALIDATION.md
│   └── 19_FINAL_RELEASE.md
│
├── ARCHIVE/
│   ├── v1/
│   ├── v2/
│   └── retired-colorways/             # teal/violet/warm legacy rasters (retired, read-only)
│
└── RELEASES/
    └── v4.0.0/                        # tagged release snapshot (≡ OUTPUT/19_FINAL_RELEASE.md)
```

---

# 2. Directory Roles

| Directory | Role | Populated by |
|---|---|---|
| `MASTER/` | Certified, immutable source assets + manifest | Brand freeze; only approved modifications |
| `EXPORTS/` | Every generated format/size from the master | Export pipeline |
| `WEBSITE/` | Site-deliverable assets (favicons, manifest, OG, UI) | Export pipeline + site deploy |
| `SOCIAL/` | Per-platform social asset sets | Export pipeline |
| `PRINT/` | Per-surface print files + process specs | Export pipeline |
| `MOTION/` | Animation sources + final renders | Motion workflow |
| `GUIDELINES/` | The 10 production docs (this series) | Documentation pipeline |
| `ARCHIVE/` | Superseded versions + retired colorways (read-only) | Every release |
| `RELEASES/` | Tagged release snapshots | Release process |

# 3. Rules

1. **MASTER/ is immutable** — writes require brand-owner approval and modify only `MANIFEST.md` or the versioned file set.
2. **EXPORTS/ is disposable** — regenerate any time; never hand-edit an export (edit the master, re-export).
3. **ARCHIVE/ is read-only** — retired assets are kept for provenance, never reused.
4. **GUIDELINES/ mirrors the canonical docs in the repo `BRAND/OUTPUT/`** — the repo `BRAND/OUTPUT/` is the source of truth; the brand drive copy is a mirror.
5. **RELEASES/** holds a frozen snapshot per release tag (`v4.0.0`, …) including the asset manifest, so the brand can be reproduced from any release.
6. **Naming** everywhere follows `11_EXPORT_PIPELINE.md` §2; no version stamps inside `EXPORTS/` (the folder path carries it).

---

# 4. Repository ↔ Brand Drive Mapping

| Repo path | Brand drive path |
|---|---|
| `WEBSITE_v1.1/public/hydra-mark.svg` | `brand/MASTER/vector/hydra-mark_v4.svg` |
| `WEBSITE_v1.1/src/components/HydraLogo.tsx` | `brand/MASTER/component/HydraLogo.tsx` |
| `WEBSITE_v1.1/public/hydra_logo.jpg` | `brand/MASTER/social_card/hydra_logo_v4.jpg` |
| `BRAND/OUTPUT/10_MASTER_ASSET.md` … `19_FINAL_RELEASE.md` | `brand/GUIDELINES/` |
