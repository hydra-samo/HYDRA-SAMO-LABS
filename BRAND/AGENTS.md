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
- **Strictly Forbidden Tropes**: Neon Cyan (`#00FFCC`, `#00F0FF`), bright blue gradients, SaaS section eyebrow pills (`// SELECTED WORKS`), rigid corporate comparison tables, numbered SaaS badges (`01`, `02`), and geo/location badges (e.g. `ALGERIA // GLOBAL`, "Based in …", country pins). Location badges were removed from `Navigation.tsx` and their translation keys deleted — do not reintroduce them in any language.
- **Layout & Micro-Interactions**:
  - Convert "Agency vs Hydra" table into a clean, humanized 2-column narrative ("Many Heads, One Unified Vision").
  - Maintain Lenis smooth scroll (`lenis`), SVG film-grain noise overlay, `AmbientBackground` green light blurs, `TiltCard` physics, and `MagneticButton` interactions.

## Logo & Brand Mark Governance
- **Icon only**: The Hydra brand mark (`src/components/HydraLogo.tsx`) must never contain text, initials, typography, slogans, or borders. Prohibit adding any of these in future refactors — the mark is a single, standalone icon.
- **Single SVG, pure geometry**: All UI components must use the single `HydraLogo` SVG icon with its pure path geometry (`currentColor` fills/strokes, `hydra-head-0/1/2`, `hydra-core` classes). Do not introduce raster logo variants, re-trace paths, or add decorative vector elements.
- **External lighting**: All lighting, glow, and reflections must remain external in the CSS layer utilities (`.hydra-mark-glow`, `.hydra-mark-pulse` in `src/index.css`). Never bake gradients, glow, shadows, or reflections into the SVG itself — keep the raw vector clarity intact. Continuous rotation (`.hydra-mark-spin`) is retired: the 3-fold mark is rotationally self-similar, so spinning reads as a generic fan and is forbidden.
- **Iconography**: UI glyphs come from `lucide-react` (restored dependency) — use the stock components directly (e.g. `Play`, `Pause`, `Volume2`, `VolumeX`, `Mic`, `MicOff`, `FileText`, `Film`, `Layers`, `X`, `Check`, `CheckCircle2`, `ArrowRight`). Do NOT hand-roll replacement SVG glyph sets. No emoji in any UI copy or locale.
- **Nav lockup**: The brand lockup in `Navigation.tsx` is the single place the Hydra mark pairs with the "HYDRA SAMO" wordmark — mark beside wordmark on desktop, stacked on mobile. The mark is **always the full frozen V4 mark** — `HydraLogo.tsx` renders the shared optical frame `viewBox="11 2.94 78 78"` exactly; never crop the frame, never pass a viewBox override, and never scale the full mark to shoehorn it into small lockups. The nav lockup is the only surface allowed to pair the mark with the wordmark — never duplicate the mark elsewhere as a filler icon (`WorkGallery`, `ProcessSection`, etc. use lucide glyphs like `Film`/`Layers`). Logo geometry is FROZEN per `RELEASE/HYDRA_SAMO_BRAND_v1.0/DOCUMENTATION/09_BRAND_FREEZE.md` — no geometry/frame changes unless an approved rebrand.
