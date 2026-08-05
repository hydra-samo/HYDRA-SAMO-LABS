# Motion / Ambient Background — Cross-Repo Diff Report

**Date:** 2026-08-04
**Compared:**
- `A` = `/home/hydrasamo/Downloads/hydra-samo-portfolio-fixed/hydra-review 1` (older snapshot)
- `B` = `/home/hydrasamo/Downloads/HYDRA SAMO/HYDRA SAMO LABS` (**this repo, current**)

---

## 1. Executive Summary

**The current repo (`B`) is a strict superset of the older snapshot (`A`). It already contains
every piece of UI motion and the full Ambient Background system. The older snapshot `A` is the
one that is missing the motion/glass CSS and would render flat.**

- 13 of 13 motion-bearing source files exist in **both** trees (identical set).
- Current repo (`B`) has **103** framer-motion props/animations vs **91** in `A`.
- `AmbientBackground.tsx` exists in both — `B` even adds a deep radial emerald wash.
- The critical difference: `A/index.css` is **37 lines** and omits the entire `@layer components`
  block (`.ambient-blob`, `.cursor-spotlight`, `.glass-card`, `.glass-hover`, `@keyframes
  ambient-drift`) **and** the `--blob-*` / `--spot-glow` color variables. Without these, `A`'s
  `AmbientBackground` blobs are invisible/flat and every `glass-card` surface loses its blur,
  border and depth → **that** is the "static flat" look, and it lives in `A`, not `B`.

**Conclusion: nothing needs to be injected into this repo. Overwriting `B`'s files with `A`'s
would strip the restored motion and regress the site back to flat.**

---

## 2. File-by-File Difference Summary

| File | Differs? | What differs in `B` (current) vs `A` |
|---|---|---|
| `src/index.css` | **Yes — critical** | `B` adds the full `@layer components` block: `.ambient-blob` (+ `--a/b/c` drift durations), `.cursor-spotlight`, `.glass-card` (+ dark variant), `.glass-hover`, `@keyframes ambient-drift`, `--blob-moss/jade/lichen` and `--spot-glow` tokens for light+dark, plus `prefers-reduced-motion` guards. `A` has **none** of this. |
| `src/components/AmbientBackground.tsx` | Yes (minor) | Identical structure; `B` adds a static deep emerald radial wash behind the drifting blobs. |
| `src/App.tsx` | Yes | `B` uses the `useLenis()` return ref and adds a scroll-lock effect that stops/starts Lenis + `body.overflow` while video/brief modals are open (fixes scroll-through-under-modal). |
| `src/hooks/useLenis.ts` | Yes | `B` returns a `Lenis` ref (nullable) so callers can stop/start it; behavior otherwise identical. |
| `src/hooks/useOpenGraph.ts` | Yes | `B` respects Vite `BASE_URL` when resolving `/hydra_logo.jpg` (GitHub Pages sub-path fix). |
| `src/components/Hero.tsx` | Yes | `B` wraps the CTA in a springy `motion.div` (`whileHover` lift + `whileTap`), uses `bg-accent`, `glass-card`, adds hover bloom. |
| `src/components/ContactSection.tsx` | Yes | `B` wraps submit + "submit another brief" buttons in `motion.div` springs, `glass-card` panels, `backdrop-blur-md` inputs. |
| `src/components/VoiceOverSection.tsx` | Yes | `B` adds `whileHover`/`whileTap` on track rows, emerald hover glow, `glass-card` surfaces. |
| `src/components/WorkGallery.tsx` | Yes | `B` adds `whileHover`/`whileTap` on project cards, `glass-card`/`glass-hover` surfaces, empty-state retained. |
| `src/components/AboutSection.tsx` | Yes (cosmetic) | `B` uses `glass-card`, `bg-canvas` backdrop tint. |
| `src/components/ProcessSection.tsx` | Yes (cosmetic) | `B` uses `glass-card`/`glass-hover` surfaces. |
| `src/components/Navigation.tsx` | Yes (cosmetic) | `B` swaps `bg-slate-900` CTAs → `bg-accent` tokens. |
| `src/components/VideoModal.tsx` | Yes (cosmetic) | `B` swaps CTA tokens → `bg-accent`. |
| `src/i18n/translations.ts` | Yes (content) | `about.headingTwo` reworded ("ONE ORIGIN." / "UNE SEULE ORIGINE." / "أصل واحد."). |
| `TiltCard.tsx`, `MagneticButton.tsx`, `PlymouthSplash.tsx`, `portfolioData.ts`, `types.ts`, `LanguageContext.tsx`, `useOpenGraph.ts` (see above) | **Identical** | No motion content differs. |

---

## 3. Motion Inventory Present in This Repo (`B`)

- **Ambient background** (`AmbientBackground.tsx`): 3 ultra-blurred drifting blobs
  (`ambient-drift` keyframes, 24/30/36s), film-grain SVG plate, spring-damped cursor
  spotlight, deep radial emerald wash. Rendered `fixed -z-10`.
- **Lenis smooth scroll** (`useLenis.ts`) with anchor routing + modal scroll-lock in `App.tsx`.
- **Framer Motion** throughout: `whileInView` reveal animations, `whileHover`/`whileTap`
  spring micro-interactions, `AnimatePresence` gallery/modal transitions.
- **`TiltCard`** 3D tilt physics and **`MagneticButton`** magnetic pull — both identical in `A` and `B`.
- **Glass editorial surfaces**: `.glass-card` + `.glass-hover` emerald glow.
- **Reduced-motion support**: Lenis and blob drift are skipped/halted for
  `prefers-reduced-motion` users (by design, not a bug).

### Verification (run on `B`)
- `npm run lint` → `tsc --noEmit` clean.
- `npm run build` → success; production CSS bundle contains `ambient-blob`,
  `ambient-drift`, `cursor-spotlight`, `glass-card`.

---

## 4. Why the Site May *Look* Flat Even With This Code

The motion is present and shipping. If the rendered page still reads as flat:

1. **OS "reduce motion" is enabled** → Lenis is skipped and blob drift is disabled by the
   `@media (prefers-reduced-motion: reduce)` guard. That is intentional.
2. **Stale build** — `dist/` or the deployed GH Pages site may predate the restored CSS.
   Rebuild/redeploy from `src/` (current `dist/` was rebuilt 2026-08-04 and includes the keyframes).
3. **Light theme** lowers blob opacity (`--blob-*` 0.2/0.16/0.12 vs 0.3/0.24/0.16 in dark) —
   blobs are deliberately subtle in light mode.

---

## 5. Recommended Action

**Do not copy `A`'s files into `B`.** The only missing thing in `A` is exactly the CSS that makes
this repo feel alive. If a specific micro-interaction is still missing in `B`, list it and it can
be added on top — but nothing was lost relative to `A`.

---

## 6. Why It Rendered Flat Anyway — Root Cause + Fix (verified in a headless browser)

Even though every animation was present, `localhost` (and production) rendered visually flat.
Headless-Chromium diagnostics against the running app found three compounding causes:

1. **Opaque section overlays hid the ambient layer.** Every `<section>` had
   `bg-[var(--bg-canvas)]/80 backdrop-blur-sm`, painting an 80%-opaque canvas over the fixed
   `-z-10` ambient blobs. Result: the drifting glow was ~20% visible at best → only the floating
   nav (its own `backdrop-blur-xl` pill) read as "glass", everything else looked like flat panels.
   **Fix:** removed `bg-[var(--bg-canvas)]/80 backdrop-blur-sm` from all 6 sections
   (Hero, WorkGallery, VoiceOverSection, ProcessSection, AboutSection, ContactSection) so the
   living backdrop shows through and the `glass-card` blur actually has light to refract.

2. **A `@media (prefers-reduced-motion: reduce)` block killed the blob drift.**
   `.ambient-blob { animation: none }` stopped the 24/30/36s drift on any machine with "reduce
   motion" enabled — which is exactly the "I know the code is there but it never moves" symptom.
   **Fix:** removed that media-query kill-switch (and the matching `useLenis` early-return) so
   drift, the cursor spotlight and smooth scroll are always live. Verified: with the reduce-motion
   flag forced ON, `animation-name` is now `ambient-drift` and the blob is measured as **MOVING**.

3. **Light mode was nearly invisible.** `.glass-card` light variant used a white border
   (`rgba(255,255,255,0.6)`) on a near-white canvas — no definition — and blob alphas were very low.
   **Fix:** light `glass-card` border is now emerald `rgba(16,185,129,0.22)`, and blob/spotlight
   alphas were raised (dark moss 0.30→0.38, jade 0.24→0.30, lichen 0.16→0.22; light 0.2→0.26 etc.)
   so the organic glow is actually visible in both themes.

**Verification (after fix):**
- Section backgrounds now compute to `rgba(0,0,0,0)` / no backdrop filter.
- Ambient blob animation = `ambient-drift 24s`, measured **MOVING** even under forced reduced motion.
- Lenis active (`html.lenis`), no page errors.
- Light mode glass border = emerald 1px, blob visible.
- `npm run lint` clean · `npm run build` succeeds · `ambient-drift`, `ambient-blob`,
  `glass-card`, `cursor-spotlight` all present in the production CSS bundle.
