# SYSTEM DESIGN SPECIFICATION — HYDRA'S VAULT

## Design Philosophy: Bio-Organic Dark Editorial
- Aesthetic: Immersive, high-contrast, dark-mode-first editorial showcase.
- Anti-Patterns (BANNED): 
  - No `#00FFCC` cyan or default neon Tailwind colors.
  - No SaaS eyebrow pills (e.g., `// SECTION_TITLE` or pill wrappers).
  - No solid flat bright accent CTAs.
  - No corporate agency comparison matrices.
  - No rigid numbered badges (`01`, `02`).
  - No geo/location badges (e.g., `ALGERIA // GLOBAL`) — removed from the nav; forbidden in every locale.

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

## Typography System

### Font Stacks (canonical tokens in `src/index.css` `@theme`)
- **`--font-sans`** — `Manrope` · EN/FR body (400), UI labels (500), buttons/CTAs (600).
- **`--font-display`** — `Space Grotesk` · Wordmark (700), hero (700), primary section titles (600), secondary headings (500).
- **`--font-arabic`** — `IBM Plex Sans Arabic` · Arabic headings (600, 500 for secondary) and body (400), applied automatically by the `html.lang-ar` overrides.
- **`--font-mono`** — `JetBrains Mono` · Code and technical readouts only (400, 600 for emphasis).

Wired from Google Fonts in `index.html` — weights are deliberately limited for performance:
`Space+Grotesk:wght@500;600;700`, `Manrope:wght@400;500;600`, `IBM+Plex+Sans+Arabic:wght@400;500;600;700`, `JetBrains+Mono:wght@400;600`.

### Type Hierarchy
- **Logo wordmark** — Space Grotesk 700, uppercase. Tracking `-0.02em` in the nav and pre-splash lockups; `-0.03em` on the Plymouth splash title (settles tight after its wide→tight reveal).
- **Hero display** — Space Grotesk 700, `text-4xl sm:text-5xl md:text-6xl lg:text-7xl`, `tracking-tight`, `leading-[1.02]`.
- **Primary section titles (h2)** — Space Grotesk 600, `text-3xl sm:text-4xl md:text-5xl`, uppercase, max 1–2 words in Mythic Emerald.
- **Secondary headings (h3/h4)** — Space Grotesk 500 — card titles, track names, modal titles, narrative column headers.
- **Body (EN/FR)** — Manrope 400, `leading-relaxed` (the default `font-sans`).
- **UI labels & eyebrows** — Manrope 500, `text-xs`/`text-sm`, uppercase, `tracking-widest`. Not mono.
- **Buttons & CTAs** — Manrope 600 (`font-semibold`), uppercase, `tracking-wider`.
- **Arabic** — IBM Plex Sans Arabic: 600 for headings, 400 for body, via the `html.lang-ar` stack overrides.
- **Code / technical meta** — JetBrains Mono: software-stack pills, timestamps/durations, video overlay badges (RAW/GRADE), metric readouts, and literal code refs (`VITE_FORM_ENDPOINT`).

### Mono = Technical Only
JetBrains Mono is reserved for code and data readouts. Every prose eyebrow, form label, and menu label renders in Manrope 500. No `font-mono` eyebrows — the `// SECTION` pattern stays banned.

### Responsive Scale
- Fluid step-up per breakpoint — no single-size headings: hero `text-4xl → lg:text-7xl`, section titles `text-3xl → md:text-5xl`, cards `text-xl sm:text-2xl` (or `text-base`/`text-sm` for dense UI).
- Arabic: `html.lang-ar` scales text steps ~+30% (`.text-xs` → 15px … `.text-7xl` → 88px) and zeroes letter-spacing — Arabic reads smaller and breaks apart under wide tracking.

### Accessibility
- Contrast-driven palette: off-white titles `#f3f4f6`, muted body `#94a3b8`, emerald accents `#10b981` on abyssal `#060c09` — AA-friendly for large/bold type.
- Interactive text is never smaller than `text-xs`/`text-sm` with `min-h-[44px]` touch targets.
- `prefers-reduced-motion` skips the splash letter-spacing reveal.
- Font sizes are px-based Tailwind utilities, so they scale cleanly under browser zoom (200%).

## Architectural Rules
- Use relative imports ONLY (`../components/...`).
- Utility function: Always pass class strings through `cn()` from `src/lib/utils.ts`.

## Device-Tier Performance Budget
- **Source of truth**: `src/hooks/useDeviceTier.ts` detects `low | medium | high` once per session (CPU cores, deviceMemory, effectiveType, saveData, coarse pointer) and mirrors it onto `<html data-quality="low|medium|high">`.
- **Low tier** (weak phones): no Lenis (native scroll — anchor jumps need `[id] { scroll-margin-top: 96px }`), 1 static ambient blob, no aurora/spotlight/drift, no backdrop-blur on glass, no blur entrance animations, every other waveform bar.
- **Medium tier**: Lenis at 0.95s, 2 ambient blobs, reduced `blur(9px)` glass, no spotlight.
- **High tier**: full experience (Lenis 1.2s, 3 blobs + drift + aurora + spotlight, `blur(12px)` glass).
- **Convention**: components gate JS animations with `cheapMotion = isCoarse || tier === 'low'`; CSS gates static compositing cost via `html[data-quality]` selectors in `src/index.css`.
- **CSP**: `index.html` ships a Content-Security-Policy meta tag with NO `unsafe-eval` — required for Electron to clear its "Insecure Content-Security-Policy" warning. `script-src 'unsafe-inline'` is kept for Vite dev; do not add `unsafe-eval` back.

## HYDRA SAMO — Master Logo Design System

### Implementation (`src/components/HydraLogo.tsx`)
- **Geometry**: A single pure vector mark built on an invisible **pointy-top hexagonal grid** (construction hex circumradius 36, center at `50,50`, rendered in a shared optical frame `viewBox="11 2.94 78 78"`). A **pointy-top hexagon core** (circumradius `Rc ≈ 17`, class `hydra-core`) is the hydra's one body — a genuine structural anchor the three necks flow into, not a hub or dot.
- **Construction**: One master serpent-head path (class `hydra-head-0`) replicated in exact **3-fold rotational symmetry** via `rotate(120 50 50)` and `rotate(240 50 50)`, plus a separate hex-core path. Every head shares the same anchor set — minimal anchors, clean cubic Béziers, fully editable in Figma/Illustrator/Inkscape. No path merging.
- **Hidden Hydra**: At a glance the mark reads as a clean, engineered tri-sym emblem. On closer inspection each of the three forms is a serpent head in profile — pointed snout, **bold crown/hood**, and a **deep concave throat notch carved entirely through negative space** — representing **Video Editing (up), Motion Design (down-left), Voice Over (down-right)**. Each head overhangs a distinct **neck waist** that flares back out into the solid hexagon core: **one body, three heads**.
- **Weight redistribution**: Mass redistributed from the arm stems into the center (~+20% optical weight, center-dominated). Heads are bolder (~13–14 units) with a clear neck constriction (~8 units); the solid core anchors the mark — killing the rotor / spinner read while preserving the outer silhouette (≥80% overlap with V1; snout radius and flank extent unchanged).
- **Color**: Pure `currentColor` fills/strokes — recolorable to Neon Green `#39FF14`, Electric Cyan `#00E5FF`, White, or Black with no geometry changes. Site default is Mythic Emerald (`#10b981`) via `text-accent`. Monochrome-true: reads as a compact triangular-hex emblem even at 16px (internal throat-notch detail naturally dissolves).
- **No decoration**: no gradients, glow, shadows, or reflections inside the SVG. All lighting lives externally in the CSS layer (`.hydra-mark-glow`, `.hydra-mark-pulse`). Continuous rotation is retired — the 3-fold mark is rotationally self-similar and spinning reads as a generic fan.
- **Motion-ready**: stable classes (`hydra-head`, `hydra-head-0/1/2`, `hydra-core`) + `pathLength={1}` per path enable CSS/Framer Motion stroke drawing, outline tracing, glow, pulse, and hover effects without losing identity. No path merging — the three heads stay separate from the hex core.
- **Surfaces**: Navbar lockup, Hero header, Pre-splash selector, Plymouth splash (loading state), and favicon (`/public/hydra-mark.svg`).

### Master Logo Design Brief (Full Untouched Specification)

HYDRA SAMO — Master Logo Design Brief

Design a single iconic SVG brand mark for HYDRA SAMO.

This logo is created specifically for a premium portfolio and creative studio specializing in Video Editing, Motion Design, and Voice Over.

The logo must consist of only one icon.

No text.

No initials.

No typography.

No slogan.

No border.

No background.

No decorative elements.

---

Design Philosophy

The logo should feel like it belongs beside brands such as:

- Apple

- Nike

- Vercel

- Linear

- Framer

- Mercedes-Benz

- Nothing

- OpenAI

It should look timeless, premium, confident, and instantly recognizable.

Not trendy.

Not flashy.

Not illustrative.

Not generic AI art.

The logo should still feel modern 20 years from now.

---

Hidden Hydra Principle

The logo must not immediately appear to be a hydra.

At first glance, viewers should see a clean, futuristic geometric emblem.

Only after a closer look should they realize the symbol subtly forms a three-headed hydra.

The discovery should feel intentional and satisfying.

The icon should reward attention without relying on obvious creature details.

---

Invisible Construction Grid

Build the logo using an invisible hexagonal construction grid.

Every angle, intersection, and curve should appear mathematically intentional.

The geometry should communicate precision and balance.

The logo should feel engineered rather than illustrated.

Use:

- Hexagonal proportions

- Geometric alignment

- Symmetry

- Consistent spacing

- Balanced visual weight

- Controlled negative space

Nothing should feel random.

---

Symbolism

The three hidden heads represent:

• Video Editing

• Motion Design

• Voice Over

The three forms should merge into one continuous unified structure.

The logo should communicate:

Precision

Movement

Creativity

Innovation

Craftsmanship

Intelligence

Trust

Premium quality

---

Website Integration

This logo is designed specifically for a futuristic website.

The website already uses:

- Dark interface

- Black backgrounds

- Neon green accents

- Cyan highlights

- Glassmorphism

- Thin glowing lines

- Soft ambient lighting

- Modern motion

- Premium UI

The logo must feel like it was designed as part of this interface from the beginning.

It should blend seamlessly with the overall visual language.

---

Visual Characteristics

The logo should feel:

Minimal

Architectural

Luxurious

Technical

Geometric

Elegant

Confident

Modern

Memorable

Scalable

Every line should have a purpose.

Every shape should contribute to the overall balance.

---

Color Philosophy

Design the logo in solid black first.

The design must be perfect without color.

Afterward it should work flawlessly when recolored to:

- Neon Green (#39FF14)

- Electric Cyan (#00E5FF)

- White

- Black

Do not include gradients.

Do not include glow.

Do not include shadows.

Do not include reflections.

The website will create all lighting and glow effects using CSS.

---

Motion Ready

The icon should be designed with animation in mind.

It should allow elegant SVG or CSS animations such as:

- Stroke drawing

- Outline tracing

- Soft neon glow

- Slow rotation

- Morphing paths

- Pulse

- Hover effects

Without losing its identity.

---

Technical Requirements

- True SVG

- Transparent background

- Pixel-perfect geometry

- Crisp at 16×16 pixels

- Works as favicon

- Works as app icon

- Works as loading animation

- Works as watermark

- Works as social avatar

- Minimal anchor points

- Clean Bézier curves

- Fully editable in Figma, Illustrator, and Inkscape

---

Negative Prompt

Avoid:

Fantasy hydras

Realistic snakes

Dragons

Esports logos

Gaming logos

Mascots

Clipart

NFT style

Crypto branding

Shields

Crests

Crowns

Wings

Eyes

Teeth

Tongues

Scales

Tribal patterns

Medieval styling

Overly complex illustrations

Excessive detail

Lettermarks

Monograms

Typography

Text

Stock-logo aesthetics

Anything that feels aggressive, generic, or obviously AI-generated.

---

Final Goal

Create a logo that feels like a hidden symbol discovered inside a futuristic interface—an abstract geometric emblem that quietly reveals a three-headed hydra upon closer inspection. It should be simple enough to be recognized instantly, distinctive enough to stand on its own without text, and refined enough to become the lasting visual identity of HYDRA SAMO.
