<p align="center">
  <a href="https://hydra-samo.github.io/HYDRA-SAMO-LABS/">
    <img src="./WEBSITE_v1.1/public/hydra-mark.svg" width="96" alt="Hydra Samo" />
  </a>
</p>

<h1 align="center">HYDRA SAMO LABS</h1>

<p align="center">
  <strong>Video editing · Motion design · Voice-over — one unified head.</strong>
</p>

<p align="center">
  A dark bio-organic editorial portfolio by <strong>Bendali Issam Eddine (Hydra Samo)</strong> —
  the mythical three-headed craft, directed under a single will.
</p>

<p align="center">
  <a href="https://hydra-samo.github.io/HYDRA-SAMO-LABS/"><img src="https://img.shields.io/badge/live-hydra--samo--labs-emerald?style=flat-square&color=%23059669" alt="Live site" /></a>
  <img src="https://img.shields.io/badge/react-19-059669?style=flat-square&color=%2310b981" alt="React 19" />
  <img src="https://img.shields.io/badge/typescript-strict-059669?style=flat-square&color=%2310b981" alt="TypeScript" />
  <img src="https://img.shields.io/badge/vite-6-059669?style=flat-square&color=%2310b981" alt="Vite 6" />
  <a href="./CHANGELOG.md"><img src="https://img.shields.io/badge/changelog-v1.1.0-059669?style=flat-square&color=%2334d399" alt="Changelog" /></a>
  <a href="./BRAND/RELEASE/HYDRA_SAMO_BRAND_v1.0/LICENSE/usage-terms.md"><img src="https://img.shields.io/badge/usage-terms-059669?style=flat-square&color=%2334d399" alt="Usage terms" /></a>
</p>

---

## The Myth

Three heads — the frame, the motion, and the voice — grown from one stem.
Video editing, kinetic motion graphics, and professional voice-over as a single
discipline. Zero hand-offs. No lost narrative intent.

- **Video** — high-end editing and full direction
- **Motion** — kinetic motion graphics and 3D VFX
- **Voice** — professional narration in EN / FR / AR

## Workspace layout

| Area | Location |
| --- | --- |
| **Frozen production website** (v1.1) | `WEBSITE_v1.1/` — Vite 6 + React 19 + TS strict + Tailwind v4 (read-only) |
| **Evolving production website** (v1.2) | `WEBSITE_v1.2/` — clone of v1.1, assets frozen as-is; next iteration happens here |
| **Brand system** (certified v1.0) | `BRAND/RELEASE/HYDRA_SAMO_BRAND_v1.0/` |
| **Brand docs & reviews** | `BRAND/DOCUMENTATION/`, `BRAND/REVIEWS/` |
| **Engineering reports** | `BRAND/OUTPUT/` |
| **Design intent** | `BRAND/DESIGN.md` |

The workspace splits the repo into three concerns:

- **`WEBSITE_v1.1/`** — the shipped, deployable production portfolio. Its `public/`,
  `src/`, `index.html`, `metadata.json`, and `package.json` live inside this folder;
  `deploy.yml` builds and publishes only this tree to GitHub Pages. **Frozen —
  read-only by convention, never edited.**
- **`WEBSITE_v1.2/`** — the evolving production website, cloned verbatim from
  `WEBSITE_v1.1` with every asset preserved as-is. This is where the next iteration
  happens. When it is ready to ship, switch `deploy.yml` to build this tree.
- **`BRAND/`** — the immutable brand authority: master assets, frozen releases,
  governance docs, reviews, and engineering reports. Production code references it
  through canonical paths, never copies.

Full brand engineering lifecycle, governance, and release packaging live in
`BRAND/RELEASE/` — see `BRAND/OUTPUT/26_LIFECYCLE_REPLICATOR.md`.

## Getting started

The evolving production website is self-contained in `WEBSITE_v1.2/`:

```bash
cd WEBSITE_v1.2
npm install
npm run dev        # http://localhost:3000
```

## Build / checks

```bash
cd WEBSITE_v1.2
npm run build      # production build to WEBSITE_v1.2/dist/
npm run lint       # TypeScript typecheck (tsc --noEmit)
```

The GitHub Actions workflow in `.github/workflows/deploy.yml` currently installs,
builds, and deploys `WEBSITE_v1.1/dist` to GitHub Pages on every push to `main`.
It stays pointed at v1.1 until v1.2 is ready to ship, then its
`working-directory`, `cache-dependency-path`, and artifact `path` are switched to
`WEBSITE_v1.2`.

## Live site

- **Deployed:** https://hydra-samo.github.io/HYDRA-SAMO-LABS/
- **Mobile:** slideshow navigation with a glass bottom dock (VE & MD / Work / Voice / Process / Origin), compact hero bar, and a glassmorphic brief screen.

---

<p align="center">
  <sub>Dark bio-organic editorial — Mythic Emerald on Abyssal Slate.</sub>
</p>
