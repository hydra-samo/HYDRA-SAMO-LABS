import React, { useEffect, useState } from 'react';
import { motion, animate, useMotionValue, useTransform, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import { HydraLogo } from './HydraLogo';

interface LoadingSplashProps {
  onComplete: () => void;
}

const BAR_DURATION = 1.9;
const SETTLE_DELAY = 500;
const HARD_CAP = 4500;

/**
 * Minimal brand loading splash. A static Hydra mark and wordmark frame a thin
 * emerald gradient loading bar — the only motion on screen — with a live
 * percentage counter. The global AmbientBackground shows through (the splash
 * is transparent) so the glow reads as one living backdrop. Reduced-motion
 * users jump straight to the content.
 */
export const LoadingSplash: React.FC<LoadingSplashProps> = ({ onComplete }) => {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();

  const progress = useMotionValue(0);
  const barWidth = useTransform(progress, (v) => `${v}%`);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      onComplete();
      return;
    }

    const controls = animate(progress, 100, {
      duration: BAR_DURATION,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setPercent(Math.round(v)),
    });

    const settle = window.setTimeout(onComplete, BAR_DURATION * 1000 + SETTLE_DELAY);
    const hardCap = window.setTimeout(onComplete, HARD_CAP);

    return () => {
      controls.stop();
      window.clearTimeout(settle);
      window.clearTimeout(hardCap);
    };
  }, [reduceMotion, onComplete, progress]);

  return (
    <motion.div
      key="loading-splash"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        y: -20,
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
      }}
      onClick={onComplete}
      title={t('splash.skip')}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none overflow-hidden cursor-pointer"
    >
      <motion.div
        animate={{ opacity: [0.15, 1, 0.15] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        className="flex flex-col items-center"
      >
        <HydraLogo className="h-12 w-12 sm:h-14 sm:w-14 text-[#f3f4f6] hydra-mark-glow" />
      </motion.div>

      <span className="mt-5 font-display text-sm sm:text-base font-bold uppercase tracking-[0.35em] text-[#f3f4f6]">
        HYDRA SAMO
      </span>

      <div className="mt-8 w-44 sm:w-56" aria-hidden="true">
        <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[#059669] via-[#10b981] to-[#34d399] shadow-[0_0_12px_rgba(16,185,129,0.45)]"
            style={{ width: barWidth }}
          />
          <motion.div
            className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent"
            initial={{ x: '-200%' }}
            animate={{ x: '400%' }}
            transition={{ duration: 1.15, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </div>

      <div className="mt-6 flex min-h-[1.5rem] items-center justify-center">
        <span aria-live="polite" className="font-display text-sm sm:text-base font-semibold tabular-nums text-[#34d399]">
          {percent}%
        </span>
      </div>

      <span className="absolute bottom-8 text-[10px] uppercase tracking-[0.25em] text-white/35">
        {t('splash.skip')}
      </span>
    </motion.div>
  );
};
