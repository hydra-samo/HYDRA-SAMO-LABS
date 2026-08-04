# HYDRA SAMO — Master Project & Design Guidelines

## 1. Toolchain & Environment Quirks
- **Commands**:
  - `npm run dev` — Dev server runs on **port 3000** (`host 0.0.0.0`), NOT Vite's default 5173.
  - `npm run lint` — Runs `tsc --noEmit`. Verify clean output with `npm run lint` and `npm run build`.
  - `npm run clean` — Removes `dist/`.
- **Imports**: Use **RELATIVE IMPORTS ONLY** (e.g. `../components/...`). The `@` alias points to root, not `src/`. NEVER use `@/components/`.
- **Styling**: Tailwind v4 CSS-first config in `src/index.css` (`@import "tailwindcss"`). Dark mode is class-based (`html.dark`), controlled by `App.tsx` and `localStorage['hydra-theme']`. Always use `cn()` from `src/lib/utils.ts` for conditional class logic.
- **Config Locks**: DO NOT modify or toggle the `server` block or `DISABLE_HMR` logic in `vite.config.ts`. Package name is `react-example`.

## 2. Architecture & Content Constraints
- **Data Source**: All content comes from `src/data/portfolioData.ts`.
  - `PROJECTS` is **deliberately empty** — `WorkGallery` MUST retain its empty-state handler. Do NOT restore placeholder projects.
  - `VOICE_TRACKS` audio playback relies on `audioUrl` in `/public/audio/`.
  - `DISCIPLINES` IDs are strictly `'video' | 'motion' | 'voice'`.
- **Metadata**: Handled client-side via `src/hooks/useOpenGraph.ts` pointing to `/hydra_logo.jpg`.
- **Contact Form**: Uses `VITE_FORM_ENDPOINT` / `VITE_FORM_ACCESS_KEY`. Keep the unconfigured warning state intact if env variables are missing.
- **Images**: Local portraits live in `src/assets/images/` (e.g. `hydra_samo.webp`). Shared site assets live in `/public/`.

## 3. Brand Visual Identity & Humanization (De-Slop)
- **Concept**: Mythical Hydra / Dark Bio-Organic Editorial.
- **Color Palette**: 
  - Accent: Mythic Emerald / Toxic Jade (`#10b981`, `#059669`, with soft `#34d399` highlights).
  - Canvas: Deep Abyssal Dark Slate (`#060c09` or `#0b1410`).
  - Text: Off-white (`#f3f4f6`) titles and muted slate (`#94a3b8`) body text.
- **Strictly Forbidden Tropes**: Neon Cyan (`#00FFCC`, `#00F0FF`), bright blue gradients, SaaS section eyebrow pills (`// SELECTED WORKS`), rigid corporate comparison tables, numbered SaaS badges (`01`, `02`).
- **Layout & Micro-Interactions**:
  - Convert "Agency vs Hydra" table into a clean, humanized 2-column narrative ("Many Heads, One Unified Vision").
  - Maintain Lenis smooth scroll (`lenis`), SVG film-grain noise overlay, `AmbientBackground` green light blurs, `TiltCard` physics, and `MagneticButton` interactions.
