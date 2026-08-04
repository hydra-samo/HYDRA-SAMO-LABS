# HYDRA SAMO — Portfolio

Official editorial dark-mode portfolio for **Bendali Issam Eddine (Hydra Samo)** —
video editing, motion graphics, and voice-over artistry.

## Stack

- React 19 + TypeScript
- Vite 6
- Tailwind CSS v4
- Framer Motion

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
  (see the guidance comment in that file; the gallery shows an empty state until
  projects exist).
- **Voice tracks** — set `audioUrl` on a `VOICE_TRACKS` entry (drop the file in
  `/public/audio/`) to enable playback; tracks without audio show a "coming soon" state.
- **Images** — portraits/avatars live in `src/assets/images/` (WebP, imported via
  Vite). Site-wide share images live in `/public`.
- **Metadata** — `metadata.json` feeds the Open Graph / Twitter tags injected by
  `src/hooks/useOpenGraph.ts`; `og:url` auto-detects the deployed origin.
