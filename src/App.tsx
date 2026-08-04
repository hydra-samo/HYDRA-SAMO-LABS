import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { WorkGallery } from './components/WorkGallery';
import { VoiceOverSection } from './components/VoiceOverSection';
import { ProcessSection } from './components/ProcessSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { VideoModal } from './components/VideoModal';
import { PlymouthSplash } from './components/PlymouthSplash';
import { AmbientBackground } from './components/AmbientBackground';
import { Project } from './types';
import { useOpenGraph } from './hooks/useOpenGraph';
import { useLenis } from './hooks/useLenis';
import { useLanguage } from './i18n/LanguageContext';

export default function App() {
  const { t } = useLanguage();

  // Global weightless smooth-scroll (skips itself for reduced-motion users)
  const lenisRef = useLenis();

  const [showSplash, setShowSplash] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    // Only show the intro once per browser session — repeat visits (and
    // anyone re-checking the link) skip straight to the real content.
    return sessionStorage.getItem('hydra-splash-seen') !== 'true';
  });
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('hydra-theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return 'dark'; // default dark luxury
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isOpenReelModal, setIsOpenReelModal] = useState<boolean>(false);
  const [isOpenBriefModal, setIsOpenBriefModal] = useState<boolean>(false);
  const [isExiting, setIsExiting] = useState<boolean>(false);

  // Tracks pending external-link redirects so the page-out overlay knows
  // whether to navigate the current tab or (for target="_blank") restore it.
  const pendingNavRef = useRef<{ url: string; newTab: boolean } | null>(null);

  // Dynamically inject Open Graph meta tags from metadata.json (and project case study overrides)
  useOpenGraph(
    selectedProject
      ? {
          title: `${selectedProject.title} | HYDRA SAMO Case Study`,
          description: selectedProject.description,
          image: selectedProject.thumbnail,
        }
      : undefined
  );

  // Sync theme class to document element and localStorage
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

  // Lock the background (both native scroll and the Lenis smooth-scroll
  // layer) whenever the video/case-study modal or the brief modal is open —
  // otherwise the page behind the overlay keeps scrolling underneath it.
  useEffect(() => {
    const isModalOpen = Boolean(selectedProject || isOpenReelModal || isOpenBriefModal);

    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      lenisRef.current?.stop();
    } else {
      document.body.style.overflow = '';
      lenisRef.current?.start();
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject, isOpenReelModal, isOpenBriefModal, lenisRef]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Intercept external link navigation to trigger page-out animation before redirecting
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

        // Backup safety timer to execute redirection after the exit transition
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
      // The new tab was already opened by the backup timer — restore the page.
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
      {showSplash ? (
        <PlymouthSplash
          onComplete={() => {
            sessionStorage.setItem('hydra-splash-seen', 'true');
            setShowSplash(false);
          }}
        />
      ) : !isExiting ? (
        <motion.div
          key="portfolio-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: -25,
            scale: 0.98,
            filter: 'blur(12px)',
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
          }}
          className="text-[var(--text-main)] min-h-screen font-sans selection:bg-accent selection:text-black relative transition-colors duration-300"
        >
          {/* Floating Header */}
          <Navigation
            onOpenBrief={() => setIsOpenBriefModal(true)}
            onOpenReel={() => setIsOpenReelModal(true)}
            theme={theme}
            onToggleTheme={handleToggleTheme}
          />

          {/* Hero Section */}
          <Hero
            onOpenReel={() => setIsOpenReelModal(true)}
            onOpenBrief={() => setIsOpenBriefModal(true)}
          />

          {/* Selected Works Gallery */}
          <WorkGallery
            onSelectProject={(proj) => setSelectedProject(proj)}
            onOpenReel={() => setIsOpenReelModal(true)}
          />

          {/* Voice-Over Section */}
          <VoiceOverSection
            onOpenBrief={() => setIsOpenBriefModal(true)}
          />

          {/* Workflow & Agency Comparison */}
          <ProcessSection />

          {/* About & Origin Story */}
          <AboutSection />

          {/* Contact & Brief Constructor */}
          <ContactSection />

          {/* Video & Case Study Lightbox Modal */}
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

          {/* Floating Brief Builder Modal */}
          {isOpenBriefModal && (
            <ContactSection
              isOpenModal={true}
              onCloseModal={() => setIsOpenBriefModal(false)}
            />
          )}
        </motion.div>
      ) : (
        /* Page Exit Transition Overlay */
        <motion.div
          key="exit-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] bg-[var(--bg-canvas)] text-[var(--text-main)] flex flex-col items-center justify-center gap-4 text-center p-6"
        >
          <div className="w-12 h-12 rounded-full border-2 border-accent border-t-transparent animate-spin" />
          <span className="text-xs font-mono uppercase tracking-widest text-accent font-bold">
            {t('app.redirecting')}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}

