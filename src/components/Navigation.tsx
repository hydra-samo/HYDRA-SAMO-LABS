import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Menu, X, ArrowUpRight, Zap, Sun, Moon } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { Lang } from '../i18n/translations';
import { cn } from '../lib/utils';

interface NavigationProps {
  onOpenBrief: () => void;
  onOpenReel: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
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

const navItemVariants: Variants = {
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
            'px-2.5 py-1.5 min-h-[36px] rounded-full text-[10px] font-semibold uppercase tracking-widest transition-all',
            lang === code
              ? 'bg-accent text-black shadow-sm'
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
  onOpenReel,
  theme,
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { lang, setLang, t } = useLanguage();

  const navLinks = [
    { name: t('nav.work'), href: '#work' },
    { name: t('nav.voice'), href: '#voice' },
    { name: t('nav.process'), href: '#process' },
    { name: t('nav.origin'), href: '#about' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  const languageOptions: Lang[] = ['en', 'fr', 'ar'];

  return (
    <nav className="fixed top-3 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-6xl">
      <div className="bg-[var(--card-bg)]/90 backdrop-blur-xl border border-[var(--border-color)] rounded-[24px] px-4 sm:px-6 py-3 flex items-center justify-between shadow-md dark:shadow-none transition-colors duration-300">
        
        {/* Brand wordmark */}
        <a href="#" className="flex items-center min-h-[44px] group">
          <div className="flex flex-col">
            <span className="font-semibold tracking-tight text-xs sm:text-sm uppercase text-[var(--text-main)] group-hover:text-accent transition-colors leading-tight">
              HYDRA SAMO
            </span>
            <span className="text-[10px] font-mono tracking-widest text-accent uppercase leading-none font-medium mt-0.5">
              {t('brand.tagline')}
            </span>
          </div>
        </a>

        {/* Desktop Links with Framer Motion Staggered Entrance */}
        <motion.div 
          variants={navContainerVariants}
          initial="hidden"
          animate="visible"
          className="hidden md:flex items-center gap-6 lg:gap-8 text-[11px] font-medium uppercase tracking-[0.15em] text-slate-600 dark:text-white/50"
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
          {/* Location Status Badge */}
          <span className="hidden xl:inline-block font-mono text-[10px] uppercase tracking-widest text-accent font-medium mr-1">
            {t('badge.location')}
          </span>

          {/* Dark / Light Mode Toggle Button */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={onToggleTheme}
            className="relative p-2.5 min-w-[44px] min-h-[44px] rounded-full border border-slate-200 dark:border-white/15 bg-slate-100/90 dark:bg-white/5 text-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-all flex items-center justify-center shadow-sm dark:shadow-none focus:outline-none"
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
                  transition={{ duration: 0.2 }}
                >
                  <Sun size={18} className="text-accent" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, opacity: 0, scale: 0.6 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -90, opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.2 }}
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

          {/* Desktop Brief CTA Button */}
          <button 
            onClick={onOpenBrief}
            className="hidden sm:flex items-center gap-1.5 px-4 lg:px-5 py-2.5 min-h-[44px] rounded-full bg-accent text-white hover:bg-accent-dark dark:bg-white/[0.05] dark:border-emerald-500/30 dark:text-white dark:hover:bg-white/10 text-xs font-semibold uppercase tracking-wider transition-all transform hover:scale-105 active:scale-95"
          >
            <span>{t('btn.startProject')}</span> <ArrowUpRight size={14} />
          </button>

          {/* Mobile Hamburger Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center text-slate-800 dark:text-white/80 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: { opacity: 0, y: -10, scale: 0.98 },
              visible: { 
                opacity: 1, 
                y: 0, 
                scale: 1,
                transition: { staggerChildren: 0.06, delayChildren: 0.05 }
              }
            }}
            className="md:hidden mt-2.5 bg-[var(--card-bg)]/95 border border-[var(--border-color)] rounded-3xl p-6 shadow-2xl backdrop-blur-2xl transition-colors duration-300"
          >
            <div className="flex flex-col gap-4">
              {/* Language Selector in Drawer */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
                <span className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-white/50">
                  {t('lang.label')}
                </span>
                <LanguageSwitcher
                  lang={lang}
                  onSelect={setLang}
                  label={t('lang.selectAria')}
                  compact
                />
              </div>

              {/* Theme Selector Pill in Drawer */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
                <span className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-white/50">
                  {t('theme.interfaceTheme')}
                </span>
                <button
                  onClick={onToggleTheme}
                  className="px-4 py-2 rounded-full border border-slate-200 dark:border-white/15 bg-slate-100 dark:bg-white/5 text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-white flex items-center gap-2 min-h-[44px]"
                >
                  {theme === 'dark' ? (
                    <>
                      <Moon size={15} className="text-accent" />
                      <span>{t('theme.darkMode')}</span>
                    </>
                  ) : (
                    <>
                      <Sun size={15} className="text-accent" />
                      <span>{t('theme.lightMode')}</span>
                    </>
                  )}
                </button>
              </div>

              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  variants={{
                    hidden: { opacity: 0, x: -12 },
                    visible: { opacity: 1, x: 0 }
                  }}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold tracking-tight text-[var(--text-main)] hover:text-accent transition-colors py-2.5 border-b border-slate-100 dark:border-white/5 flex items-center justify-between min-h-[44px]"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight size={16} className="text-slate-400 dark:text-white/40" />
                </motion.a>
              ))}

              <div className="pt-2 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenReel();
                  }}
                  className="w-full py-3.5 min-h-[44px] bg-accent text-white hover:bg-accent-dark dark:bg-white/[0.05] dark:border-emerald-500/30 dark:text-white dark:hover:bg-white/10 font-semibold text-xs uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2"
                >
                  <Zap size={14} className="text-accent" /> {t('btn.watchShowreel')}
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBrief();
                  }}
                  className="w-full py-3.5 min-h-[44px] bg-accent text-white hover:bg-accent-dark dark:bg-white/[0.05] dark:border-emerald-500/30 dark:text-white dark:hover:bg-white/10 font-semibold text-xs uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2"
                >
                  {t('btn.startProjectShort')} <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
