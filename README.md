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
| **Production website** (v1.1) | `WEBSITE_v1.1/` — Vite 6 + React 19 + TS strict + Tailwind v4 |
| **Brand system** (certified v1.0) | `BRAND/RELEASE/HYDRA_SAMO_BRAND_v1.0/` |
| **Brand docs & reviews** | `BRAND/DOCUMENTATION/`, `BRAND/REVIEWS/` |
| **Engineering reports** | `BRAND/OUTPUT/` |
| **Design intent** | `BRAND/DESIGN.md` |
| **Next-gen website** (, engineering workspace) | `iteration workspace/` — `REFERENCES/` symlinks into `BRAND/` |

The workspace splits the repo into two concerns:

- **`WEBSITE_v1.1/`** — the shipped, deployable production portfolio. Its `public/`,
  `src/`, `index.html`, `metadata.json`, and `package.json` live inside this folder;
  `deploy.yml` builds and publishes only this tree to GitHub Pages.
- **`BRAND/`** — the immutable brand authority: master assets, frozen releases,
  governance docs, reviews, and engineering reports. Production code references it
  through canonical paths, never copies.
- **`iteration workspace/`** — the future site, still empty by design. Its `REFERENCES/`
  tree is a read-only symlink mirror of `BRAND/`, so  engineering can never drift
  from the certified brand.

Full brand engineering lifecycle, governance, and release packaging live in
`BRAND/RELEASE/` — see `BRAND/OUTPUT/26_LIFECYCLE_REPLICATOR.md`.

## Getting started

The production website is self-contained in `WEBSITE_v1.1/`:

```bash
cd WEBSITE_v1.1
npm install
npm run dev        # http://localhost:3000
```

## Build / checks

```bash
cd WEBSITE_v1.1
npm run build      # production build to WEBSITE_v1.1/dist/
npm run lint       # TypeScript typecheck (tsc --noEmit)
```

The GitHub Actions workflow in `.github/workflows/deploy.yml` installs, builds, and
deploys `WEBSITE_v1.1/dist` to GitHub Pages on every push to `main`.

## Live site

- **Deployed:** https://hydra-samo.github.io/HYDRA-SAMO-LABS/
- **Mobile:** slideshow navigation with a glass bottom dock (VE & MD / Work / Voice / Process / Origin), compact hero bar, and a glassmorphic brief screen.

---

<p align="center">
  <sub>Dark bio-organic editorial — Mythic Emerald on Abyssal Slate.</sub>
</p>
