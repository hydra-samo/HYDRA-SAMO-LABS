import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';

export const VoiceOverSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="voice" className="py-16 sm:py-24 px-4 sm:px-6 text-center text-[var(--text-main)] relative transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight uppercase font-display text-[var(--text-main)] mb-6">
          {t('voice.headingProf')} <span className="text-accent">{t('voice.headingOver')}</span>
        </h2>
        <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed font-normal uppercase tracking-widest">
          {t('voice.comingSoon')}
        </p>
      </div>
    </section>
  );
};
