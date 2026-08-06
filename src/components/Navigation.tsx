import React from 'react';
import { motion, AnimatePresence, useReducedMotion, type Variants } from 'framer-motion';
import { ArrowUpRight, Sun, Moon } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { Lang } from '../i18n/translations';
import { cn } from '../lib/utils';
import { HydraLogo } from './HydraLogo';
import { useCoarsePointer } from '../hooks/useCoarsePointer';
import { useDeviceTier } from '../hooks/useDeviceTier';

interface NavigationProps {
  onOpenBrief: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  /** Compact static top bar — rendered inside the mobile home slide only.
      Shows the logo, theme, language and Start Project; no links, no menu. */
  compact?: boolean;
}

const navContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const navItemBlurVariants: Variants = {
  hidden: { opacity: 0, y: -10, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 140,
      damping: 14,
    },
  },
};

const navItemFlatVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 140,
      damping: 14,
    },
  },
};

interface LanguageSwitcherProps {
  lang: Lang;
  onSelect: (lang: Lang) => void;
  label: string;
  compact?: boolean;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ lang, onSelect, label, compact = false }) => {
  const languageOptions: Lang[] = ['en', 'fr', 'ar'];
  return (
    <div
      className={cn(
        'items-center rounded-full border border-slate-200 dark:border-white/15 bg-slate-100/90 dark:bg-white/5 p-1',
        compact ? 'flex' : 'hidden sm:flex'
      )}
      role="group"
      aria-label={label}
    >
      {languageOptions.map((code) => (
        <button
          key={code}
          onClick={() => onSelect(code)}
          className={cn(
            'px-2.5 py-1.5 min-h-[36px] rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-300 active:scale-90',
            compact && 'min-w-[38px] px-2.5 py-1.5 min-h-[36px] text-[10px] sm:text-xs',
            lang === code
              ? 'bg-accent text-white dark:text-black shadow-sm'
              : 'text-slate-500 dark:text-white/50 hover:text-slate-800 dark:hover:text-white'
          )}
          aria-pressed={lang === code}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export const Navigation: React.FC<NavigationProps> = ({
  onOpenBrief,
  theme,
  onToggleTheme,
  compact = false,
}) => {
  const { lang, setLang, t } = useLanguage();
  const isCoarse = useCoarsePointer();
  const tier = useDeviceTier();
  const reduceMotion = useReducedMotion();

  const navItemVariants = isCoarse || tier === 'low' ? navItemFlatVariants : navItemBlurVariants;

  const navLinks = [
    { name: t('nav.work'), href: '#work' },
    { name: t('nav.voice'), href: '#voice' },
    { name: t('nav.process'), href: '#process' },
    { name: t('nav.origin'), href: '#about' },
  ];

  if (compact) {
    return (
      <nav className="relative z-20 px-3 sm:px-6 pt-[calc(env(safe-area-inset-top,0px)+0.75rem)]">
        {/* Two-tier glass bar — never tight on phones. Tier 1 centers the full
            stacked lockup (mark + wordmark) at every width; tier 2 puts the
            theme + language switchers on the left and Start Project on the
            right, with comfortable 44px touch targets and breathing room. */}
        <div className="rounded-[28px] bg-[var(--card-bg)]/90 backdrop-blur-xl border border-[var(--border-color)] px-4 sm:px-6 py-3 shadow-md dark:shadow-none transition-colors duration-300">
          {/* Tier 1 — vertically stacked brand lockup, dead-center */}
          <div className="flex justify-center">
            <a
              href="#"
              aria-label="Hydra Samo — Home"
              className="flex flex-col items-center gap-0.5 group py-0.5"
            >
              <HydraLogo className="h-7 w-7 sm:h-8 sm:w-8 text-accent transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(16,185,129,0.6)]" />
              <span className="font-display font-bold tracking-[0.22em] text-[10px] sm:text-[11px] uppercase text-[var(--text-main)] group-hover:text-accent transition-colors whitespace-nowrap">
                HYDRA SAMO
              </span>
            </a>
          </div>

          {/* Tier 2 — switchers left, Start Project right */}
          <div className="mt-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={onToggleTheme}
                className="relative p-2.5 min-w-[44px] min-h-[44px] rounded-full border border-slate-200 dark:border-white/15 bg-slate-100/90 dark:bg-white/5 text-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-all flex items-center justify-center shadow-sm dark:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--card-bg)]"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {theme === 'dark' ? (
                    <motion.span
                      key="sun"
                      initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                      animate={{ rotate: 0, opacity: 1, scale: 1 }}
                      exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="flex items-center justify-center"
                    >
                      <Sun size={18} className="text-accent" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="moon"
                      initial={{ rotate: 90, opacity: 0, scale: 0.6 }}
                      animate={{ rotate: 0, opacity: 1, scale: 1 }}
                      exit={{ rotate: -90, opacity: 0, scale: 0.6 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="flex items-center justify-center"
                    >
                      <Moon size={18} className="text-slate-800" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <LanguageSwitcher
                lang={lang}
                onSelect={setLang}
                label={t('lang.selectAria')}
                compact
              />
            </div>

            {/* Start Project */}
            <button
              onClick={onOpenBrief}
              className="flex items-center gap-1.5 px-4 sm:px-5 py-2.5 min-h-[44px] rounded-full bg-accent text-white hover:bg-accent-dark dark:bg-white/[0.05] dark:border-emerald-500/30 dark:text-white dark:hover:bg-white/10 text-xs font-semibold uppercase tracking-wider transition-all transform hover:scale-105 active:scale-95"
            >
              <span>{t('btn.startProject')}</span> <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed top-[calc(0.75rem+env(safe-area-inset-top,0px))] md:top-6 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-6xl">
      <div className="bg-[var(--card-bg)]/90 backdrop-blur-xl border border-[var(--border-color)] rounded-[24px] px-4 sm:px-6 py-3 flex items-center justify-between shadow-md dark:shadow-none transition-colors duration-300">
        
        {/* Brand lockup — full frozen mark beside the wordmark on desktop, stacked on mobile */}
        <a href="#" className="flex items-center group py-0.5">
          <span className="flex flex-col items-center md:flex-row md:items-center md:gap-2.5 min-h-[44px] justify-center">
            <span className="md:inline-block">
              <HydraLogo className="h-7 w-7 sm:h-8 sm:w-8 text-accent transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(16,185,129,0.6)]" />
            </span>
            <span className="flex flex-col items-center leading-none md:items-start">
              <span className="font-display font-bold tracking-[-0.02em] text-xs md:text-[15px] uppercase text-[var(--text-main)] group-hover:text-accent transition-colors">
                HYDRA SAMO
              </span>
            </span>
          </span>
        </a>

        {/* Desktop Links with Framer Motion Staggered Entrance */}
        <motion.div 
          variants={navContainerVariants}
          initial={reduceMotion ? false : 'hidden'}
          animate="visible"
          className="hidden md:flex items-center gap-6 lg:gap-8 text-xs sm:text-sm font-medium uppercase tracking-[0.15em] text-slate-600 dark:text-white/50"
        >
          {navLinks.map((link) => (
            <motion.a 
              key={link.name} 
              variants={navItemVariants}
              href={link.href} 
              className="hover:text-accent transition-colors relative py-2"
            >
              {link.name}
            </motion.a>
          ))}
        </motion.div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* Dark / Light Mode Toggle Button */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={onToggleTheme}
            className="relative p-2.5 min-w-[44px] min-h-[44px] rounded-full border border-slate-200 dark:border-white/15 bg-slate-100/90 dark:bg-white/5 text-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-all flex items-center justify-center shadow-sm dark:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--card-bg)]"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
                <AnimatePresence mode="wait">
                  {theme === 'dark' ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                      animate={{ rotate: 0, opacity: 1, scale: 1 }}
                      exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Sun size={18} className="text-accent" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0, scale: 0.6 }}
                      animate={{ rotate: 0, opacity: 1, scale: 1 }}
                      exit={{ rotate: -90, opacity: 0, scale: 0.6 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Moon size={18} className="text-slate-800" />
                    </motion.div>
                  )}
                </AnimatePresence>
          </motion.button>
          
          {/* Language Switcher */}
          <LanguageSwitcher
            lang={lang}
            onSelect={setLang}
            label={t('lang.selectAria')}
          />

          {/* Brief CTA Button */}
          <button 
            onClick={onOpenBrief}
            className="hidden sm:flex items-center gap-1.5 px-4 lg:px-5 py-2.5 min-h-[44px] rounded-full bg-accent text-white hover:bg-accent-dark dark:bg-white/[0.05] dark:border-emerald-500/30 dark:text-white dark:hover:bg-white/10 text-xs font-semibold uppercase tracking-wider transition-all transform hover:scale-105 active:scale-95"
          >
            <span>{t('btn.startProject')}</span> <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </nav>
  );
};
