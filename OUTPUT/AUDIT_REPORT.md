# Hydra Samo Labs — Codebase Audit & Motion Restoration Report

**Project:** Hydra Samo Labs Portfolio  
**Stack:** React 19, Vite 6, Tailwind CSS v4, Framer Motion, Lenis  
**Report Status:** Updated — Restoration Complete

---

## 1. Executive Summary & Root Cause Analysis

During recent refactoring to standardize button tokens and eliminate duplicate headings, several dynamic UI effects—including background motion canvas, gradient blobs, card tilt effects, and emerald hover glows—became flat or non-responsive.

### Primary Cause
Replacing hardcoded glassmorphism classes (`bg-slate-900/60`, `backdrop-blur-md`, `border-white/10`) with solid theme tokens stripped out backdrop filters and transition properties. Additionally, solid opaque section backgrounds masked the ambient mesh and canvas layers rendering underneath.

### Secondary Cause (Discovered During Audit)
`AmbientBackground.tsx` still referenced `.ambient-blob`, `.cursor-spotlight`, and the `--blob-moss` / `--blob-jade` / `--blob-lichen` / `--spot-glow` variables, but **all of these were deleted from `src/index.css`** during the token-standardization pass. The blobs therefore rendered transparent and inert, which is why the background motion appeared completely flat.

---

## 2. Component Modification Audit

| File / Component | Previous State | Recent Modification | Visual Impact |
| :--- | :--- | :--- | :--- |
| `useLenis.ts` / `App.tsx` | Continuous inertia scrolling | Added modal check (`lenis.stop()`) | **Fixed** (Scroll locks correctly) |
| `AboutSection.tsx` | "MANY HEADS. ONE UNIFIED VISION." | Updated to "MANY HEADS. ONE ORIGIN." | **Fixed** (Heading collision resolved) |
| `src/index.css` | Glass & glow classes removed | Restored `.ambient-blob` keyframes, `.cursor-spotlight`, blob palette vars, `.glass-card`, `.glass-hover` | **Restored** (Blur, glow & ambient motion back) |
| Ambient Canvas / Hero | Blobs rendered invisible (CSS stripped) | Re-added drift animations + `--blob-*` / `--spot-glow` vars | **Restored** (Organic motion visible) |
| Section Wrappers | No layer between content & blobs | Added `bg-[var(--bg-canvas)]/80 backdrop-blur-sm` | **Restored** (Motion reads behind glass) |
| Cards & Interactive Elements | Inline transitions & hover glow stripped | Re-applied glass surfaces + emerald hover glow | **Restored** (Lift, blur & glow active) |
| Primary CTAs | Framer hover/tap props stripped | Re-added `whileHover` / `whileTap` | **Restored** (Tactile feedback) |

---

## 3. Restoration Strategy (Executed)

1. **Background Layering:** Enforce `inset-0 -z-10 pointer-events-none` on background canvas/blobs (already correct in `AmbientBackground.tsx`) and set section wrappers to semi-transparent `bg-[var(--bg-canvas)]/80 backdrop-blur-sm`.
2. **Glassmorphism & Depth:** Re-apply backdrop blurs (`backdrop-blur-md`), subtle borders (`border-white/10`), and desaturated emerald glows (`hover:shadow-[0_0_25px_rgba(16,185,129,0.2)]`) via restored `.glass-card` / `.glass-hover` utilities.
3. **Framer Motion Hooks:** Re-enable `whileHover={{ scale: 1.02, y: -2 }}` and `whileTap={{ scale: 0.98 }}` across action buttons and portfolio items.

---

## 4. Changes Executed

### 4.1 `src/index.css` (Restored Layer)
- Added `.ambient-blob` drift animation (`@keyframes ambient-drift`, 20s alternating) with per-blob durations for `--a` / `--b` / `--c`.
- Added `.cursor-spotlight` blur + `pointer-events: none`.
- Re-introduced ambient palette vars `--blob-moss`, `--blob-jade`, `--blob-lichen`, `--spot-glow` for light and dark modes.
- Added `.glass-card` — obsidian glass surface (`backdrop-filter: blur(16px)`, hairline `border-white/10`, soft emerald elevation shadow).
- Added `.glass-hover` — `hover` emerald border (`rgba(16, 185, 129, 0.5)`) + glow bloom `0 0 25px rgba(16, 185, 129, 0.2)`.

### 4.2 Semi-Transparent Section Backgrounds
Applied `bg-[var(--bg-canvas)]/80 backdrop-blur-sm` to all six section wrappers so the ambient mesh stays visible behind a soft canvas tint:

| Section | File |
| :--- | :--- |
| Hero | `Hero.tsx` |
| Selected Works | `WorkGallery.tsx` |
| Voice-Over | `VoiceOverSection.tsx` |
| Workflow & Comparison | `ProcessSection.tsx` |
| About & Origin | `AboutSection.tsx` |
| Contact & Brief | `ContactSection.tsx` |

### 4.3 Glassmorphism & Glow Re-Applied
- `Hero.tsx` — portrait glass frame + craft-label chips upgraded to `.glass-card`; watch-reel pill retains `backdrop-blur-md` + emerald hover glow.
- `WorkGallery.tsx` — project cards, category filter pill, empty-state card and master-reel banner upgraded to `.glass-card`.
- `ProcessSection.tsx` — 5-step workflow cards, fragmented column and unified-vision column upgraded to `.glass-card` (+ `.glass-hover` on step cards).
- `VoiceOverSection.tsx` — studio console, active-track panel and action row upgraded to `.glass-card`; track cards gain `backdrop-blur-md` + emerald hover glow.
- `AboutSection.tsx` — portrait frame upgraded to `.glass-card` with accent border retained.
- `ContactSection.tsx` — success card upgraded; all inputs/selects/textarea gain `backdrop-blur-md`.

### 4.4 Framer Motion Hooks Re-Enabled
| Target | File : Line |
| :--- | :--- |
| Portfolio cards | `WorkGallery.tsx:68` |
| Hero primary CTA (Start Project) | `Hero.tsx:70` |
| Voice track cards | `VoiceOverSection.tsx:272` |
| Brief submit CTA | `ContactSection.tsx:269` |

All use `whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}`.

---

## 5. Verification

- `npm run build` — **Passed** (Vite production build, zero errors).
- `npm run lint` — **Passed** (`tsc --noEmit`, zero TypeScript errors).
- Ambient layer confirmed at `fixed inset-0 -z-10 pointer-events-none` (`AmbientBackground.tsx:26`).
- No solid opaque section backgrounds remain (`rg bg-slate-950` search clean).
