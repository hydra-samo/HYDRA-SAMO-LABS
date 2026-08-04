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

## HYDRA SAMO — Master Logo Design System

### Implementation (`src/components/HydraLogo.tsx`)
- **Geometry**: A single pure vector mark built on an invisible **pointy-top hexagonal grid** (construction hex circumradius 36, center at `50,50`, `viewBox="0 0 100 100"`).
- **Construction**: One master serpent-head path (`id="hydra-head-0"` class) replicated in exact **3-fold rotational symmetry** via `rotate(120 50 50)` and `rotate(240 50 50)`. Every head shares the same anchor set — minimal anchors, clean cubic Béziers, fully editable in Figma/Illustrator/Inkscape.
- **Hidden Hydra**: At a glance the mark reads as a clean, engineered tri-sym emblem. On closer inspection each of the three forms is a serpent head in profile — pointed snout, flared hood, hollow throat — representing **Video Editing (up), Motion Design (down-left), Voice Over (down-right)**. The three necks converge into a small solid central core (the hydra's body).
- **Color**: Pure `currentColor` fills/strokes — recolorable to Neon Green `#39FF14`, Electric Cyan `#00E5FF`, White, or Black with no geometry changes. Site default is Mythic Emerald (`#10b981`) via `text-accent`.
- **No decoration**: no gradients, glow, shadows, or reflections inside the SVG. All lighting lives externally in the CSS layer (`.hydra-mark-glow`, `.hydra-mark-pulse`, `.hydra-mark-spin`).
- **Motion-ready**: stable classes (`hydra-head`, `hydra-head-0/1/2`) + `pathLength={1}` per path enable CSS/Framer Motion stroke drawing, outline tracing, glow, slow rotation, pulse, and hover effects without losing identity.
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
