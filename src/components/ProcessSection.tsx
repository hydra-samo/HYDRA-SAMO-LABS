import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Layers } from 'lucide-react';
import { PROCESS_STEPS, COMPARISON_MATRIX } from '../data/portfolioData';
import { useLanguage } from '../i18n/LanguageContext';
import { localizeProcessSteps, localizeComparison } from '../i18n/translations';

export const ProcessSection: React.FC = () => {
  const { lang, t } = useLanguage();
  const steps = localizeProcessSteps(PROCESS_STEPS, lang);
  const comparison = localizeComparison(COMPARISON_MATRIX, lang);

  return (
    <section id="process" className="py-16 sm:py-24 px-4 sm:px-6 text-[var(--text-main)] relative transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight uppercase font-display text-[var(--text-main)] mb-6">
            {t('process.how')} <span className="text-accent">{t('process.operates')}</span>
          </h2>
          <p className="max-w-2xl text-base sm:text-lg text-[var(--text-muted)] font-normal leading-relaxed">
            {t('process.intro')}
          </p>
        </motion.div>

        {/* 5-Step Workflow Cards — no SaaS badges, soft emerald hover */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mb-16">
          {steps.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 35, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group glass-card glass-hover p-6 rounded-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="w-2 h-2 rounded-full bg-accent/60 group-hover:bg-accent transition-colors shadow-[0_0_12px_rgba(16,185,129,0.6)]" />
                  <span className="text-xs font-mono text-accent uppercase tracking-widest font-semibold">
                    {step.subtitle}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-[var(--text-main)] uppercase mb-3 group-hover:text-accent transition-colors">
                  {step.title}
                </h3>

                <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">
                  {step.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-white/5">
                <span className="text-xs font-mono text-slate-400 dark:text-white/40 uppercase block mb-1">
                  {t('process.deliverable')}
                </span>
                <span className="text-sm font-semibold text-slate-800 dark:text-white/90">
                  {step.deliverable}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Many Heads, One Unified Vision — humanized two-column narrative */}
        <div className="mb-10">
          <h3 className="text-2xl sm:text-4xl font-semibold tracking-tight uppercase font-display text-[var(--text-main)]">
            {t('process.narrativeTitle')}{' '}
            <span className="text-accent">{t('process.narrativeTitleGrad')}</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Fragmented workflow column */}
          <div className="glass-card p-6 sm:p-9 rounded-3xl flex flex-col">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-white/50">
                <Layers size={18} />
              </div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-white/70">
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

          {/* Unified vision column */}
          <div className="relative glass-card p-6 sm:p-9 rounded-3xl border-accent/30 dark:border-accent/40 shadow-[0_24px_70px_-30px_rgba(16,185,129,0.35)] overflow-hidden">
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-accent/10 blur-3xl pointer-events-none" />
            <div className="flex items-center gap-3 mb-5 relative">
              <div className="p-2.5 rounded-xl bg-accent/15 border border-accent/40 text-accent">
                <Check size={18} />
              </div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--text-main)]">
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
          </div>
        </div>

      </div>
    </section>
  );
};
