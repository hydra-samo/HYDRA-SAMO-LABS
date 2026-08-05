import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Play, ArrowRight, Film } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { TiltCard } from './TiltCard';
import { useCoarsePointer } from '../hooks/useCoarsePointer';
import { useDeviceTier } from '../hooks/useDeviceTier';
import { cn } from '../lib/utils';

interface WorkGalleryProps {
  onSelectProject: (project: Project) => void;
  onOpenReel: () => void;
}

// Variants for staggered container and item reveal
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 16,
      mass: 0.8,
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.96,
    transition: { duration: 0.2 },
  },
};

export const ProjectCard: React.FC<{
  project: Project;
  index: number;
  onSelectProject: (project: Project) => void;
}> = ({ project, index, onSelectProject }) => {
  const [isInView, setIsInView] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const { t } = useLanguage();
  const isCoarse = useCoarsePointer();
  const tier = useDeviceTier();
  const reduceMotion = useReducedMotion();

  // The media entry blurs in on desktop but drops the filter on touch — the
  // fade/scale stays, so cards still feel alive on phones without the GPU cost.
  const cheapMotion = isCoarse || tier === 'low';
  const mediaInitial = cheapMotion ? { opacity: 0 } : { opacity: 0, filter: 'blur(8px)' };
  const mediaAnimate = cheapMotion ? { opacity: 1 } : { opacity: 1, filter: 'blur(0px)' };

  return (
    <motion.div
      initial={{ opacity: 0, y: 45, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.55,
        delay: (index % 2) * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={reduceMotion ? undefined : { scale: 1.02, y: -2 }}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      onViewportEnter={() => setIsInView(true)}
      className="group relative"
    >
      <TiltCard
        onClick={() => onSelectProject(project)}
        className="glass-card glass-hover relative h-full rounded-3xl overflow-hidden cursor-pointer"
      >
      {/* Thumbnail Container with viewport threshold detection */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-[var(--card-bg)]">
        <AnimatePresence mode="wait">
          {!isInView ? (
            /* Skeleton Placeholder prior to viewport proximity */
            <motion.div
              key="skeleton"
              initial={{ opacity: 0.6 }}
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-100 dark:bg-[var(--card-bg)] flex flex-col items-center justify-center gap-2 p-6"
            >
              <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-white/5 border border-slate-300 dark:border-white/10 flex items-center justify-center">
                <Film size={16} className="text-accent/50" />
              </div>
              <span className="text-xs text-slate-400 dark:text-white/30 uppercase tracking-widest font-medium">
                {t('work.streaming')}
              </span>
            </motion.div>
          ) : (
            /* Content rendered once threshold met */
            <motion.div
              key="media-content"
              initial={mediaInitial}
              animate={mediaAnimate}
              transition={{ duration: 0.5 }}
              className="w-full h-full relative"
            >
              {/* High-res image */}
              <img
                src={project.thumbnail}
                alt={project.title}
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                onLoad={() => setImageLoaded(true)}
                className={cn(
                  'w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-active:scale-105 transform-gpu will-change-transform filter grayscale-[15%] group-hover:grayscale-0',
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                )}
              />

              {!imageLoaded && (
                <div className="absolute inset-0 bg-slate-200 dark:bg-[var(--card-bg)] animate-pulse" />
              )}

              {/* Dark Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 dark:from-surface via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />

              {/* Top Badge Info */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <span className="px-3 py-1 rounded-full bg-slate-900/80 dark:bg-[var(--card-bg)]/80 backdrop-blur-md border border-white/10 text-xs text-accent font-medium uppercase tracking-widest">
                  {project.tag}
                </span>
                <span className="px-2.5 py-1 rounded-md bg-black/60 text-xs font-mono text-white/90">
                  {project.year}
                </span>
              </div>

              {/* Hover / Tap Play View Center Trigger */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 z-20">
                <div className="w-16 h-16 rounded-full bg-accent text-white hover:bg-accent-dark dark:bg-white/[0.05] dark:border-emerald-500/30 dark:text-white dark:hover:bg-white/10 flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 group-active:scale-100 transition-transform duration-300">
                  <Play size={24} className="fill-current text-accent ml-1" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Card Footer Info */}
      <div className="p-6 relative z-10">
        <div className="flex items-center justify-between text-xs sm:text-sm font-mono text-slate-500 dark:text-white/50 mb-2">
          <span>{t('work.client')} {project.client.toUpperCase()}</span>
          <span className="text-accent font-semibold">{t('work.caseStudy')}</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-display font-medium tracking-tight text-[var(--text-main)] group-hover:text-accent transition-colors mb-2 uppercase">
          {project.title}
        </h3>

        <p className="text-sm sm:text-base text-[var(--text-muted)] line-clamp-2 mb-4 leading-relaxed">
          {project.description}
        </p>

        {/* Software Stack Pills */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-200 dark:border-white/10">
          <div className="flex flex-wrap gap-1.5">
            {project.softwareStack.map((sw) => (
              <span
                key={sw}
                className="text-xs sm:text-sm font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-white/60 border border-slate-200 dark:border-transparent"
              >
                {sw}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-1 text-xs font-semibold text-accent transition-colors">
            <span>{t('work.inspect')}</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
        </div>
      </TiltCard>
    </motion.div>
  );
};

export const WorkGallery: React.FC<WorkGalleryProps> = ({ onSelectProject, onOpenReel }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'video' | 'motion' | 'direction'>('all');

  const { t } = useLanguage();

  const filteredProjects = PROJECTS.filter((p) => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  return (
    <section id="work" className="py-16 sm:py-24 px-4 sm:px-6 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight uppercase font-display text-[var(--text-main)]">
              {t('work.selected')} <span className="text-accent">{t('work.works')}</span>
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 glass-card p-1.5 rounded-2xl">
            {[
              { id: 'all', label: t('work.cat.all') },
              { id: 'video', label: t('work.cat.video') },
              { id: 'motion', label: t('work.cat.motion') },
              { id: 'direction', label: t('work.cat.direction') },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={cn(
                  'px-4 py-2.5 min-h-[44px] rounded-xl text-sm font-semibold uppercase tracking-wider transition-all flex items-center',
                  activeCategory === cat.id
                    ? 'bg-accent text-black shadow-sm'
                    : 'text-slate-700 dark:text-white/60 hover:text-slate-950 dark:hover:text-white hover:bg-slate-300/50 dark:hover:bg-white/5'
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid with Staggered Container & Viewport Threshold Lazy Loading */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {filteredProjects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={idx}
                onSelectProject={onSelectProject}
              />
            ))}

            {filteredProjects.length === 0 && (
              <div className="md:col-span-2 p-12 sm:p-16 glass-card rounded-3xl text-center flex flex-col items-center gap-4">
                <span className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-accent/15 text-accent flex items-center justify-center">
                  <Film size={22} />
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-medium text-[var(--text-main)] uppercase">
                  {t('work.emptyTitle')}
                </h3>
                <p className="max-w-md text-sm text-slate-600 dark:text-white/60 leading-relaxed font-normal">
                  {t('work.emptyDesc')}
                </p>
                <button
                  onClick={onOpenReel}
                  className="mt-2 px-6 py-3.5 min-h-[44px] bg-accent text-white hover:bg-accent-dark dark:bg-white/[0.05] dark:border-emerald-500/30 dark:text-white dark:hover:bg-white/10 font-semibold text-xs uppercase tracking-wider rounded-full transition-all flex items-center gap-2.5"
                >
                  <Play size={14} className="fill-current" /> {t('btn.watchMasterShowreel')}
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
