# Developer README — Hydra Samo Brand Mark V4

## Import rules

- **Relative imports only**; the `@` alias points to root, not `src/` (NEVER `@/components/`).
- Consume the mark exclusively via `src/components/HydraLogo.tsx` — never inline raw path `d` strings elsewhere.

## Usage

```tsx
import { HydraLogo } from '../components/HydraLogo';

<HydraLogo className="h-8 w-8 text-emerald-500" />
<HydraLogo variant="outline" className="h-12 w-12 text-accent-soft" />
<HydraLogo className="hydra-mark-glow h-16 w-16 text-emerald-500" />
<HydraLogo className="hydra-mark-pulse h-10 w-10 text-emerald-500" />
```

See `usage-examples.tsx`.

## Component contract

- Props: `className`, `variant: 'fill' | 'outline'`.
- `viewBox="11 2.94 78 78"`, 4 paths with `pathLength={1}`, `data-hydra-mark`, `aria-hidden`, `focusable=false`.
- `.hydra-heads` group carries fill/stroke; classes `hydra-head-0/1/2` + `hydra-core`.

## Token contract

- Colors: `accent #10b981`, `accent-soft #34d399`, `accent-dark #059669`; canvas dark `#060c09`; text `#f3f4f6`; muted `#94a3b8`.
- Dark mode is class-based (`html.dark`); never hardcode a theme value.
- Use `cn()` from `src/lib/utils.ts` for conditional classes.

## Hard rules

1. Icon only — no text, initials, borders, or slogans inside the mark.
2. Glow/reflections live in CSS (`.hydra-mark-glow`), never baked into the SVG.
3. No rotation — `.hydra-mark-spin` is retired.
4. No neon cyan, no bright blue gradients, no SaaS badge tropes.
5. `WorkGallery` empty-state must remain (PROJECTS is deliberately empty).

## Verification

- `npm run lint` (tsc --noEmit) and `npm run build` must stay clean.
- Dev server runs on port 3000 (`host 0.0.0.0`).
