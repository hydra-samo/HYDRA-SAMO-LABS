# SYSTEM DESIGN SPECIFICATION — HYDRA'S VAULT

## Design Philosophy: Bio-Organic Dark Editorial
- Aesthetic: Immersive, high-contrast, dark-mode-first editorial showcase.
- Anti-Patterns (BANNED): 
  - No `#00FFCC` cyan or default neon Tailwind colors.
  - No SaaS eyebrow pills (e.g., `// SECTION_TITLE` or pill wrappers).
  - No solid flat bright accent CTAs.
  - No corporate agency comparison matrices.
  - No rigid numbered badges (`01`, `02`).

## Color System Tokens
- Canvas Base: `#060c09` (Abyssal Dark Slate)
- Glass Layer: `rgba(255, 255, 255, 0.04)` with `backdrop-blur-md`
- Primary Brand Accent: `#10b981` (Mythic Emerald)
- Secondary Accent: `#059669` (Deep Jade)
- Ambient Glow: `#34d399` (Soft Mint Glow)
- Typography Primary: `#f3f4f6` (Crisp Off-White)
- Typography Muted: `#94a3b8` (Slate Muted)

## Component Rules & Micro-Interactions
1. Buttons:
   - Base: Glassmorphic dark obsidian (`bg-white/[0.04]` or `bg-emerald-950/30`) with a subtle border (`border border-emerald-500/30`).
   - Hover: Emerald glow (`shadow-[0_0_20px_rgba(16,185,129,0.2)]`), elevated border (`border-emerald-500/50`).
2. Cards & Containers:
   - Must use `TiltCard` or dark glass paneling with subtle noise overlays (`AmbientBackground`).
3. Typography Spacing:
   - Uncluttered headings with high contrast. Accentuate max 1-2 words per heading using `#10b981`.

## Architectural Rules
- Use relative imports ONLY (`../components/...`).
- Utility function: Always pass class strings through `cn()` from `src/lib/utils.ts`.
