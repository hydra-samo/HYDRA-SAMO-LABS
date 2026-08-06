<p align="center">
  <a href="https://hydra-samo.github.io/HYDRA-SAMO-LABS/">
    <img src="./public/hydra-mark.svg" width="96" alt="Hydra Samo" />
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
  <a href="./RELEASE/HYDRA_SAMO_BRAND_v1.0/LICENSE/usage-terms.md"><img src="https://img.shields.io/badge/usage-terms-059669?style=flat-square&color=%2334d399" alt="Usage terms" /></a>
</p>

---

## The Myth

Three heads — the frame, the motion, and the voice — grown from one stem.
Video editing, kinetic motion graphics, and professional voice-over as a single
discipline. Zero hand-offs. No lost narrative intent.

- **Video** — high-end editing and full direction
- **Motion** — kinetic motion graphics and 3D VFX
- **Voice** — professional narration in EN / FR / AR

## Live site

- **Deployed:** https://hydra-samo.github.io/HYDRA-SAMO-LABS/
- **Mobile:** slideshow navigation with a glass bottom dock (VE & MD / Work / Voice / Process / Origin), compact hero bar, and a glassmorphic brief screen.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

## Build / checks

```bash
npm run build      # production build to dist/
npm run lint       # TypeScript typecheck (tsc --noEmit)
```

## Configuration

The site is fully static. The only optional config is the contact form
submission service. Copy `.env.example` to `.env` and set:

- `VITE_FORM_ENDPOINT` — Formspree (`https://formspree.io/f/…`) or Web3Forms
  (`https://api.web3forms.com/submit`)
- `VITE_FORM_ACCESS_KEY` — required for Web3Forms only

Until an endpoint is configured the contact form shows a "not configured"
notice and will not send briefs.

## Content

- **Projects** — add real case studies to `PROJECTS` in `src/data/portfolioData.ts`
  (the gallery shows a deliberate empty state until projects exist).
- **Voice tracks** — set `audioUrl` on a `VOICE_TRACKS` entry (drop the file in
  `/public/audio/`) to enable playback.
- **Images** — portraits live in `src/assets/images/` (WebP, imported via Vite);
  shared site assets live in `/public`.
- **Metadata** — `metadata.json` feeds the Open Graph / Twitter tags injected by
  `src/hooks/useOpenGraph.ts`; `og:url` auto-detects the deployed origin.

## Repository

| Area | Location |
| --- | --- |
| Source code | `src/` |
| Brand system (certified v1.0) | `RELEASE/HYDRA_SAMO_BRAND_v1.0/` |
| Brand docs & reviews | `DOCUMENTATION/`, `REVIEWS/` |
| Engineering reports | `OUTPUT/` |
| Design intent | `DESIGN.md` |

Full brand engineering lifecycle, governance, and release packaging live in
the `RELEASE/` archive — see `OUTPUT/26_LIFECYCLE_REPLICATOR.md`.

---

<p align="center">
  <sub>Dark bio-organic editorial — Mythic Emerald on Abyssal Slate.</sub>
</p>
