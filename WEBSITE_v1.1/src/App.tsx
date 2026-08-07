import React, { Suspense, useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { Navigation } from './components/Navigation';
import { MobileDock, type SlideKey } from './components/MobileDock';
import { Hero } from './components/Hero';
import { WorkGallery } from './components/WorkGallery';
import { VoiceOverSection } from './components/VoiceOverSection';
import { ProcessSection } from './components/ProcessSection';
import { AboutSection } from './components/AboutSection';
import { LoadingSplash } from './components/LoadingSplash';
import { PreSplashSelector } from './components/PreSplashSelector';
import { AmbientBackground } from './components/AmbientBackground';
import { Project } from './types';
import { useOpenGraph } from './hooks/useOpenGraph';
import { useLenis } from './hooks/useLenis';
import { useCoarsePointer } from './hooks/useCoarsePointer';
import { useDeviceTier } from './hooks/useDeviceTier';
import { useLanguage } from './i18n/LanguageContext';
import { cn } from './lib/utils';

const VideoModal = React.lazy(() =>
  import('./components/VideoModal').then((m) => ({ default: m.VideoModal }))
);
const ContactSection = React.lazy(() =>
  import('./components/ContactSection').then((m) => ({ default: m.ContactSection }))
);

const ModalFallback = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 dark:bg-black/95 backdrop-blur-2xl">
    <div className="w-12 h-12 rounded-full border-2 border-accent border-t-transparent animate-spin" />
  </div>
);

/**
 * Slide wrapper used for every section. Below md the sections behave as
 * full-viewport slides — only the active one is visible and fades in (the
 * bottom dock navigates, no scrolling); each slide still scrolls internally
 * as a safety fallback. md+ the wrapper is inert (height auto, overflow
 * visible) so the desktop flow stays exactly as it was.
 */
function MobileSlide({ slideKey, active, children }: {
  slideKey: SlideKey;
  active: SlideKey;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (active === slideKey) {
      ref.current?.scrollTo({ top: 0 });
    }
  }, [active, slideKey]);

  return (
    <div
      ref={ref}
      className={cn(
        'mobile-slide',
        active === slideKey ? 'block mobile-slide-enter' : 'hidden md:block'
      )}
    >
      {children}
    </div>
  );
}

export default function App() {
  const { t } = useLanguage();
  const isCoarse = useCoarsePointer();
  const tier = useDeviceTier();
  const cheapMotion = isCoarse || tier === 'low';

  const lenisRef = useLenis();

  const [showPreSplash, setShowPreSplash] = useState(true);
  const [showSplash, setShowSplash] = useState(false);

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('hydra-theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return 'dark';
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isOpenReelModal, setIsOpenReelModal] = useState<boolean>(false);
  const [isOpenBriefModal, setIsOpenBriefModal] = useState<boolean>(false);
  const [isExiting, setIsExiting] = useState<boolean>(false);

  // Mobile-only slideshow state — the dock fades between sections instead of
  // scrolling. Ignored by the desktop layout (all slides always visible).
  const [activeSlide, setActiveSlide] = useState<SlideKey>('home');

  const pendingNavRef = useRef<{ url: string; newTab: boolean } | null>(null);

  // Holds the theme that was last applied to <html>, so the switch animations
  // only ever run for a real change, never the first paint (the stored theme
  // is applied instantly).
  const appliedThemeRef = useRef(theme);

  useOpenGraph(
    selectedProject
      ? {
          title: `${selectedProject.title} | HYDRA SAMO Case Study`,
          description: selectedProject.description,
          image: selectedProject.thumbnail,
        }
      : undefined
  );

  // Centralized theme flip. Flips the classes synchronously (so the browser
  // captures the new paint), then animates through the best available path:
  //
  //  1. View Transitions API — the browser snapshots both themes and
  //     crossfades the whole page on the compositor: one cheap animation
  //     instead of transitioning every element's colors on the main thread,
  //     so it stays smooth on low-end phones too.
  //  2. `.theme-transition` fallback — the slimmed class-based crossfade for
  //     browsers without View Transitions support.
  //
  // While either path runs, CSS transitions are suppressed (`vt-theme-flip` /
  // `.theme-transition` in index.css) so the browser never animates thousands
  // of nodes underneath the animation layer.
  const vtGuardCountRef = useRef(0);

  const applyTheme = useCallback((next: 'dark' | 'light') => {
    const root = document.documentElement;
    const isToggle = appliedThemeRef.current !== next;

    const flip = () => {
      root.classList.toggle('dark', next === 'dark');
      root.classList.toggle('light', next === 'light');
      localStorage.setItem('hydra-theme', next);
      appliedThemeRef.current = next;
    };

    if (isToggle) {
      const vtDoc = document as Document & {
        startViewTransition?: (update: () => void) => { finished?: Promise<void> };
      };

      if (typeof vtDoc.startViewTransition === 'function') {
        vtGuardCountRef.current += 1;
        root.classList.add('vt-theme-flip');
        const vt = vtDoc.startViewTransition(flip);
        const releaseGuard = () => {
          vtGuardCountRef.current -= 1;
          if (vtGuardCountRef.current === 0) root.classList.remove('vt-theme-flip');
        };
        if (vt.finished) {
          vt.finished.then(releaseGuard, releaseGuard);
        } else {
          window.setTimeout(releaseGuard, 500);
        }
      } else {
        root.classList.add('theme-transition');
        flip();
        window.setTimeout(() => root.classList.remove('theme-transition'), 450);
      }
    } else {
      flip();
    }

    setTheme(next);
  }, []);

  // Keep the <html> classes in sync with state — covers the initial paint and
  // any state-driven change. All animations live in `applyTheme`, never here.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.classList.toggle('light', theme === 'light');
    appliedThemeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const isOverlayOpen = Boolean(
      showPreSplash || showSplash || selectedProject || isOpenReelModal || isOpenBriefModal
    );

    if (isOverlayOpen) {
      document.body.style.overflow = 'hidden';
      lenisRef.current?.stop();
    } else {
      document.body.style.overflow = '';
      lenisRef.current?.start();
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [showPreSplash, showSplash, selectedProject, isOpenReelModal, isOpenBriefModal, lenisRef]);

  const handleToggleTheme = useCallback(() => {
    applyTheme(appliedThemeRef.current === 'dark' ? 'light' : 'dark');
  }, [applyTheme]);

  const handleSelectProject = useCallback((proj: Project) => setSelectedProject(proj), []);

  const handleOpenReel = useCallback(() => setIsOpenReelModal(true), []);

  const handleOpenBrief = useCallback(() => setIsOpenBriefModal(true), []);

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href || href.startsWith('#') || href === 'javascript:void(0)') return;

      const isExternal =
        href.startsWith('http://') ||
        href.startsWith('https://') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        anchor.target === '_blank';

      if (isExternal && !isExiting) {
        e.preventDefault();

        const openInNewTab =
          anchor.target === '_blank' && !href.startsWith('mailto:') && !href.startsWith('tel:');

        pendingNavRef.current = { url: href, newTab: openInNewTab };
        setIsExiting(true);

        setTimeout(() => {
          if (openInNewTab) {
            window.open(href, '_blank', 'noopener,noreferrer');
            pendingNavRef.current = null;
            setIsExiting(false);
          } else {
            window.location.href = href;
          }
        }, 550);
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, [isExiting]);

  const handleExitComplete = () => {
    const pending = pendingNavRef.current;
    if (!pending) return;

    if (pending.newTab) {
      pendingNavRef.current = null;
      setIsExiting(false);
    } else if (!pending.url.startsWith('mailto:') && !pending.url.startsWith('tel:')) {
      window.location.href = pending.url;
    }
  };

  return (
    <MotionConfig reducedMotion={cheapMotion ? 'always' : 'user'}>
      <AmbientBackground />
      <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
        {showPreSplash ? (
          <PreSplashSelector
            key="pre-splash"
            theme={theme}
            onSelectTheme={applyTheme}
            onComplete={() => {
              setShowPreSplash(false);
              setShowSplash(true);
            }}
          />
        ) : showSplash ? (
          <LoadingSplash
            key="loading-splash"
            onComplete={() => setShowSplash(false)}
          />
        ) : !isExiting ? (
          <motion.div
            key="portfolio-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              y: -25,
              ...(cheapMotion ? {} : { scale: 0.98, filter: 'blur(12px)' }),
              transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
            }}
            className="text-[var(--text-main)] min-h-screen font-sans selection:bg-accent selection:text-black relative transition-colors duration-300"
          >
            {/* Desktop / tablet floating nav — unchanged, hidden on mobile */}
            <div className="hidden md:block">
              <Navigation
                onOpenBrief={handleOpenBrief}
                theme={theme}
                onToggleTheme={handleToggleTheme}
              />
            </div>

            {/* Single section stack. md+: normal scroll flow (desktop intact).
                <md: full-viewport slides — the bottom dock fades between them. */}
            <MobileSlide slideKey="home" active={activeSlide}>
              <div className="md:hidden">
                <Navigation
                  compact
                  onOpenBrief={handleOpenBrief}
                  theme={theme}
                  onToggleTheme={handleToggleTheme}
                />
              </div>
              <Hero />
            </MobileSlide>

            <MobileSlide slideKey="work" active={activeSlide}>
              <WorkGallery
                onSelectProject={handleSelectProject}
                onOpenReel={handleOpenReel}
              />
            </MobileSlide>

            <MobileSlide slideKey="voice" active={activeSlide}>
              <VoiceOverSection />
            </MobileSlide>

            <MobileSlide slideKey="process" active={activeSlide}>
              <ProcessSection />
            </MobileSlide>

            <MobileSlide slideKey="about" active={activeSlide}>
              <AboutSection />
            </MobileSlide>

            <MobileDock active={activeSlide} onSelect={setActiveSlide} />

            <Suspense fallback={<ModalFallback />}>
              {(selectedProject || isOpenReelModal) && (
                <VideoModal
                  project={selectedProject}
                  isOpenReel={isOpenReelModal}
                  onClose={() => {
                    setSelectedProject(null);
                    setIsOpenReelModal(false);
                  }}
                  onOpenBrief={() => {
                    setSelectedProject(null);
                    setIsOpenReelModal(false);
                    setIsOpenBriefModal(true);
                  }}
                />
              )}

              {isOpenBriefModal && (
                <ContactSection onCloseModal={() => setIsOpenBriefModal(false)} />
              )}
            </Suspense>
          </motion.div>
        ) : (
          <motion.div
            key="exit-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-[var(--bg-canvas)] text-[var(--text-main)] flex flex-col items-center justify-center gap-4 text-center p-6"
          >
            <div className="w-12 h-12 rounded-full border-2 border-accent border-t-transparent animate-spin" />
            <span className="text-xs uppercase tracking-widest text-accent font-medium">
              {t('app.redirecting')}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
