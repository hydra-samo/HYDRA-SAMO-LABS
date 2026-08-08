import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, Volume2, VolumeX, CheckCircle2, ArrowRight } from 'lucide-react';
import { Project } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { cn } from '../lib/utils';

interface VideoModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenBrief: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  project,
  onClose,
  onOpenBrief,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState<'video' | 'grading' | 'brief'>('video');
  const [gradingProgress, setGradingProgress] = useState(50);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const { t } = useLanguage();

  if (!project) return null;

  const sampleVideo = project.videoUrl || '';
  const modalTitle = project.title;
  const clientName = project.client;

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 dark:bg-black/95 backdrop-blur-2xl overflow-y-auto" data-lenis-prevent role="dialog" aria-modal="true" aria-label={modalTitle}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative bg-[var(--bg-canvas)] border border-[var(--border-color)] rounded-3xl w-full max-w-5xl overflow-hidden shadow-xl dark:shadow-[0_30px_90px_-35px_rgba(16,185,129,0.35)] my-auto max-h-[92vh] flex flex-col"
        >
          {/* Header Bar */}
          <div className="p-5 sm:p-6 border-b border-[var(--border-color)] flex items-center justify-between bg-[var(--card-bg)]">
            <div>
              <span className="text-xs text-accent uppercase tracking-widest block mb-1 font-medium">
                {clientName}
              </span>
              <h3 className="text-xl sm:text-2xl font-medium text-[var(--text-main)] uppercase font-display">
                {modalTitle}
              </h3>
            </div>

            <div className="flex items-center gap-3">
              {project?.beforeGradeImg && project?.afterGradeImg && (
                <div className="flex bg-slate-200 dark:bg-[var(--card-bg)] p-1 rounded-xl border border-[var(--border-color)] text-xs">
                  <button
                    onClick={() => setActiveTab('video')}
                    className={cn(
                      'px-3 py-1 rounded-lg transition-all',
                      activeTab === 'video' ? 'bg-accent text-black font-semibold' : 'text-slate-700 dark:text-white/60'
                    )}
                  >
                    {t('modal.video')}
                  </button>
                  <button
                    onClick={() => setActiveTab('grading')}
                    className={cn(
                      'px-3 py-1 rounded-lg transition-all',
                      activeTab === 'grading' ? 'bg-accent text-black font-semibold' : 'text-slate-700 dark:text-white/60'
                    )}
                  >
                    {t('modal.grading')}
                  </button>
                </div>
              )}

              <button
                onClick={onClose}
                aria-label={t('modal.close')}
                className="p-2.5 min-w-[44px] min-h-[44px] rounded-full bg-slate-200 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-700 dark:text-white/70 hover:text-slate-950 dark:hover:text-white flex items-center justify-center"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 overflow-y-auto flex-1 space-y-6" data-lenis-prevent>
            
            {activeTab === 'video' ? (
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-white/10 group">
                <video
                  ref={videoRef}
                  src={sampleVideo}
                  autoPlay
                  loop
                  playsInline
                  muted={isMuted}
                  className="w-full h-full object-cover"
                />

                {/* Custom Overlay Player Controls */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={togglePlay}
                    aria-label={isPlaying ? t('modal.pause') : t('modal.play')}
                    className="p-2.5 rounded-full bg-accent text-white hover:bg-accent-dark dark:bg-white/[0.05] dark:border-emerald-500/30 dark:text-white dark:hover:bg-white/10 hover:scale-105 transition-transform"
                  >
                    {isPlaying ? <Pause size={18} className="text-accent" /> : <Play size={18} className="text-accent" />}
                  </button>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={toggleMute}
                      aria-label={isMuted ? t('modal.unmute') : t('modal.mute')}
                      className="p-2 rounded-lg bg-black/60 text-white/80 hover:text-white"
                    >
                      {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Before / After Color Grade Comparison Slider */
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10 select-none">
                {/* After Image */}
                <img
                  src={project?.afterGradeImg}
                  alt={t('modal.grade')}
                  referrerPolicy="no-referrer"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Before Image clipped */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${gradingProgress}%` }}
                >
                  <img
                    src={project?.beforeGradeImg}
                    alt={t('modal.raw')}
                    referrerPolicy="no-referrer"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover max-w-none"
                    style={{ width: '100%' }}
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-black/80 text-white text-xs font-mono rounded">
                    {t('modal.raw')}
                  </span>
                </div>

                <span className="absolute top-4 right-4 px-3 py-1 bg-accent/20 text-accent border border-accent/40 text-xs font-mono rounded font-semibold backdrop-blur-sm">
                  {t('modal.grade')}
                </span>

                {/* Interactive Slider Input */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={gradingProgress}
                  onChange={(e) => setGradingProgress(Number(e.target.value))}
                  aria-label={t('modal.grading')}
                  className="absolute inset-x-0 bottom-6 mx-auto w-3/4 accent-accent cursor-pointer"
                />
              </div>
            )}

            {/* Case Study Details */}
            {project && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4 border-t border-slate-200 dark:border-white/10">
                <div className="lg:col-span-2 space-y-4">
                  <h4 className="text-sm font-display text-accent uppercase tracking-wider font-medium">
                    {t('modal.brief')}
                  </h4>
                  <p className="text-sm text-slate-700 dark:text-white/80 leading-relaxed font-normal">
                    {project.clientBrief || project.description}
                  </p>

                  {project.metrics && (
                    <div className="grid grid-cols-3 gap-3 pt-2">
                      {project.metrics.map((m) => (
                        <div key={m.label} className="p-3 bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)]">
                          <span className="text-xl font-semibold text-accent block">{m.value}</span>
                          <span className="text-xs font-mono text-slate-500 dark:text-white/50">{m.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-4 bg-[var(--card-bg)] p-5 rounded-2xl border border-[var(--border-color)]">
                  <div>
                    <span className="text-xs text-slate-500 dark:text-white/50 uppercase block mb-1 font-medium">
                      {t('modal.software')}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.softwareStack.map((s) => (
                        <span key={s} className="text-xs font-mono px-2.5 py-1 rounded bg-slate-200/80 dark:bg-white/5 text-emerald-800 dark:text-accent font-semibold">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {project.deliverables && (
                    <div>
                      <span className="text-xs text-slate-500 dark:text-white/50 uppercase block mb-1 font-medium">
                        {t('modal.deliverables')}
                      </span>
                      <ul className="space-y-1 text-xs text-slate-700 dark:text-white/70">
                        {project.deliverables.map((d) => (
                          <li key={d} className="flex items-center gap-1.5">
                            <CheckCircle2 size={12} className="text-accent shrink-0" /> {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      onClose();
                      onOpenBrief();
                    }}
                    className="w-full mt-4 py-3 min-h-[44px] bg-accent text-white hover:bg-accent-dark dark:bg-white/[0.05] dark:border-emerald-500/30 dark:text-white dark:hover:bg-white/10 font-semibold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <span>{t('btn.requestSimilar')}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
