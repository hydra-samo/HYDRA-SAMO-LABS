import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Living organic backdrop: three ultra-blurred moss-green blobs drift and
 * pulse behind a fixed film-grain plate, lit by a low-frequency cursor
 * spotlight. The whole layer is decorative (pointer-events: none) and lives at
 * -z-10 so it can never fight with content, modals or video playback.
 */
export const AmbientBackground: React.FC = () => {
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);
  const spotlightX = useSpring(mouseX, { stiffness: 55, damping: 16, mass: 0.6 });
  const spotlightY = useSpring(mouseY, { stiffness: 55, damping: 16, mass: 0.6 });

  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', onPointerMove);
  }, [mouseX, mouseY]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
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

      {/* Cursor spotlight — light dampening handled by the springs above */}
      <motion.div
        className="cursor-spotlight absolute top-0 left-0 -ml-[300px] -mt-[300px] h-[600px] w-[600px] rounded-full transform-gpu will-change-transform"
        style={{
          x: spotlightX,
          y: spotlightY,
          background: 'radial-gradient(circle, var(--spot-glow) 0%, transparent 65%)',
        }}
      />
    </div>
  );
};
