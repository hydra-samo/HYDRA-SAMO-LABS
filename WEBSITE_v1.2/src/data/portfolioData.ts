import { Discipline, Project, VoiceTrack, ProcessStep } from '../types';

export const DISCIPLINES: Discipline[] = [
  {
    id: 'video',
    title: 'High-End Video Editing',
    subtitle: 'Rhythm, Assembly & Pacing',
    desc: 'Rhythm assembly and cinematic pacing for world-class brands.',
    longDesc: 'Cutting raw multi-cam footage into punchy, emotion-driven visual narratives. Mastery over timing, match cuts, sound design, and color grading in DaVinci Resolve & Premiere Pro.',
    stats: 'Frame-accurate cuts built for retention, not just polish',
    software: ['Premiere Pro', 'DaVinci Resolve', 'Final Cut Pro', 'Audition'],
    iconName: 'Play',
  },
  {
    id: 'motion',
    title: 'Motion & Graphic Design',
    subtitle: '3D, VFX & Brand Identity',
    desc: 'Bespoke visual effects and brand identity that commands attention.',
    longDesc: 'Transforming static assets into dynamic visual experiences. High-impact kinetic typography, 3D product renders, HUD interfaces, and seamless VFX compositing.',
    stats: 'Bespoke 3D renders and kinetic visual systems',
    software: ['After Effects', 'Cinema 4D', 'Blender', 'Photoshop', 'Illustrator'],
    iconName: 'Layers',
  },
  {
    id: 'voice',
    title: 'Voice-Over Artist',
    subtitle: 'Resonance, Pacing & Soul',
    desc: 'Professional audio delivery with range, precision, and soul.',
    longDesc: 'Resonant, versatile vocal presence trained for cinematic trailers, sleek tech launch commercials, and intense character narration with studio-grade acoustic clarity.',
    stats: 'Broadcast Quality 24-bit / 96kHz Studio',
    software: ['Shure SM7B', 'Neumann U87', 'Universal Audio Apollo', 'Pro Tools'],
    iconName: 'Mic',
  }
];

// Real case studies go here once ready. Swap the empty array below for Project
// objects (see src/types.ts). Best practices before going live:
//   - `client` should be the actual company that hired you. If it's a
//     self-directed piece, use "Spec / Concept Project" — never imply a
//     relationship with a real company unless it's true.
//   - `thumbnail`/`videoUrl`/`beforeGradeImg`/`afterGradeImg` should point at
//     your own reels (host the video files in /public or self-host them);
//     Unsplash/Google sample URLs are just scaffolding.
//   - `metrics` may be omitted entirely. Only add real numbers (views, ROAS,
//     festival nominations) you can stand behind.
export const PROJECTS: Project[] = [];

// Add `audioUrl: '/audio/your-file.mp3'` (drop the file in /public/audio/) to
// any track below once a real recording exists. Tracks without audioUrl show
// a "sample coming soon" state on the site instead of faking playback.
export const VOICE_TRACKS: VoiceTrack[] = [
  {
    id: 'voice-1',
    title: 'The Dark Sentinel',
    category: 'Dramatic',
    duration: '0:42',
    pitchHz: 110,
    waveform: [15, 35, 60, 85, 45, 95, 100, 70, 30, 50, 90, 80, 40, 20, 60, 85, 95, 75, 55, 30, 80, 100, 65, 40, 90, 70, 50, 20, 60, 80, 45, 30, 95, 85, 50, 25, 60, 40, 20, 10],
    description: 'Deep, resonant, gritty narrative voice for trailers, dark fantasy, and high-stakes cinematic storytelling.',
    script: 'When the last light fades beneath the ash, men do not look to kings for salvation. They look into the dark... and wait for the sentinel.'
  },
  {
    id: 'voice-2',
    title: 'Aura X1 Launch',
    category: 'Commercial',
    duration: '0:30',
    pitchHz: 140,
    waveform: [20, 40, 70, 90, 80, 60, 85, 95, 40, 60, 80, 70, 90, 100, 60, 30, 50, 70, 85, 95, 65, 45, 75, 85, 90, 60, 40, 70, 85, 50, 30, 60, 80, 40, 20, 50, 70, 30, 15, 10],
    description: 'Sleek, confident, modern tech commercial delivery with punchy cadence and premium authority.',
    script: 'Precision is not an option. It is the baseline. Introducing Aura X1: engineered without compromise, built for those who shape tomorrow.'
  },
  {
    id: 'voice-3',
    title: 'Quantum Neural Node',
    category: 'Tech & AI',
    duration: '0:38',
    pitchHz: 130,
    waveform: [10, 25, 45, 65, 85, 95, 80, 60, 40, 70, 90, 85, 75, 95, 100, 80, 50, 30, 60, 80, 90, 70, 50, 80, 95, 85, 60, 40, 70, 80, 60, 40, 20, 50, 75, 60, 35, 20, 10, 5],
    description: 'Smooth, articulate, visionary narrator for AI documentaries, corporate keynotes, and product deep-dives.',
    script: 'Trillions of calculations per microsecond. A synthetic matrix learning at the speed of light. Welcome to the era of cognitive computing.'
  },
  {
    id: 'voice-4',
    title: 'Warlord Kazimir',
    category: 'Gaming & Character',
    duration: '0:28',
    pitchHz: 95,
    waveform: [30, 60, 90, 100, 85, 95, 70, 80, 90, 100, 60, 40, 80, 95, 85, 90, 100, 70, 50, 85, 95, 80, 60, 90, 100, 75, 50, 80, 90, 60, 40, 70, 85, 50, 30, 60, 40, 20, 10, 5],
    description: 'Gravelly, menacing character voice with thunderous chest resonance and gravelly rasp.',
    script: 'You bring toothpicks to a siege, general? Break their gates! Leave not a single stone standing!'
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'DIRECT BRIEFING',
    subtitle: 'Zero Middlemen',
    description: 'You speak directly with me—the editor, motion designer, and voice artist. We define visual tone, pace, and sound design goals in one initial session.',
    deliverable: 'Creative Outline & Styleboard'
  },
  {
    number: '02',
    title: 'RHYTHM & CUT ASSEMBLY',
    subtitle: 'The Video Head',
    description: 'Raw footage is trimmed to frame-perfect cuts. Beat matching, motion flow, and narrative pacing are locked into a strong rough cut.',
    deliverable: 'Lock-Cut Video Draft'
  },
  {
    number: '03',
    title: 'MOTION & VISUAL POLISH',
    subtitle: 'The Graphic Head',
    description: 'Kinetic titles, custom VFX overlays, 3D elements, and sleek color grading are integrated seamlessly into the timeline.',
    deliverable: 'Visual FX & Motion Pass'
  },
  {
    number: '04',
    title: 'VOCAL RESONANCE & SOUND',
    subtitle: 'The Audio Head',
    description: 'Voice-over narration is recorded in-house with studio microphone precision, paired with custom sound effects and master audio mixing.',
    deliverable: 'Master 24-bit Audio & Mix'
  },
  {
    number: '05',
    title: 'FINAL HYDRA DELIVERY',
    subtitle: 'Production Master',
    description: 'Exported in ultra-high resolution formats for Broadcast, Cinema, Web, and Socials. Multi-aspect ratio cutdowns included.',
    deliverable: 'Complete Master Asset Pack'
  }
];

export const COMPARISON_MATRIX = [
  {
    feature: 'Communication',
    agency: 'Account managers, email chains, delay',
    hydra: 'Direct 1-on-1 with Issam Eddine (Hydra Samo)'
  },
  {
    feature: 'Turnaround Speed',
    agency: '2-4 weeks with internal handoffs',
    hydra: '3-7 days with integrated unified workflow'
  },
  {
    feature: 'Creative Cohesion',
    agency: 'Fragmented (Editor vs Motion vs Audio)',
    hydra: '100% Unified (Video + Motion + Voice in sync)'
  },
  {
    feature: 'Cost Efficiency',
    agency: 'High studio overhead & manager markups',
    hydra: 'Lean direct pricing for agency-grade output'
  }
];
