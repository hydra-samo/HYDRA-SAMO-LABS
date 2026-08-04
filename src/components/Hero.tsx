import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Play, ArrowRight } from 'lucide-react';
import { DISCIPLINES } from '../data/portfolioData';
import heroPortrait from '../assets/images/hydra_samo.webp';
import { useLanguage } from '../i18n/LanguageContext';
import { MagneticButton } from './MagneticButton';

interface HeroProps {
  onOpenReel: () => void;
  onOpenBrief: () => void;
}

/* Staggered, blur-in reveal for the hero typography. */
const heroContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const heroItem: Variants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(10px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export const Hero: React.FC<HeroProps> = ({
  onOpenReel,
  onOpenBrief,
}) => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-4 sm:px-6 pt-28 sm:pt-32 pb-16 overflow-hidden text-[var(--text-main)] bg-[var(--bg-canvas)]/80 backdrop-blur-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-16">
          
          {/* Left Column: Text Zone */}
          <motion.div
            variants={heroContainer}
            initial="hidden"
            animate="show"
            className="lg:col-span-6 flex flex-col items-start max-w-xl"
          >
            {/* Tagline */}
            <motion.span variants={heroItem} className="font-mono text-xs text-accent uppercase tracking-[0.3em] mb-6 font-medium">
              {t('hero.eyebrow')}
            </motion.span>

            {/* Main Title */}
            <motion.h1 variants={heroItem} className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold tracking-[-0.04em] leading-[0.88] mb-8 font-display text-[var(--text-main)]">
              {t('hero.headingVideo')}<br />
              {t('hero.headingMotion')}<br />
              <span className="text-accent">{t('hero.headingVoice')}</span>
            </motion.h1>

            {/* Description */}
            <motion.p variants={heroItem} className="text-base sm:text-lg text-[var(--text-muted)] font-normal leading-relaxed mb-10 max-w-lg">
              <strong className="text-[var(--text-main)] font-medium">{t('about.badgeName')}</strong> {t('hero.description')}
            </motion.p>

            {/* Action Pills */}
            <motion.div variants={heroItem} className="flex flex-wrap items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 320, damping: 20 }}
              >
                <MagneticButton
                  onClick={onOpenBrief}
                  className="px-7 sm:px-8 py-4 min-h-[44px] rounded-full bg-accent text-white hover:bg-accent-dark dark:bg-white/[0.05] dark:border-emerald-500/30 dark:text-white dark:hover:bg-white/10 font-semibold text-xs sm:text-sm uppercase tracking-[0.12em] transition-all duration-300 hover:shadow-[0_0_25px_rgba(16,185,129,0.2)] flex items-center gap-2.5"
                >
                  <span>{t('btn.startProject')}</span>
                  <ArrowRight size={15} />
                </MagneticButton>
              </motion.div>

              <button
                onClick={onOpenReel}
                className="px-7 sm:px-8 py-4 min-h-[44px] rounded-full border border-emerald-600/30 dark:border-emerald-500/30 bg-white/80 dark:bg-white/[0.02] backdrop-blur-md text-[var(--text-main)] font-semibold text-xs sm:text-sm uppercase tracking-[0.12em] transition-all duration-300 hover:bg-emerald-50/60 dark:hover:bg-white/10 hover:border-emerald-600/60 dark:hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] active:scale-95 flex items-center gap-2.5 shadow-sm dark:shadow-none"
              >
                <Play size={14} className="fill-current text-accent" />
                <span>{t('btn.watchReel')}</span>
              </button>
            </motion.div>
          </motion.div>

          {/* Right Column: Visual Zone */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative"
          >
            {/* Main Glass Frame */}
            <div className="glass-card rounded-[36px] sm:rounded-[40px] md:rounded-[48px] p-3.5 sm:p-5">
              <div className="relative w-full h-[380px] sm:h-[500px] lg:h-[550px] rounded-[24px] sm:rounded-[32px] overflow-hidden bg-slate-900 dark:bg-[var(--card-bg)]">
                <img
                  src={heroPortrait}
                  alt="Bendali Issam Eddine - Hydra Samo"
                  className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                />

                {/* Subtle Gradient Fade at Bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 dark:from-[var(--card-bg)] via-transparent to-transparent opacity-60 pointer-events-none" />

                {/* Name Badge */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-950/80 dark:bg-[var(--card-bg)]/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  <span className="tracking-widest uppercase font-semibold text-accent">HYDRA // SAMO</span>
                </div>
              </div>

              {/* Craft labels underneath image */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3 mt-4">
                {DISCIPLINES.map((head) => (
                  <div
                    key={head.id}
                    className="glass-card p-3 sm:p-4 rounded-[18px] sm:rounded-[20px] text-center"
                  >
                    <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[var(--text-main)] block truncate">
                      {head.id === 'video' ? t('hero.badge.videoEdit') : head.id === 'motion' ? t('hero.badge.motion3d') : t('hero.badge.vocalArt')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>

        {/* Footer Meta Strip */}
        <div className="pt-8 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] sm:text-[11px] text-[var(--text-muted)] uppercase tracking-[0.2em]">
          <div>{t('hero.footer.year')}</div>
          <div className="text-accent font-semibold">{t('hero.footer.direct')}</div>
          <div>{t('hero.footer.manyHeads')}</div>
        </div>
      </div>
    </section>
  );
};

