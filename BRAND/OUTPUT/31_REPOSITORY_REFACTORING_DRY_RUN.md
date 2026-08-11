# HYDRA SAMO — REPOSITORY REFACTORING DRY RUN REPORT
## Safe Repository Migration — Analysis Only (Zero Filesystem Changes to Existing Files)
### Orchestrator: `OUTPUT/31_REPOSITORY_WORKSPACE_MIGRATION.md`
### Date: 2026-08-07

---

# 1. EXECUTIVE SUMMARY

The repository is a single **production-ready Vite 6 + React 19 + TypeScript** portfolio (HYDRA SAMO LABS) that mixes two concerns at the root: the **production website** (`src/`, `public/`, `index.html`, Vite configs, metadata) and the **immutable brand system** (`ASSETS/`, `DOCUMENTATION/`, `OUTPUT/`, `RELEASE/`, `REVIEWS/`, `PROJECT_HISTORY/`, `DESIGN.md`, `AGENTS.md`).

The migration reorganizes the root into the official **HYDRA SAMO workspace**: `BRAND/` + `WEBSITE_v1.1/`, preserving git history, build integrity, runtime behavior, imports, assets, documentation, deployment, and the certified brand release.

**Verdict: SAFE TO PROCEED** after user approval. All moves are `git mv` (history-preserving). The website is internally self-contained (relative imports only, `metadata.json` imported via relative path, `base: './'` build), so the site keeps working once moved. Two high-risk areas require deliberate handling before execution: **CI/CD deploy paths** and **the ~60 brand docs that reference `src/` and `public/` paths**. Both have concrete mitigations below.

No feature work is performed. This is structural only.

---

# 2. REPOSITORY OVERVIEW

| Attribute | Value |
|---|---|
| Project | HYDRA SAMO LABS — portfolio (Video / Motion / Voice) |
| Framework | React 19.0.1 (`react-example` package) |
| Build system | Vite 6.2.3 (`vite build`), Tailwind v4 via `@tailwindcss/vite` |
| Package manager | **npm** (canonical; `bun.lock` gitignored, kept on disk) |
| Node (CI) | 22 (`actions/setup-node@v7`) |
| Language | TypeScript ~5.8.2, `moduleResolution: bundler`, noEmit (lint = `tsc --noEmit`) |
| Deploy | GitHub Pages via `.github/workflows/deploy.yml`, push to `main` + `workflow_dispatch` |
| Live URL | `https://hydra-samo.github.io/HYDRA-SAMO-LABS/` (relative `base: './'`, so URL is unaffected by repo structure) |
| Git | branch `main`, 0 tags, clean tree, 629 tracked files |
| Imports | Relative only (AGENTS.md rule). `@` alias exists in `vite.config.ts`/`tsconfig.json` but is **never used in `src/`** (verified: zero `@/` matches). `metadata.json` is imported relatively: `src/hooks/useOpenGraph.ts` → `../../metadata.json`. |
| Tooling | `.opencode/` (tracked `humanize-ui` skill + untracked skill bundles), `.vscode/` |

**Dependency graph (website, self-contained):** clsx, framer-motion, lenis, lucide-react, react, react-dom, tailwind-merge; dev: tailwindcss, @tailwindcss/vite, vite, typescript, @types/*, @vitejs/plugin-react.

---

# 3. CURRENT WORKSPACE

```
HYDRA SAMO LABS/                      (repo root = current working directory)
├── WEBSITE LAYER (mixed at root)
│   ├── src/                    (29 files — components, hooks, data, i18n, styles)
│   ├── public/                 (8 files — hydra-mark.svg, hydra_logo.jpg, audio/, favicons)
│   ├── index.html              (CSP meta, Google Fonts, %BASE_URL% asset links)
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.ts          (base './', alias '@' → '.', DISABLE_HMR gates)
│   ├── tsconfig.json           (paths '@/*' → './*'; exclude PROJECT_HISTORY)
│   ├── .env.example            (VITE_FORM_ENDPOINT / VITE_FORM_ACCESS_KEY)
│   └── metadata.json           (OG/Twitter metadata; imported by src)
├── BRAND LAYER (mixed at root)
│   ├── ASSETS/                 (292 files — MASTER, DEVELOPMENT, SOURCE, MOTION, WEB, SVG, PNG, …)
│   ├── DOCUMENTATION/          (7 tracked + 2 untracked PDFs)
│   ├── OUTPUT/                 (42 files — brand engineering reports + orchestrators)
│   ├── RELEASE/                (228 files — certified brand v1.0 package + .zip)
│   ├── REVIEWS/                (6 files)
│   ├── PROJECT_HISTORY/        (RELEASE_HISTORY_ASSETS.md; ARCHIVES/ gitignored)
│   ├── DESIGN.md
│   └── AGENTS.md
├── REPO-LEVEL DOCS
│   ├── README.md               (references ./public/hydra-mark.svg, ./RELEASE/…, ./OUTPUT/…)
│   └── CHANGELOG.md            (references RELEASE/, DOCUMENTATION/, OUTPUT/)
├── CONFIG / TOOLING (repo-scoped)
│   ├── .github/workflows/deploy.yml
│   ├── .gitignore              (assets/, PROJECT_HISTORY/ARCHIVES/, dist/, node_modules/, bun.lock, …)
│   ├── .vscode/                (port 3000, css lint)
│   └── .opencode/              (humanize-ui skill + untracked skill bundles)
└── UNTRACKED / IGNORED (left untouched)
    ├── .opencode/skills/{ecc-harness,emilkowalski-skills,ui-ux-pro-max}/
    ├── DOCUMENTATION/3d motion project..pdf, DOCUMENTATION/tuto.pdf
    ├── PROJECT_HISTORY/ARCHIVES/
    ├── dist/, node_modules/, .opencode/node_modules/, bun.lock
```

---

# 4. PROPOSED WORKSPACE (Target)

```
HYDRA SAMO/                        (same repo root, new organization)
├── BRAND/                         ← immutable source of truth (no engineering work after migration)
│   ├── ASSETS/                    (from root ASSETS/)
│   ├── DOCUMENTATION/             (from root DOCUMENTATION/ + 2 untracked PDFs)
│   ├── OUTPUT/                    (from root OUTPUT/ + this report + orchestrator)
│   ├── RELEASE/                   (from root RELEASE/ — certified v1.0 package + zip)
│   ├── REVIEWS/                   (from root REVIEWS/)
│   ├── PROJECT_HISTORY/           (from root PROJECT_HISTORY/)
│   ├── DESIGN.md                  (from root DESIGN.md)
│   ├── AGENTS.md                  (from root AGENTS.md)
│   └── CHANGELOG.md               [DECISION D1]
│
├── WEBSITE_v1.1/                  ← production website (new build/deploy root)
│   ├── src/                       (from root src/)
│   ├── public/                    (from root public/)
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── .env.example
│   ├── metadata.json
│   └── README.md                  (site docs moved from root README; paths updated)
│
├── README.md                      (rewritten as workspace README)
├── CHANGELOG.md                   [D1 — kept at root if D1 = keep]
├── .github/workflows/deploy.yml   (updated working-directory + artifact path)
├── .gitignore                     (updated anchors)
├── .vscode/                       (stays at repo root — workspace-scoped tooling)
└── .opencode/                     (stays at repo root — tooling)
```

---

# 5. MIGRATION TREE

| From (root) | To | Operation | Preserves |
|---|---|---|---|
| `src/` | `WEBSITE_v1.1/src/` | move | relative imports intact |
| `public/` | `WEBSITE_v1.1/public/` | move | `%BASE_URL%` + root-relative asset refs |
| `index.html`, `package.json`, `package-lock.json`, `vite.config.ts`, `tsconfig.json`, `.env.example`, `metadata.json` | `WEBSITE_v1.1/` | move | `../../metadata.json` import, `@` alias (resolves to new dir), npm scripts |
| `ASSETS/`, `DOCUMENTATION/`, `OUTPUT/`, `RELEASE/`, `REVIEWS/`, `PROJECT_HISTORY/` | `BRAND/<same>/` | move | brand history, release archive |
| `DESIGN.md`, `AGENTS.md` | `BRAND/` | move | brand governance |
| `README.md` | rewrite → workspace README; site content → `WEBSITE_v1.1/README.md` | edit/new | docs |
| `CHANGELOG.md` | `BRAND/` **or** stay at root | [D1] | repo history |
| `.github/workflows/deploy.yml` | stays | edit | CI/CD |
| `.gitignore` | stays | edit | ignore rules |
| `.vscode/`, `.opencode/` | stay | none | tooling |
| `dist/`, root `node_modules/`, `bun.lock` | stays (ignored) | cleanup [D4] | — |

---

# 6. MOVE OPERATIONS (summary)

1. **BRAND (Checkpoint 03)** — `git mv` 6 directories (ASSETS 292, DOCUMENTATION 7+2 untracked, OUTPUT 42, RELEASE 228, REVIEWS 6, PROJECT_HISTORY 1) + `git mv` DESIGN.md, AGENTS.md → `BRAND/`.
2. **WEBSITE_v1.1 (Checkpoint 04)** — `git mv` `src/`, `public/`, `index.html`, `package.json`, `package-lock.json`, `vite.config.ts`, `tsconfig.json`, `.env.example`, `metadata.json` → `WEBSITE_v1.1/`.
3. Untracked PDFs in `DOCUMENTATION/` move with their tree (they are not deleted).

**No file/directory renames required** (all names stay identical; only containers change).

---

# 7. DELETE OPERATIONS (Checkpoint 07 — only verified obsolete)

| Item | Status | Action |
|---|---|---|
| Root `dist/` | gitignored, regenerable | delete after WEBSITE_v1.1 build passes [D4] |
| Root `node_modules/` | stale after package.json moves | remove after `npm ci` in WEBSITE_v1.1 [D4] |
| `RELEASE/` duplicate asset sets (APP, MASTER, DEVELOPMENT, SOURCE_CODE…) | **DUPLICATES but certified release archive** | **PRESERVE** — moves to `BRAND/RELEASE/` |
| `OUTPUT/31_REPOSITORY_WORKSPACE_MIGRATION.md` (untracked) | orchestrator | move to `BRAND/OUTPUT/`, becomes tracked |
| tsconfig `exclude: ["PROJECT_HISTORY"]` | stale after move | harmless; optional cleanup |

No tracked file is deleted. Nothing referenced by imports, routing, config, docs, deployment, build, or the Brand Book is removed.

---

# 8. REFERENCE UPDATES (Checkpoint 06 — verified paths only)

## 8.1 Deployment (`deploy.yml`) — REQUIRED, HIGH PRIORITY
- Add `defaults: { run: { working-directory: WEBSITE_v1.1 } }` (applies to `npm ci`, `npm run build`).
- Change `upload-pages-artifact` `path: dist` → `path: WEBSITE_v1.1/dist`.
- `actions/setup-node` cache stays automatic. Live URL unchanged (relative `base`).

## 8.2 `.gitignore` — REQUIRED
- `PROJECT_HISTORY/ARCHIVES/` → `BRAND/PROJECT_HISTORY/ARCHIVES/`.

## 8.3 READMEs — REQUIRED
- Root `README.md` → rewrite as **workspace README** (BRAND / WEBSITE_v1.1 map, live URL, changelog link).
- `WEBSITE_v1.1/README.md` → site docs moved from root README; `./RELEASE/…` → `../BRAND/RELEASE/…`, `./CHANGELOG.md` → `../CHANGELOG.md`.

## 8.4 Brand docs referencing the live site — REQUIRED, HIGH EFFORT (~60 files)
Brand docs (in `BRAND/`) currently reference the site at repo root with bare paths. After the move these become:
- `src/…` → `WEBSITE_v1.1/src/…`
- `public/…` → `WEBSITE_v1.1/public/…`

Affected files (verified via scan) include nearly all of `OUTPUT/`, parts of `ASSETS/`, `DOCUMENTATION/HYDRA_SAMO_Brand_Book_v1.0.md`, `REVIEWS/`, and the release package docs. Applied with word-boundary-anchored, exact-path replacements; re-verified with a post-migration reference scan (the same scan used to generate this list).

## 8.5 Cross-tree brand refs (root-relative) — REQUIRED, MECHANICAL
Bare root-relative references to brand trees appearing in root-level docs (README/CHANGELOG) and in BRAND docs get the `BRAND/` prefix (e.g., `ASSETS/` → `BRAND/ASSETS/`, `OUTPUT/` → `BRAND/OUTPUT/`, `RELEASE/` → `BRAND/RELEASE/`), guarded so already-prefixed paths are not double-prefixed and unrelated prose is untouched.

## 8.6 Website internals — NO CHANGES REQUIRED
- `src/` uses relative imports only (verified). 
- `../../metadata.json` import resolves inside `WEBSITE_v1.1/`. 
- `index.html` `/src/main.tsx` resolves to `WEBSITE_v1.1/src/main.tsx`. 
- `@` alias and `base: './'` move with their config files. 
- `.env.example` moves with the site.

---

# 9. RISK ASSESSMENT

| # | Risk | Severity | Reason | Mitigation |
|---|---|---|---|---|
| R1 | **Deploy breaks** if `deploy.yml` not updated (npm runs at root; artifact path `dist`) | **HIGH** | Build root changes | Update `working-directory` + artifact path in §8.1; simulate workflow steps locally; real validation on next push to `main` |
| R2 | **AGENTS.md move** silently drops the auto-loaded project rules for tooling (opencode/Claude read repo-root `AGENTS.md`) | **HIGH** | Root-level convention | Keep a thin **root `AGENTS.md`** pointing to `BRAND/AGENTS.md` (authority) + `WEBSITE_v1.1/` conventions (workspace pointer, part of §8.3/Checkpoint 08) |
| R3 | **~60 brand docs** reference `src/`/`public/` with stale root-relative paths | **MED-HIGH** | Bare paths break after move | §8.4 mechanical sync + post-migration reference scan gate (zero-broken-refs criterion) |
| R4 | `.gitignore` `assets/` rule vs brand `ASSETS/` tree | **MED** | Unanchored ignore pattern | Anchor to `/assets/` (§8.2) |
| R5 | `metadata.json` path coupling (`../../metadata.json`) | **MED** | If metadata.json forgotten, build breaks | Move metadata.json in same step as `src/`; validate build at Checkpoint 04 |
| R6 | README/changelog path links (`./public/…`, `./RELEASE/…`, `./OUTPUT/…`) | **MED** | 404 links after move | §8.3 rewrite + scan |
| R7 | `RELEASE/` contains full duplicates of `ASSETS/` and an older `SOURCE_CODE/` snapshot | **MED** | Duplication, drift temptation to delete | **Preserve** (certified release archive); moved to `BRAND/`; not deleted (cleanup rule) |
| R8 | `REFERENCES/` strategy (symlink vs copy) | **LOW-MED** | Symlinks break if BRAND renamed; copies drift | Recommend **symlinks** to immutable `BRAND/` (single source of truth, zero drift) [D2]; copies as fallback |
| R9 | Untracked PDFs inside `DOCUMENTATION/` | **LOW** | Unclassified content | Move with tree, keep, do not commit unless requested |
| R10 | Mid-migration failure cascades | **MED** | One broken step → worse state | Checkpoint gates: stop + failure report + preserve state (§11) |
| R11 | Deploy triggers on merge to `main` | **LOW** | CI fire during migration | Work on `chore/workspace-migration` branch; merge to `main` only after all checkpoints pass (deploy then validates R1) |
| R12 | `@` alias / `tsconfig` exclude staleness | **LOW** | Harmless | Optional cleanup at Checkpoint 08 |

---

# 10. DECISION POINTS (for user)

- **D1 — CHANGELOG.md**: keep at repo root (workspace-level) **[recommended]** · move to `BRAND/` as release document.
- **D2 — REFERENCES strategy**: symlinks into `BRAND/` (no drift, immutable) **[recommended]** · copies (portable across OSes).
- **D3 — root AGENTS.md pointer**: create thin workspace pointer so tooling keeps loading rules **[recommended]** · skip (accept that BRAND/AGENTS.md is no longer auto-loaded).
- **D4 — stale root artifacts**: delete root `dist/` + `node_modules/` after Checkpoint 04 build passes **[recommended]** · leave on disk.

---

# 11. VALIDATION PLAN

Per checkpoint (required before advancing):
1. `npm run lint` (tsc --noEmit) + `npm run build` from `WEBSITE_v1.1/` — must pass.
2. `npm run dev` smoke test (port 3000) — dev server boots.
3. Simulate the updated deploy steps locally (`npm ci` + `npm run build` + artifact dir exists at `WEBSITE_v1.1/dist`).
4. Reference scan (re-run the exact scan that produced §8.4) — **zero** broken `src/`/`public/`/`BRAND/` references.
5. Spot-check `git log --follow` on moved files (history preserved).
6. After merge to `main`: GitHub Pages workflow runs against `WEBSITE_v1.1/` and the live site renders (real deploy validation).

---

# 12. ROLLBACK PLAN

- Dedicated branch **`chore/workspace-migration`** (main stays untouched until final merge).
- **Commit after every successful checkpoint** (recoverable point per phase).
- Tag the final migration (`workspace-migration-v1`).
- Rollback = reset/checkout the last green checkpoint commit (or revert the branch merge) — all moves are `git mv` renames, so history and content are fully recoverable. Git is available; no manual backups required.

---

# 13. EXECUTION CHECKPOINTS

| Checkpoint | Phase | Deliverable / Gate |
|---|---|---|
| 01 | Repository analysis | this report ✓ (complete) |
| 02 | Workspace initialization | create `BRAND/`, `WEBSITE_v1.1/` |
| 03 | Brand migration | `git mv` brand trees + DESIGN/AGENTS → `BRAND/`; validate |
| 04 | Website v1.1 migration | move site files; update internal paths; **build + dev + asset check** |
| 05 | (removed) | — |
| 06 | Reference synchronization | deploy.yml, .gitignore, READMEs, brand-doc path sync; scan gate |
| 07 | Cleanup | remove only verified obsolete (root dist/, stale node_modules) |
| 08 | Final optimization | workspace README/AGENTS pointer, tag, final report |

Each checkpoint failure → **stop immediately**, write `BRAND/OUTPUT/31_REPOSITORY_REFACTORING_REPORT.md`, wait for user approval.

---

# 14. ESTIMATED COMPLEXITY

**Medium-High.** The moves are mechanical and low-risk (`git mv`); the effort concentrates in Checkpoint 06 (≈60 doc files, ≈400+ verified path replacements) and the two high-priority config updates (deploy.yml, .gitignore). No import changes inside the website.

# 15. ESTIMATED DURATION

Approximately **1.5–2.5 hours** of agent execution with human gates: ~20–30 min moves + validation (CP 02–05), ~60–90 min reference synchronization (CP 06), ~20 min cleanup + final report (CP 07–08), plus time for deploy validation after the `main` merge.

---

# 16. REPOSITORY HEALTH

- **Clean tree** on `main`; 629 tracked files; lint + build green.
- Single branch, zero tags — safe to branch for migration.
- npm canonical; bun.lock kept on disk but untracked (intended).
- Known good theme-optimization commit `c66d432` on `main`.
- Duplication exists only inside `RELEASE/` (certified archive — intentional).

# 17. PRODUCTION READINESS

**Production-ready.** The site is fully static, deploys via Pages on `main` push, and is self-contained under `WEBSITE_v1.1/` with zero import changes. This migration changes **organization only**; runtime behavior, routing, assets, fonts, SVGs, CSS, and build output are preserved.

---

# 18. APPROVAL GATE

**Dry-run complete. No repository files were moved, renamed, deleted, or rewritten.**

The report (this file) is the only new artifact; it was placed at `BRAND/OUTPUT/` as the orchestrator mandates.

**Stopping for explicit user approval.**
Valid approval examples: `APPROVED` · `Execute Migration` · `Continue` · `Proceed`.

Without explicit approval the system remains in planning mode and no repository modification is permitted.

After approval, execution proceeds on branch `chore/workspace-migration` in Checkpoint order (02 → 08), with a commit and validation gate after every checkpoint, and a final merge to `main` only after all checkpoints pass.
