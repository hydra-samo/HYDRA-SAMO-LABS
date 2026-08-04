import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import aboutPortrait from '../assets/images/hydra_samo.webp';
import { useLanguage } from '../i18n/LanguageContext';

export const AboutSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-16 sm:py-24 px-4 sm:px-6 text-[var(--text-main)] relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        
        {/* Portrait Image Column */}
        <motion.div 
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full lg:w-1/2 max-w-md mx-auto lg:max-w-none"
        >
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/25 via-accent-soft/15 to-accent/30 dark:from-accent/25 dark:via-accent/15 dark:to-accent/30 opacity-10 dark:opacity-25 blur-2xl group-hover:opacity-25 dark:group-hover:opacity-45 transition-opacity duration-700 rounded-3xl" />
            
            <div className="relative z-10 glass-card dark:border-accent/25 rounded-3xl overflow-hidden p-3">
              <img 
                src={aboutPortrait} 
                alt="Bendali Issam Eddine - Hydra Samo" 
                loading="lazy"
                className="w-full aspect-square object-cover object-top rounded-2xl transition-transform duration-700 transform group-hover:scale-[1.02]"
              />
            </div>
          </div>
        </motion.div>

        {/* Narrative Column */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full lg:w-1/2"
        >
          <span className="text-accent font-mono text-xs uppercase tracking-widest block mb-3 font-medium">
            {t('about.eyebrow')}
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-8 font-display text-[var(--text-main)] uppercase">
            {t('about.headingOne')} <br />
            <span className="text-accent">
              {t('about.headingTwo')}
            </span>
          </h2>

          <div className="space-y-6 text-base sm:text-lg text-[var(--text-muted)] leading-relaxed font-normal">
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
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-200 dark:border-white/10">
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
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="flex items-center gap-3 font-semibold text-xs uppercase tracking-wider text-[var(--text-main)]"
              >
                <CheckCircle2 size={18} className="text-accent shrink-0" />
                <span>{adv}</span>
              </motion.div>
            ))}
          </div>

        </motion.div>

      </div>
    </section>
  );
};
