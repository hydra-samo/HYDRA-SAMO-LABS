# HYDRA SAMO LABS — Workspace

Workspace root pointer. The authoritative project & design guidelines live in:

- **`BRAND/AGENTS.md`** — master project & design guidelines (brand governance,
  toolchain quirks, architecture constraints, logo rules). This is the file tooling
  should load for full rules.
- **`BRAND/DESIGN.md`** — design intent and design system reference.
- **`BRAND/OUTPUT/16_BRAND_GOVERNANCE.md`** — brand governance rulebook.

## Layout

- `BRAND/` — immutable brand authority (assets, releases, docs, reports).
- `WEBSITE_v1.1/` — production website (Vite 6 + React 19 + TS strict + Tailwind v4).
  Run all site commands from this directory (`npm install`, `npm run dev`, `npm run lint`, `npm run build`).
- `iteration workspace/` — next-gen website workspace; `REFERENCES/` mirrors `BRAND/` read-only.

## Quick rules for this workspace

- Use **relative imports only** in `WEBSITE_v1.1/src` (the `@` alias does NOT point there).
- Brand mark governance is frozen — see `BRAND/AGENTS.md` before touching any logo or palette code.
- Deploy is handled by `.github/workflows/deploy.yml`, which builds `WEBSITE_v1.1` only.
