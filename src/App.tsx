import React, { Suspense, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation } from './components/Navigation';
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

  const pendingNavRef = useRef<{ url: string; newTab: boolean } | null>(null);

  useOpenGraph(
    selectedProject
      ? {
          title: `${selectedProject.title} | HYDRA SAMO Case Study`,
          description: selectedProject.description,
          image: selectedProject.thumbnail,
        }
      : undefined
  );

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('hydra-theme', theme);
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

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

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
    <>
      <AmbientBackground />
      <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
        {showPreSplash ? (
          <PreSplashSelector
            key="pre-splash"
            theme={theme}
            onSelectTheme={setTheme}
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
            <Navigation
              onOpenBrief={() => setIsOpenBriefModal(true)}
              theme={theme}
              onToggleTheme={handleToggleTheme}
            />

            <Hero />

            <WorkGallery
              onSelectProject={(proj) => setSelectedProject(proj)}
              onOpenReel={() => setIsOpenReelModal(true)}
            />

            <VoiceOverSection />

            <ProcessSection />

            <AboutSection />

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
    </>
  );
}
