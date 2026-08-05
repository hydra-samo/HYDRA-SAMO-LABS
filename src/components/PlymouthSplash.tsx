import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import { HydraLogo } from './HydraLogo';
import { useCoarsePointer } from '../hooks/useCoarsePointer';

interface PlymouthSplashProps {
  onComplete: () => void;
}

/**
 * A single-beat typographic monogram. Shows "HYDRA SAMO" for ~1.1s, then
 * exits upward with an eased fade. Repeat visits are skipped by App.tsx via
 * sessionStorage, and reduced-motion users jump straight to the content.
 */
export const PlymouthSplash: React.FC<PlymouthSplashProps> = ({ onComplete }) => {
  const { t } = useLanguage();
  const isCoarse = useCoarsePointer();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete();
      return;
    }

    const timer = window.setTimeout(onComplete, 1100);
    return () => window.clearTimeout(timer);
  }, [onComplete]);

  // The entrance blur is dropped on touch devices — the scale + letter-spacing
  // beats stay, only the filter goes (it's the expensive part on mobile GPUs).
  const logoInitial = isCoarse ? { opacity: 0, scale: 0.85 } : { opacity: 0, scale: 0.85, filter: 'blur(8px)' };
  const logoAnimate = isCoarse ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1, filter: 'blur(0px)' };
  const titleInitial = isCoarse ? { opacity: 0, y: 16 } : { opacity: 0, y: 16, filter: 'blur(12px)' };
  const titleAnimate = isCoarse ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, filter: 'blur(0px)' };

  return (
    <motion.div
      key="plymouth-splash"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        y: -20,
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
      }}
      onClick={onComplete}
      title={t('splash.skip')}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none overflow-hidden cursor-pointer bg-[#060c09] text-white"
    >
      <motion.div
        initial={logoInitial}
        animate={logoAnimate}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-6"
      >
        <HydraLogo className="h-16 w-16 sm:h-20 sm:w-20 text-[#34d399] hydra-mark-glow hydra-mark-pulse" />
      </motion.div>

      <motion.span
        initial={{ opacity: 0, letterSpacing: '0.6em' }}
        animate={{ opacity: 1, letterSpacing: '0.3em' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="mb-4 text-xs sm:text-sm font-mono uppercase tracking-[0.3em] text-[#34d399] font-medium"
      >
        {t('splash.welcomeTo')}
      </motion.span>

      <motion.h1
        initial={titleInitial}
        animate={titleAnimate}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="px-6 text-center font-display text-5xl sm:text-7xl font-black uppercase tracking-[0.18em] leading-none"
      >
        {t('splash.title')}
        <span className="text-[#34d399]"> {t('splash.titleGrad')}</span>
      </motion.h1>

      <motion.span
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mt-5 text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-white/45"
      >
        {t('splash.subtitle')}
      </motion.span>
    </motion.div>
  );
};
