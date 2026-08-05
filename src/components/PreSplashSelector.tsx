import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { Sun, Moon, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { Lang } from '../i18n/translations';
import { cn } from '../lib/utils';
import { MagneticButton } from './MagneticButton';
import { HydraLogo } from './HydraLogo';
import { useCoarsePointer } from '../hooks/useCoarsePointer';
import { useDeviceTier } from '../hooks/useDeviceTier';

interface PreSplashSelectorProps {
  theme: 'dark' | 'light';
  onSelectTheme: (theme: 'dark' | 'light') => void;
  onComplete: () => void;
}

const LANGUAGES: { code: Lang; native: string }[] = [
  { code: 'en', native: 'English' },
  { code: 'fr', native: 'Français' },
  { code: 'ar', native: 'العربية' },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.18 } },
};

const itemBlurVariants: Variants = {
  hidden: { opacity: 0, y: 14, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring' as const, stiffness: 160, damping: 18 },
  },
};

const itemFlatVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 160, damping: 18 },
  },
};

export const PreSplashSelector: React.FC<PreSplashSelectorProps> = ({
  theme,
  onSelectTheme,
  onComplete,
}) => {
  const { lang, setLang, t, dir } = useLanguage();
  const reduceMotion = useReducedMotion();
  const isCoarse = useCoarsePointer();
  const tier = useDeviceTier();
  const isRTL = dir === 'rtl';

  // Touch devices skip the blur filter — the stagger + fade still run, so the
  // entrance stays kinetic without rasterizing a blurred panel on mobile GPUs.
  const cheapMotion = isCoarse || tier === 'low';
  const itemVariants = cheapMotion ? itemFlatVariants : itemBlurVariants;

  return (
    <motion.div
      key="pre-splash"
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 0.97,
        ...(cheapMotion ? {} : { filter: 'blur(10px)' }),
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
      }}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto p-4 sm:p-6 bg-[var(--bg-canvas)] text-[var(--text-main)] select-none transition-colors duration-300"
    >
      {/* Ambient glow blobs — dropped on low tier: the first painted screen
          should not rasterize two giant 80–90px blurs on a weak GPU. */}
      {tier !== 'low' && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-[18vh] -left-[14vw] h-[55vw] w-[55vw] rounded-full"
            style={{ background: 'var(--blob-moss)', filter: 'blur(90px)', opacity: 0.35 }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-[22vh] -right-[10vw] h-[48vw] w-[48vw] rounded-full"
            style={{ background: 'var(--blob-jade)', filter: 'blur(80px)', opacity: 0.3 }}
          />
        </>
      )}

      {/* Glass panel */}
      <motion.div
        variants={reduceMotion ? undefined : containerVariants}
        initial={reduceMotion ? 'visible' : 'hidden'}
        animate="visible"
        className={cn(
          'relative w-full max-w-md sm:max-w-lg',
          'bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--border-color)]',
          'rounded-[28px] sm:rounded-[32px] p-6 sm:p-10',
          'shadow-2xl dark:shadow-none'
        )}
      >
        {/* Brand wordmark */}
        <motion.div variants={itemVariants} className="text-center mb-8 sm:mb-10 flex flex-col items-center gap-3.5">
          <HydraLogo className="h-10 w-10 sm:h-11 sm:w-11 text-accent hydra-mark-glow" />
          <span className="font-display font-bold tracking-[-0.02em] text-base sm:text-lg uppercase text-[var(--text-main)] block leading-tight">
            HYDRA SAMO
          </span>
        </motion.div>

        {/* Eyebrow */}
        <motion.div variants={itemVariants} className="text-center mb-8 sm:mb-10">
          <motion.span
            initial={reduceMotion ? { letterSpacing: '0.2em' } : { opacity: 0, letterSpacing: '0.5em' }}
            animate={{ opacity: 1, letterSpacing: '0.2em' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-xs sm:text-sm uppercase tracking-[0.2em] text-accent font-medium"
          >
            {t('pre.eyebrow')}
          </motion.span>
        </motion.div>

        {/* Language selector */}
        <motion.div variants={itemVariants} className="mb-6 sm:mb-8">
          <label className="block text-xs sm:text-sm uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 text-center">
            {t('lang.label')}
          </label>
          <div
            className="grid grid-cols-3 gap-2 sm:gap-2.5"
            role="group"
            aria-label={t('lang.selectAria')}
          >
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={cn(
                  'relative min-h-[46px] sm:min-h-[50px] rounded-[14px] sm:rounded-[16px] text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors duration-200',
                  'border',
                  lang === l.code
                    ? 'border-emerald-500/50 text-white shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                    : 'border-white/10 text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-white/20'
                )}
                aria-pressed={lang === l.code}
              >
                {lang === l.code && (
                  <motion.span
                    layoutId="preLangThumb"
                    transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                    className="absolute inset-0 rounded-[14px] sm:rounded-[16px] bg-accent"
                  />
                )}
                <span className="relative z-10 block">{l.native}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Theme selector */}
        <motion.div variants={itemVariants} className="mb-8 sm:mb-10">
          <label className="block text-xs sm:text-sm uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 text-center">
            {t('theme.interfaceTheme')}
          </label>
          <div
            className="grid grid-cols-2 gap-2 sm:gap-2.5"
            role="group"
            aria-label={t('theme.interfaceTheme')}
          >
            {[
              { value: 'light' as const, icon: Sun, label: t('theme.lightMode') },
              { value: 'dark' as const, icon: Moon, label: t('theme.darkMode') },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => onSelectTheme(opt.value)}
                className={cn(
                  'relative min-h-[46px] sm:min-h-[50px] rounded-[14px] sm:rounded-[16px] text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors duration-200',
                  'border flex items-center justify-center gap-2',
                  theme === opt.value
                    ? 'border-emerald-500/50 text-white shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                    : 'border-white/10 text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-white/20'
                )}
                aria-pressed={theme === opt.value}
              >
                {theme === opt.value && (
                  <motion.span
                    layoutId="preThemeThumb"
                    transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                    className="absolute inset-0 rounded-[14px] sm:rounded-[16px] bg-accent"
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <opt.icon size={15} />
                  <span>{opt.label}</span>
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Enter CTA */}
        <motion.div variants={itemVariants} className="flex flex-col items-center gap-3">
          <MagneticButton
            onClick={onComplete}
            className={cn(
              'group w-full min-h-[48px] px-8 py-3.5 rounded-[16px] sm:rounded-[18px]',
              'border border-emerald-500/40 bg-accent/10 dark:bg-white/[0.04]',
              'text-[var(--text-main)] font-semibold text-sm uppercase tracking-[0.2em]',
              'hover:border-emerald-500/60 hover:shadow-[0_0_25px_rgba(16,185,129,0.25)]',
              'transition-shadow duration-300',
              'flex items-center justify-center gap-2.5'
            )}
          >
            <span>{t('pre.enter')}</span>
            {isRTL ? (
              <ArrowLeft size={16} className="text-accent" />
            ) : (
              <ArrowRight size={16} className="text-accent" />
            )}
          </MagneticButton>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="text-xs sm:text-sm uppercase tracking-[0.18em] text-[var(--text-muted)]/60 text-center"
          >
            {t('pre.hint')}
          </motion.span>
        </motion.div>
      </motion.div>

      {/* Film grain overlay */}
      <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.035] mix-blend-overlay">
        <filter id="pre-splash-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#pre-splash-grain)" />
      </svg>
    </motion.div>
  );
};
