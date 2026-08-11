import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Check, X, Layers } from 'lucide-react';
import { PROCESS_STEPS, COMPARISON_MATRIX } from '../data/portfolioData';
import { useLanguage } from '../i18n/LanguageContext';
import { localizeProcessSteps, localizeComparison } from '../i18n/translations';
import { TiltCard } from './TiltCard';

// Line-by-line header reveal — each word/line rises from y:40 on its own beat.
const headerWordVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const headerLineVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const ProcessSection = React.memo(function ProcessSection() {
  const { lang, t } = useLanguage();
  const steps = localizeProcessSteps(PROCESS_STEPS, lang);
  const comparison = localizeComparison(COMPARISON_MATRIX, lang);

  return (
    <section id="process" className="py-8 sm:py-10 md:py-24 px-4 sm:px-6 text-[var(--text-main)] relative transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ hidden: {}, show: {} }}
          className="mb-6 md:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight uppercase font-display text-[var(--text-main)] mb-6">
            <motion.span custom={0} variants={headerWordVariants} className="inline-block">
              {t('process.how')}
            </motion.span>{' '}
            <motion.span custom={1} variants={headerWordVariants} className="inline-block text-accent">
              {t('process.operates')}
            </motion.span>
          </h2>
          <motion.p
            custom={0}
            variants={headerLineVariants}
            className="max-w-2xl text-base sm:text-lg text-[var(--text-muted)] font-normal leading-relaxed"
          >
            {t('process.intro')}
          </motion.p>
        </motion.div>

        {/* 5-Step Workflow Cards — magnetic 3D tilt, no SaaS badges, soft emerald hover */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 mb-8 md:mb-16">
          {steps.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 35, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group h-full"
            >
              <TiltCard className="glass-card glass-hover p-4 md:p-6 rounded-2xl flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-2.5 mb-4">
                    <span className="w-2 h-2 rounded-full bg-accent/60 group-hover:bg-accent transition-colors shadow-[0_0_12px_rgba(16,185,129,0.6)]" />
                    <span className="text-xs text-accent uppercase tracking-widest font-medium">
                      {step.subtitle}
                    </span>
                  </div>

                  <h3 className="text-base font-display font-medium text-[var(--text-main)] uppercase mb-3 group-hover:text-accent transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-white/5">
                  <span className="text-xs text-slate-400 dark:text-white/40 uppercase block mb-1">
                    {t('process.deliverable')}
                  </span>
                  <span className="text-sm font-semibold text-slate-800 dark:text-white/90">
                    {step.deliverable}
                  </span>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Many Heads, One Unified Vision — humanized two-column narrative */}
        <motion.h3
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ hidden: {}, show: {} }}
          className="text-2xl sm:text-4xl font-semibold tracking-tight uppercase font-display text-[var(--text-main)] mb-10"
        >
          <motion.span custom={0} variants={headerWordVariants} className="inline-block">
            {t('process.narrativeTitle')}
          </motion.span>{' '}
          <motion.span custom={1} variants={headerWordVariants} className="inline-block text-accent">
            {t('process.narrativeTitleGrad')}
          </motion.span>
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Fragmented workflow column */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="h-full"
          >
            <TiltCard max={3} className="glass-card glass-hover p-6 sm:p-9 rounded-3xl h-full">
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-white/50">
                    <Layers size={18} />
                  </div>
                  <h4 className="text-sm font-display font-medium uppercase tracking-wider text-slate-700 dark:text-white/70">
                    {t('process.fragmentedTitle')}
                  </h4>
                </div>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-7">
                  {t('process.fragmentedDesc')}
                </p>
                <ul className="space-y-4">
                  {comparison.map((row) => (
                    <li key={row.feature} className="flex items-start gap-3 text-sm text-[var(--text-muted)]">
                      <X size={16} className="text-slate-400 dark:text-white/30 shrink-0 mt-0.5" />
                      <span>{row.agency}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TiltCard>
          </motion.div>

          {/* Unified vision column */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="h-full"
          >
            <TiltCard max={3} className="relative glass-card glass-hover p-6 sm:p-9 rounded-3xl border-accent/30 dark:border-accent/40 shadow-[0_24px_70px_-30px_rgba(16,185,129,0.35)] overflow-hidden h-full">
              <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-accent/10 blur-3xl pointer-events-none" />
              <div className="flex items-center gap-3 mb-5 relative">
                <div className="p-2.5 rounded-xl bg-accent/15 border border-accent/40 text-accent">
                  <Check size={18} />
                </div>
                <h4 className="text-sm font-display font-medium uppercase tracking-wider text-[var(--text-main)]">
                  {t('process.unifiedTitle')}
                </h4>
              </div>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-7 relative">
                {t('process.unifiedDesc')}
              </p>
              <ul className="space-y-4 relative">
                {comparison.map((row) => (
                  <li key={row.feature} className="flex items-start gap-3 text-sm text-[var(--text-main)]">
                    <span className="w-5 h-5 rounded-full bg-accent/15 border border-accent/40 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={11} className="text-accent" />
                    </span>
                    <span className="font-medium">{row.hydra}</span>
                  </li>
                ))}
              </ul>
            </TiltCard>
          </motion.div>
        </div>

      </div>
    </section>
  );
});
