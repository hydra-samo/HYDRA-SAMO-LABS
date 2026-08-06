import React from 'react';
import { Home, Film, Mic, Layers, User } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { cn } from '../lib/utils';

export type SlideKey = 'home' | 'work' | 'voice' | 'process' | 'about';

interface MobileDockProps {
  active: SlideKey;
  onSelect: (slide: SlideKey) => void;
}

/**
 * Bottom navigation dock — mobile only (md:hidden). Replaces the removed
 * hamburger menu and section links: tapping an item crossfades to that
 * section (slideshow, no scrolling). Icon + label per item so the labels
 * fit correctly on narrow screens. Glassmorphic dark editorial style per
 * DESIGN.md — no pills, no badges, emerald accent on the active slide.
 */
export const MobileDock: React.FC<MobileDockProps> = ({ active, onSelect }) => {
  const { t } = useLanguage();

  const items: { key: SlideKey; label: string; icon: React.ReactNode }[] = [
    { key: 'home', label: t('nav.home'), icon: <Home size={20} /> },
    { key: 'work', label: t('nav.work'), icon: <Film size={20} /> },
    { key: 'voice', label: t('nav.voice'), icon: <Mic size={20} /> },
    { key: 'process', label: t('nav.process'), icon: <Layers size={20} /> },
    { key: 'about', label: t('nav.origin'), icon: <User size={20} /> },
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-[calc(0.6rem+env(safe-area-inset-bottom,0px))] px-3 pointer-events-none"
      aria-label={t('lang.selectAria')}
    >
      <div className="pointer-events-auto flex items-center gap-0.5 rounded-full bg-[var(--card-bg)]/90 border border-[var(--border-color)] px-1.5 py-1.5 backdrop-blur-xl shadow-[0_18px_40px_-18px_rgba(0,0,0,0.5)] dark:shadow-none transition-colors duration-300">
        {items.map((item) => {
          const isActive = active === item.key;
          return (
            <button
              key={item.key}
              onClick={() => onSelect(item.key)}
              aria-current={isActive ? 'page' : undefined}
              aria-label={item.label}
              className={cn(
                'flex flex-col items-center justify-center gap-0.5 min-w-[60px] min-h-[52px] px-1.5 rounded-full transition-all duration-300',
                isActive
                  ? 'text-accent'
                  : 'text-slate-500 dark:text-white/45 hover:text-slate-800 dark:hover:text-white/85'
              )}
            >
              <span className={cn('transition-transform duration-300', isActive && 'scale-110')}>
                {item.icon}
              </span>
              <span className="text-[10px] font-medium uppercase tracking-widest whitespace-nowrap">
                {item.label}
              </span>
              <span
                className={cn(
                  'w-1 h-1 rounded-full transition-colors duration-300',
                  isActive ? 'bg-accent' : 'bg-transparent'
                )}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
};
