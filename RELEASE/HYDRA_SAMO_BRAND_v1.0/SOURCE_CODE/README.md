# SOURCE CODE — HYDRA SAMO Website (React + Vite + Tailwind v4)

Complete source for the HYDRA SAMO portfolio site as shipped in release v1.0.
Includes `src/`, `public/`, and every build/config file needed to run the site
from scratch.

## Quick Start

```bash
npm ci          # deterministic install from package-lock.json
npm run dev     # dev server on port 3000 (host 0.0.0.0)
npm run build   # production build → dist/
npm run preview # serve the production build
npm run lint    # tsc --noEmit (must stay clean)
```

## Environment Variables (`.env.example`)

| Variable | Purpose |
| --- | --- |
| `VITE_FORM_ENDPOINT` | Form backend URL (Formspree / Web3Forms). When unset the contact form shows the built-in unconfigured warning. |
| `VITE_FORM_ACCESS_KEY` | Access key required by Web3Forms (optional for Formspree). |

## Architecture

- **Stack**: React 19, TypeScript, Vite 6, Tailwind v4 (CSS-first config in
  `src/index.css`), Framer Motion, Lenis smooth scroll, lucide-react icons.
- **Data source**: all content lives in `src/data/portfolioData.ts`.
  `PROJECTS` is deliberately empty — `WorkGallery` must keep its empty-state.
  `VOICE_TRACKS` playback relies on `audioUrl` in `/public/audio/`.
- **Theme**: class-based dark mode on `<html>` (`html.dark`), driven by
  `App.tsx` + `localStorage['hydra-theme']`. Theme switches animate via the
  `.theme-transition` sentinel in `src/index.css` (350 ms paint-only crossfade;
  160 ms on low-tier devices; instant under `prefers-reduced-motion`).
- **i18n**: `src/i18n/` — EN/FR/AR, RTL handled on `<html>`.
- **Metadata**: client-side Open Graph via `src/hooks/useOpenGraph.ts`
  (`/hydra_logo.jpg`).

## Conventions (hard rules)

- **Relative imports only** — the `@` alias points to repo root, not `src/`.
  NEVER `@/components/`.
- Use `cn()` from `src/lib/utils.ts` for conditional classes.
- Logo geometry is FROZEN — `src/components/HydraLogo.tsx` renders the shared
  optical frame `viewBox="11 2.94 78 78"`; never crop, re-trace, or bake glow
  into the SVG (glow lives in `.hydra-mark-glow` / `.hydra-mark-pulse`).
- The mark is the only surface allowed beside the "HYDRA SAMO" wordmark in
  `Navigation.tsx`; never duplicate the mark as a filler icon.
- No neon cyan, no bright blue gradients, no SaaS eyebrow pills, no numbered
  badges, no location badges.
- Do NOT modify the `server` block or `DISABLE_HMR` logic in `vite.config.ts`.
- Adaptive performance: `useDeviceTier` mirrors `html[data-quality]`; keep the
  CSS gates in `src/index.css` intact.

## Verification

Before shipping, both must pass:

```bash
npm run lint && npm run build
```
