import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

export const AboutSection = React.memo(function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-8 sm:py-10 md:py-24 px-4 sm:px-6 text-[var(--text-main)] relative overflow-hidden transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
        
        {/* Narrative Column */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        >
          <span className="text-accent text-xs uppercase tracking-widest block mb-3 font-medium">
            {t('about.eyebrow')}
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-4 sm:mb-8 font-display text-[var(--text-main)] uppercase">
            {t('about.headingOne')} <br />
            <span className="text-accent">
              {t('about.headingTwo')}
            </span>
          </h2>

          <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-[var(--text-muted)] leading-relaxed font-normal">
            <p>
              {t('about.p1a')} <strong className="text-[var(--text-main)] font-semibold">{t('about.badgeName')}</strong>{t('about.p1b')} <strong className="text-accent font-semibold">Hydra Samo</strong>{t('about.p1c')}
            </p>

            <p>
              {t('about.p2')}
            </p>

            <p>
              {t('about.p3')}
            </p>
          </div>

          {/* Key Advantages Grid */}
          <div className="mt-4 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-slate-200 dark:border-white/10">
            {[
              t('about.adv1'),
              t('about.adv2'),
              t('about.adv3'),
              t('about.adv4'),
            ].map((adv, idx) => (
              <motion.div 
                key={adv}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="flex items-start gap-3 font-medium text-xs uppercase tracking-wider text-[var(--text-main)]"
              >
                <span className="text-accent shrink-0">—</span>
                <span>{adv}</span>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </div>

    </section>
  );
});
