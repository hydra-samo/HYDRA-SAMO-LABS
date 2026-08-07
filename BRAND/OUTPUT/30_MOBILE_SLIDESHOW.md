# HYDRA SAMO — MOBILE SLIDESHOW & DOCK NAVIGATION
## Mobile-Only Navigation Redesign + Section Slideshow
### Version 1.0

SYSTEM ROLE

You are the Principal Interaction Designer and Frontend Engineer for the HYDRA SAMO Brand Identity System.

The brand identity is complete.

The desktop experience is complete and must not change.

Your responsibility is to redesign the mobile navigation experience only.

This phase is a mobile-only interaction redesign.

No desktop change is permitted.

No redesign of section content, typography, colors, or brand assets is permitted.

---

# REQUIRED REFERENCES

Read completely before making changes.

@BRAND/DESIGN.md

@BRAND/AGENTS.md

@BRAND/OUTPUT/26_LIFECYCLE_REPLICATOR.md

@BRAND/OUTPUT/28_REPOSITORY_OPTIMIZATION.md

@BRAND/OUTPUT/28_REPOSITORY_OPTIMIZATION_REPORT.md

Read the source code of:

@WEBSITE_v1.1/src/App.tsx

@WEBSITE_v1.1/src/components/Navigation.tsx

@WEBSITE_v1.1/src/components/Hero.tsx

@WEBSITE_v1.1/src/components/WorkGallery.tsx

@WEBSITE_v1.1/src/components/VoiceOverSection.tsx

@WEBSITE_v1.1/src/components/ProcessSection.tsx

@WEBSITE_v1.1/src/components/AboutSection.tsx

@WEBSITE_v1.1/src/hooks/useLenis.ts

@WEBSITE_v1.1/src/i18n/translations.ts

---

# HARD CONSTRAINTS

1. DESKTOP MUST STAY INTACT.

   The desktop view (md and above) must be byte-for-byte unchanged.

   All mobile changes must be gated below the md breakpoint (48rem).

2. NO FULL REWRITES.

   Follow the "Optimize, Never Rewrite" rule from 28_REPOSITORY_OPTIMIZATION.md.

   Reuse existing components, framer-motion patterns, cn(), relative imports.

3. BRAND GOVERNANCE.

   Do not touch HydraLogo geometry, the frozen frame, or the brand lockup rules.

   The nav lockup is the only surface allowed to pair the mark with the wordmark.

4. DO NOT INTRODUCE FORBIDDEN TROPES.

   No SaaS eyebrow pills, no numbered badges, no location badges, no emoji,

   no neon cyan or bright blue gradients.

5. ICONOGRAPHY.

   Use lucide-react stock components only. Do not hand-roll SVG glyph sets.

6. RELEASE SYNC.

   Mirror every changed/new source file into

   BRAND/RELEASE/HYDRA_SAMO_BRAND_v1.0/SOURCE_CODE/

   and regenerate BRAND/RELEASE/HYDRA_SAMO_BRAND_v1.0.zip before committing.

7. REPORT NUMBERING.

   BRAND/OUTPUT/29_LOGO_LOCKUP_SYSTEM.md already exists and is frozen governance.

   Use BRAND/OUTPUT/30_ for this phase. Write the report and the prompt used.

---

# TASK

Implement the following mobile-only experience.

## 1. Remove the hamburger menu from the nav bar.

   Remove the lucide Menu / X icon and the mobile drawer entirely.

   The navbar no longer opens a menu on mobile.

## 2. Change the mobile nav from a floating navbar to a compact static top bar.

   On mobile only:

   - The bar is static (relative), NOT fixed. It does not follow scroll.

   - It is visible only inside the hero/home slide.

   - It contains: logo (mark only below sm, mark + wordmark at sm and up),

     theme toggle, compact language switcher, Start Project button.

   - It has no section links and no menu.

   - Keep the Start Project button wired to the brief modal.

## 3. Add a bottom dock with sections.

   On mobile only:

   - Fixed bottom dock, glassmorphic dark editorial style per BRAND/DESIGN.md.

   - Each item shows a lucide icon AND a label.

   - Sections: Home, Work, Voice, Process, Origin (About).

   - Active slide gets the emerald accent treatment.

   - min 44px touch targets, safe-area inset padding.

   - Hidden on md and above.

## 4. Convert the sections into a slideshow.

   On mobile only:

   - Each section is a full-viewport slide (100dvh).

   - Clicking a dock item fades that section in (no page scrolling).

   - The interface is minimal: no scroll needed between sections.

   - Each slide may still scroll internally as a safety fallback.

   - Respect prefers-reduced-motion.

## 5. Desktop behavior unchanged.

   - md and above: existing fixed floating nav, anchor links, single scroll flow.

   - The slideshow wrappers must be inert on md+.

## 6. Preserve the brief screen.

   The lazy ContactSection modal and the Start Project flow must stay intact.

---

# DELIVERABLES

1. The implemented mobile slideshow + dock + compact nav.

2. A numbered report markdown in BRAND/OUTPUT/ (BRAND/OUTPUT/30_MOBILE_SLIDESHOW_REPORT.md)

   following the format of BRAND/OUTPUT/28_REPOSITORY_OPTIMIZATION_REPORT.md.

3. This prompt saved as BRAND/OUTPUT/30_MOBILE_SLIDESHOW.md (same base name as the report).

4. Release sync + zip regeneration.

5. npm run lint and npm run build both green.

6. Commit and push to origin/main.

---

# VALIDATION

- npm run lint must pass (tsc --noEmit).

- npm run build must pass.

- Built CSS must still use the standard media-query form

  (no select-variant regressions), with min-width: 48rem present.

- Desktop DOM/CSS must be unchanged: all mobile-only elements md:hidden,

  all desktop elements hidden md:block, .mobile-slide inert at 48rem+.
