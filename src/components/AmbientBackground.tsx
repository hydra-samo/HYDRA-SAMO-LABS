import React, { useEffect } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { useCoarsePointer } from '../hooks/useCoarsePointer';

/**
 * Living organic backdrop: three ultra-blurred moss-green blobs drift and
 * pulse behind a fixed film-grain plate.
 *
 * On fine pointers it is lit by a low-frequency cursor spotlight. On touch
 * devices (no hover, no cursor) the spotlight is replaced by scroll-driven
 * motion: an emerald "crown" fades out while a deep jade "abyss" rises, and an
 * aurora wash rides the scroll position — so the gradient itself moves with
 * the page on mobile/tablet. The whole layer is decorative (pointer-events:
 * none) and lives at -z-10.
 */
export const AmbientBackground: React.FC = () => {
  const isCoarse = useCoarsePointer();

  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);
  const spotlightX = useSpring(mouseX, { stiffness: 55, damping: 16, mass: 0.6 });
  const spotlightY = useSpring(mouseY, { stiffness: 55, damping: 16, mass: 0.6 });

  useEffect(() => {
    if (isCoarse) return;
    const onPointerMove = (e: PointerEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', onPointerMove);
  }, [isCoarse, mouseX, mouseY]);

  // Document scroll progress (0..1) drives every gradient below — transform
  // and opacity only, so it stays cheap on low-end mobile GPUs.
  const { scrollYProgress } = useScroll();

  const crownOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.16]);
  const abyssOpacity = useTransform(scrollYProgress, [0, 1], [0.14, 0.5]);
  const auroraY = useTransform(scrollYProgress, [0, 1], ['0vh', '52vh']);
  const auroraOpacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.85, 1],
    [0.28, 0.62, 0.58, 0.32]
  );

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Deep radial emerald wash grounding the abyssal canvas (#060c09) —
          a faint #10b981 bloom top-left and a deeper #059669 bottom-right. */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_-10%,rgba(16,185,129,0.07),transparent_55%),radial-gradient(120%_120%_at_90%_110%,rgba(5,150,105,0.09),transparent_60%)]" />

      {/* Scroll-reactive emerald crown — brightest at the top of the page,
          eases away as the visitor descends. */}
      <motion.div
        className="absolute -top-[18%] -left-[12%] h-[72vh] w-[72vh] rounded-full"
        style={{
          opacity: crownOpacity,
          background: 'radial-gradient(circle, rgba(16,185,129,0.18) 0%, transparent 65%)',
        }}
      />

      {/* Scroll-reactive jade abyss — dim at the hero, rising into the
          foreground as the page deepens. */}
      <motion.div
        className="absolute -bottom-[22%] -right-[10%] h-[78vh] w-[78vh] rounded-full"
        style={{
          opacity: abyssOpacity,
          background: 'radial-gradient(circle, rgba(5,150,105,0.24) 0%, transparent 65%)',
        }}
      />

      {/* Drifting aurora wash — rides the scroll position. This is the
          primary touch-device motion: a soft emerald bloom that travels down
          the page as you scroll. */}
      <motion.div
        className="absolute top-0 left-[12%] h-[55vh] w-[55vh] rounded-full"
        style={{
          y: auroraY,
          opacity: auroraOpacity,
          background:
            'radial-gradient(circle, rgba(52,211,153,0.18) 0%, rgba(16,185,129,0.09) 45%, transparent 70%)',
        }}
      />

      {/* Organic color blobs */}
      <div
        className="ambient-blob ambient-blob--a -top-[18vh] -left-[14vw] h-[55vw] w-[55vw]"
        style={{ background: 'var(--blob-moss)' }}
      />
      <div
        className="ambient-blob ambient-blob--b top-[38vh] -right-[16vw] h-[48vw] w-[48vw]"
        style={{ background: 'var(--blob-jade)' }}
      />
      <div
        className="ambient-blob ambient-blob--c -bottom-[24vh] left-[18vw] h-[52vw] w-[52vw]"
        style={{ background: 'var(--blob-lichen)' }}
      />

      {/* Fixed film-grain plate so the glow reads as film stock, not digital */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.04] mix-blend-overlay">
        <filter id="hydra-film-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hydra-film-grain)" />
      </svg>

      {/* Cursor spotlight — fine-pointer only. The coarse-pointer media query
          in index.css hides it as a hard fallback. */}
      {!isCoarse && (
        <motion.div
          className="cursor-spotlight absolute top-0 left-0 -ml-[300px] -mt-[300px] h-[600px] w-[600px] rounded-full transform-gpu will-change-transform"
          style={{
            x: spotlightX,
            y: spotlightY,
            background: 'radial-gradient(circle, var(--spot-glow) 0%, transparent 65%)',
          }}
        />
      )}
    </div>
  );
};
