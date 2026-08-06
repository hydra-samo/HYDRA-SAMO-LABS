import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import { HydraLogo } from './HydraLogo';
import { useCoarsePointer } from '../hooks/useCoarsePointer';
import { useDeviceTier } from '../hooks/useDeviceTier';

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

  // Low-tier devices skip the entrance blur — the fade + rise stays kinetic
  // without the filter compositing cost on weak GPUs.
  const heroItem: Variants = isCoarse || tier === 'low' ? heroItemFlat : heroItemBlur;

  return (
    <section className="relative min-h-0 md:min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-10 md:pt-32 pb-16 text-center overflow-hidden text-[var(--text-main)] transition-colors duration-300">
      <motion.div
        variants={heroContainer}
        initial={reduceMotion ? false : 'hidden'}
        animate="show"
        className="max-w-3xl mx-auto w-full flex flex-col items-center"
      >
        {/* Brand mark — standalone, larger, grows on hover/tap */}
        <motion.div
          variants={heroItem}
          whileHover={reduceMotion ? undefined : { scale: 1.1 }}
          whileTap={reduceMotion ? undefined : { scale: 0.94 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          className="mb-8 group"
        >
          <HydraLogo className="h-16 w-16 sm:h-20 sm:w-20 text-accent/70 mx-auto hydra-mark-glow transition-all duration-300 group-hover:text-accent group-hover:drop-shadow-[0_0_26px_rgba(16,185,129,0.6)]" />
        </motion.div>

        {/* Main Title */}
        <motion.h1
          variants={heroItem}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.02] mb-6 font-display text-[var(--text-main)]"
        >
          {t('hero.headingVideo')}
          <br />
          {t('hero.headingMotion')}
          <br />
          <span className="text-accent">{t('hero.headingVoice')}</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={heroItem}
          className="text-base sm:text-lg text-[var(--text-muted)] font-normal leading-relaxed max-w-xl"
        >
          <strong className="text-[var(--text-main)] font-medium">{t('about.badgeName')}</strong>{' '}
          {t('hero.description')}
        </motion.p>
      </motion.div>
    </section>
  );
});
