import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Mic, MicOff, FileText } from 'lucide-react';
import { VOICE_TRACKS } from '../data/portfolioData';
import { VoiceTrack } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { localizeVoiceTracks } from '../i18n/translations';
import { cn } from '../lib/utils';

interface VoiceOverSectionProps {
  onOpenBrief: () => void;
}

const formatTime = (totalSeconds: number) => {
  const mins = Math.floor(totalSeconds / 60);
  const secs = Math.floor(totalSeconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const VoiceOverSection: React.FC<VoiceOverSectionProps> = ({ onOpenBrief }) => {
  const { lang, t } = useLanguage();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeTrack, setActiveTrack] = useState<VoiceTrack>(VOICE_TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showScript, setShowScript] = useState<boolean>(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isFirstRender = useRef(true);

  const tracks = localizeVoiceTracks(VOICE_TRACKS, lang);
  const activeTrackLocal = tracks.find((track) => track.id === activeTrack.id) ?? activeTrack;

  const categories = ['All', 'Dramatic', 'Commercial', 'Tech & AI', 'Gaming & Character'];

  const categoryLabels: Record<string, string> = {
    All: t('voice.cat.all'),
    Dramatic: t('voice.cat.dramatic'),
    Commercial: t('voice.cat.commercial'),
    'Tech & AI': t('voice.cat.tech'),
    'Gaming & Character': t('voice.cat.gaming'),
  };

  const filteredTracks = tracks.filter((t) => {
    if (selectedCategory === 'All') return true;
    return t.category === selectedCategory;
  });

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    const list = cat === 'All' ? tracks : tracks.filter((t) => t.category === cat);
    if (!list.some((t) => t.id === activeTrack.id)) {
      setActiveTrack(list[0]);
    }
  };

  const hasAudio = Boolean(activeTrack.audioUrl);

  // Keep the real <audio> element's muted state in sync with the UI toggle
  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = isMuted;
  }, [isMuted]);

  // When the selected track changes, load the new source and (after the
  // initial mount) auto-play it — browsers block un-requested autoplay on
  // first load anyway, so we skip attempting that.
  useEffect(() => {
    setCurrentTime(0);
    if (!audioRef.current) return;
    audioRef.current.pause();

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (activeTrack.audioUrl) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => setIsPlaying(false));
    } else {
      setIsPlaying(false);
    }
  }, [activeTrack.id]);

  const handleSelectTrack = (track: VoiceTrack) => {
    if (track.id === activeTrack.id) {
      toggleMainPlay();
    } else {
      setActiveTrack(track);
    }
  };

  const toggleMainPlay = () => {
    if (!hasAudio || !audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => setIsPlaying(false));
    }
  };

  return (
    <section id="voice" className="py-16 sm:py-24 px-4 sm:px-6 text-[var(--text-main)] relative transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight uppercase font-display text-[var(--text-main)] mb-6">
            {t('voice.headingProf')} <span className="text-accent">{t('voice.headingOver')}</span>
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed font-normal">
            {t('voice.intro')}
          </p>
        </motion.div>

        {/* Studio Console Container */}
        <div className="glass-card p-5 sm:p-10 rounded-3xl relative overflow-hidden">
          {/* Category Selector Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-[var(--border-color)]">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={cn(
                    'px-4 py-2.5 min-h-[44px] rounded-xl text-sm font-semibold uppercase tracking-wider transition-all flex items-center',
                    selectedCategory === cat
                      ? 'bg-accent text-black shadow-sm'
                      : 'bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white/60 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10'
                  )}
                >
                  {categoryLabels[cat]}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2.5 min-w-[44px] min-h-[44px] rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white/80 hover:text-slate-950 dark:hover:text-white flex items-center justify-center"
                title={isMuted ? t('voice.unmute') : t('voice.mute')}
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} className="text-accent" />}
              </button>
              <button
                onClick={() => setShowScript(!showScript)}
                className={cn(
                  'px-3.5 py-2.5 min-h-[44px] rounded-xl text-xs font-mono font-bold flex items-center gap-2 border transition-all',
                  showScript
                    ? 'bg-emerald-100 dark:bg-accent/20 border-accent text-emerald-900 dark:text-accent'
                    : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-white/60'
                )}
              >
                <FileText size={14} /> {t('voice.scriptReader')}
              </button>
            </div>
          </div>

          {/* Active Track Highlight & Waveform Visualizer */}
          <div className="mb-10 glass-card p-6 sm:p-8 rounded-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <div>
                <span className="text-xs font-mono text-accent uppercase tracking-widest block mb-1">
                  {t('voice.nowPlaying')} {categoryLabels[activeTrackLocal.category] ?? activeTrackLocal.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-semibold text-[var(--text-main)]">
                  {activeTrackLocal.title}
                </h3>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-slate-500 dark:text-white/50">
                  {formatTime(currentTime)} / {activeTrackLocal.duration}
                </span>

                <button
                  onClick={toggleMainPlay}
                  disabled={!hasAudio}
                  title={hasAudio ? undefined : t('voice.audioNotUploaded')}
                  className="w-14 h-14 rounded-full bg-accent text-white hover:bg-accent-dark dark:bg-white/[0.05] dark:border-emerald-500/30 dark:text-white dark:hover:bg-white/10 flex items-center justify-center transform hover:scale-105 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {!hasAudio ? (
                    <MicOff size={22} className="text-accent" />
                  ) : isPlaying ? (
                    <Pause size={24} className="text-accent" />
                  ) : (
                    <Play size={24} className="fill-current text-accent ml-1" />
                  )}
                </button>
              </div>
            </div>

            {!hasAudio && (
              <div className="mb-4 px-4 py-2.5 rounded-lg bg-red-600/10 border border-red-600/30 text-red-600 dark:text-red-400 text-xs font-mono flex items-center gap-2">
                <MicOff size={14} /> {t('voice.audioComingSoon')}
              </div>
            )}

            {/* Hidden native audio element — this is what actually plays */}
            <audio
              ref={audioRef}
              src={activeTrack.audioUrl}
              preload="none"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
              onEnded={() => {
                setIsPlaying(false);
                setCurrentTime(0);
              }}
            />


            {/* Waveform Bars */}
            <div className="flex items-center justify-center gap-1 sm:gap-1.5 h-28 my-6 px-4 bg-slate-200/80 dark:bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] overflow-hidden">
              {activeTrackLocal.waveform.map((val, idx) => (
                <motion.div
                  key={idx}
                  animate={{
                    height: isPlaying
                      ? [
                          `${Math.max(15, val * 0.3)}%`,
                          `${Math.min(100, val * (Math.random() * 0.8 + 0.4))}%`,
                          `${Math.max(20, val * 0.5)}%`,
                        ]
                      : `${val}%`,
                  }}
                  transition={{
                    repeat: isPlaying ? Infinity : 0,
                    duration: 0.6,
                    delay: idx * 0.02,
                  }}
                  className={cn(
                    'w-0.5 sm:w-1 lg:w-1.5 rounded-full transition-colors',
                    isPlaying ? 'bg-accent' : 'bg-slate-400/50 dark:bg-white/20'
                  )}
                />
              ))}
            </div>

            {/* Script Text Box */}
            <AnimatePresence>
              {showScript && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 pt-6 border-t border-[var(--border-color)]"
                >
                  <span className="text-xs font-mono text-slate-500 dark:text-white/40 uppercase tracking-widest block mb-2">
                    {t('voice.scriptTranscript')}
                  </span>
                  <p className="text-base sm:text-lg italic font-serif text-slate-800 dark:text-[var(--text-main)]/90 bg-white dark:bg-[var(--card-bg)]/60 p-4 rounded-xl border border-[var(--border-color)] border-l-4 border-l-accent">
                    "{activeTrackLocal.script}"
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Voice Tracks List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {filteredTracks.map((track, idx) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 35, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelectTrack(track)}
                className={cn(
                  'p-4 min-h-[80px] rounded-xl border cursor-pointer transition-all backdrop-blur-md',
                  activeTrack.id === track.id
                    ? 'bg-emerald-50 dark:bg-accent/15 border-emerald-500 dark:border-accent/60 text-[var(--text-main)] shadow-sm'
                    : 'bg-slate-50 dark:bg-[var(--card-bg)]/80 border-slate-200 dark:border-white/5 hover:border-emerald-500/50 hover:shadow-[0_0_25px_rgba(16,185,129,0.2)] text-slate-700 dark:text-white/70 hover:text-slate-950 dark:hover:text-white'
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-accent font-semibold">
                    {categoryLabels[track.category] ?? track.category}
                  </span>
                  <span className="text-xs font-mono opacity-60 flex items-center gap-1">
                    {!track.audioUrl && <MicOff size={10} />}
                    {track.duration}
                  </span>
                </div>
                <h4 className="font-bold text-base text-[var(--text-main)] mb-1">{track.title}</h4>
                <p className="text-sm text-[var(--text-muted)] line-clamp-2">{track.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 glass-card rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-100 dark:bg-accent/15 text-emerald-900 dark:text-accent rounded-xl border border-emerald-200 dark:border-accent/40">
                <Mic size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[var(--text-main)]">{t('voice.customTitle')}</h4>
                <p className="text-xs text-[var(--text-muted)]">{t('voice.customDesc')}</p>
              </div>
            </div>

            <button
              onClick={onOpenBrief}
              className="w-full sm:w-auto px-6 py-3.5 min-h-[44px] bg-accent text-white hover:bg-accent-dark dark:bg-white/[0.05] dark:border-emerald-500/30 dark:text-white dark:hover:bg-white/10 font-extrabold text-xs uppercase tracking-wider rounded-xl shrink-0 flex items-center justify-center gap-2"
            >
              <Mic size={16} /> {t('btn.requestVoiceAudition')}
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
