import React, { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import { useCoarsePointer } from '../hooks/useCoarsePointer';
import { useDeviceTier } from '../hooks/useDeviceTier';
import { HeroAmbient } from './HeroAmbient';

/* Staggered, blur-in reveal for the hero typography. The blur filter is a
   full-screen compositing cost on low-end GPUs, so touch devices get the same
   kinetic fade+rise without it — the motion stays, the filter goes. */
const heroContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const heroItemBlur: Variants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(10px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const heroItemFlat: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const Hero = React.memo(function Hero() {
  const { t } = useLanguage();
  const isCoarse = useCoarsePointer();
  const tier = useDeviceTier();
  const reduceMotion = useReducedMotion();

  // Scroll-linked parallax — the display typography drifts up at ~0.4x scroll
  // velocity while breathing down to 0.96 scale, giving the hero real z-depth
  // as the page leaves it. Skipped on touch (no scroll intent to track on the
  // slideshow), low-tier GPUs (transform + filter cost) and reduced motion.
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -280]);
  const parallaxScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);

  const scrollEnabled = !isCoarse && tier !== 'low' && !reduceMotion;

  // Low-tier devices skip the entrance blur — the fade + rise stays kinetic
  // without the filter compositing cost on weak GPUs.
  const heroItem: Variants = isCoarse || tier === 'low' ? heroItemFlat : heroItemBlur;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden min-h-0 md:min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-10 pt-10 md:pt-28 pb-16 text-start text-[var(--text-main)]"
    >
      {/* Digital Noir stage: a lightweight 2D canvas ambient field (dot-matrix
          emerald at ≤12% opacity) scoped strictly inside the hero — no global
          fixed layer, nothing bleeds into the sections below. */}
      {/* Soft radial spotlight first, then the ambient dots paint above it so
          the field stays crisp. Transparent falloff — never an opaque end-stop
          that would bury the dots (Tailwind v4 from/via/to need a
          --tw-gradient-position only direction utilities set, so the stops are
          baked in). */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.12),rgba(16,185,129,0.04)_45%,rgba(16,185,129,0))]"
      />
      <HeroAmbient />

      <motion.div
        variants={heroContainer}
        initial={reduceMotion ? false : 'hidden'}
        animate="show"
        style={scrollEnabled ? { y: parallaxY, scale: parallaxScale, willChange: 'transform' } : undefined}
        className="relative z-10 w-full max-w-7xl mx-auto transform-gpu"
      >
        <div className="md:grid md:grid-cols-12 md:items-end md:gap-10">
          {/* Massive fluid editorial display stack — Design & Motion in Bone
              Off-White, Voice in Mythic Emerald. Extrabold, tight-tracked,
              tight-leading, uppercase. Arabic relaxes the leading via the
              html.lang-ar rules so letterform dots never collide. */}
          <motion.h1
            variants={heroItem}
            className="md:col-span-9 text-7xl md:text-9xl font-extrabold tracking-tighter leading-[0.85] uppercase font-display text-[var(--text-main)]"
          >
            <span className="block">{t('hero.headingDesign')}</span>
            <span className="block">{t('hero.headingMotion')}</span>
            <span className="block text-[#10b981]">{t('hero.headingVoice')}</span>
          </motion.h1>

          {/* Right rail — the pitch sits on the baseline as an editorial meta
              column instead of hiding under the headline. */}
          <motion.p
            variants={heroItem}
            className="md:col-span-3 mt-8 md:mt-0 text-base sm:text-lg text-[var(--text-muted)] font-normal leading-relaxed md:text-end"
          >
            <strong className="block text-[var(--text-main)] font-medium mb-2">
              {t('about.badgeName')}
            </strong>
            {t('hero.description')}
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
});
