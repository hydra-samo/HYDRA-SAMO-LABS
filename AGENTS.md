# HYDRA SAMO LABS — Workspace

Workspace root pointer. The authoritative project & design guidelines live in:

- **`BRAND/AGENTS.md`** — master project & design guidelines (brand governance,
  toolchain quirks, architecture constraints, logo rules). This is the file tooling
  should load for full rules.
- **`BRAND/DESIGN.md`** — design intent and design system reference.
- **`BRAND/OUTPUT/16_BRAND_GOVERNANCE.md`** — brand governance rulebook.

## Layout

- `BRAND/` — immutable brand authority (assets, releases, docs, reports). **Frozen — read-only by convention, never edit.**
- `WEBSITE_v1.1/` — frozen production website snapshot (Vite 6 + React 19 + TS strict + Tailwind v4). **Read-only by convention — never edit; kept intact as the shipped reference.**
- `WEBSITE_v1.2/` — evolving production website, cloned verbatim from `WEBSITE_v1.1` with every asset preserved as-is. This is where the next iteration happens. Run all site commands from this directory (`npm install`, `npm run dev`, `npm run lint`, `npm run build`).

## Quick rules for this workspace

- Use **relative imports only** in `WEBSITE_v1.2/src` (the `@` alias does NOT point there).
- **No fake content.** Never ship sample placeholders, fictional case studies or
  voice demos, or a fake "master showreel" (e.g. `TearsOfSteel.mp4`). `PROJECTS`
  and `VOICE_TRACKS` stay empty until real, released work exists.
- Brand mark governance is frozen — see `BRAND/AGENTS.md` before touching any logo or palette code.
- Deploy is handled by `.github/workflows/deploy.yml`, which builds `WEBSITE_v1.1` only — until v1.2 is ready to ship, then switch the workflow's `working-directory`, `cache-dependency-path`, and artifact `path` to `WEBSITE_v1.2`.
