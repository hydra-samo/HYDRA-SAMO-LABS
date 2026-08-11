import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { PROCESS_STEPS, COMPARISON_MATRIX } from '../data/portfolioData';
import { useLanguage } from '../i18n/LanguageContext';
import { localizeProcessSteps, localizeComparison } from '../i18n/translations';

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

        {/* 5-Step Workflow — editorial timeline. No cards, no glass, no
            badges: a hairline grid with bold emerald step numerals carrying
            the sequence like a film treatment. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-0 mb-8 md:mb-16 border-t border-slate-200 dark:border-white/10">
          {steps.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative pt-6 md:pt-8 pb-8 md:pb-10 px-0 sm:pr-6 lg:pr-8 lg:border-l border-slate-200/60 dark:border-white/5 lg:first:border-l-0"
            >
              <span className="block font-display text-4xl md:text-5xl font-bold text-accent/90 leading-none mb-4 group-hover:text-accent transition-colors">
                {step.number}
              </span>
              <span className="block text-xs text-[var(--text-muted)] uppercase tracking-widest font-medium mb-2">
                {step.subtitle}
              </span>
              <h3 className="text-base font-display font-medium text-[var(--text-main)] uppercase mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-5">
                {step.description}
              </p>
              <div className="pt-4 border-t border-slate-100 dark:border-white/5">
                <span className="text-xs text-slate-400 dark:text-white/40 uppercase block mb-1">
                  {t('process.deliverable')}
                </span>
                <span className="text-sm font-semibold text-slate-800 dark:text-white/90">
                  {step.deliverable}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Many Heads, One Unified Vision — pure typography, no containers */}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {/* Fragmented workflow — editorial column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h4 className="text-sm font-display font-medium uppercase tracking-wider text-slate-700 dark:text-white/70 border-b border-slate-200 dark:border-white/10 pb-4 mb-5">
              {t('process.fragmentedTitle')}
            </h4>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-7">
              {t('process.fragmentedDesc')}
            </p>
            <div className="divide-y divide-slate-100 dark:divide-white/5">
              {comparison.map((row) => (
                <div key={row.feature} className="py-4 text-sm text-[var(--text-muted)]">
                  <span className="block text-xs uppercase tracking-widest text-slate-400 dark:text-white/30 mb-0.5">
                    {row.feature}
                  </span>
                  <span>{row.agency}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Unified vision — editorial column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h4 className="text-sm font-display font-medium uppercase tracking-wider text-[var(--text-main)] border-b border-accent/40 pb-4 mb-5">
              {t('process.unifiedTitle')}
            </h4>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-7">
              {t('process.unifiedDesc')}
            </p>
            <div className="divide-y divide-slate-100 dark:divide-white/5">
              {comparison.map((row) => (
                <div key={row.feature} className="py-4 text-sm text-[var(--text-main)]">
                  <span className="block text-xs uppercase tracking-widest text-accent mb-0.5">
                    {row.feature}
                  </span>
                  <span className="font-medium">{row.hydra}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
});
