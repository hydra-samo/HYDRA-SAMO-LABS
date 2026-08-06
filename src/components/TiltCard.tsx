import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '../lib/utils';
import { useCoarsePointer } from '../hooks/useCoarsePointer';
import { useDeviceTier } from '../hooks/useDeviceTier';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  /** Max tilt in degrees — keep it subtle for editorial feel. */
  max?: number;
  onClick?: () => void;
}

/**
 * Spring-based 3D tilt container. The card leans toward the cursor while
 * hovered and eases back on leave. Transforms stay on the GPU layer.
 *
 * On touch devices (coarse pointer) there is no hover, so the tilt is disabled
 * and the card stays flat — tap/scroll motion takes over instead. Low-tier
 * devices skip the spring physics entirely (the springs keep running even when
 * idle), so the card renders as a plain surface there too.
 */
export const TiltCard: React.FC<TiltCardProps> = ({ children, className, max = 8, onClick }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isCoarse = useCoarsePointer();
  const isLowTier = useDeviceTier() === 'low';

  // Normalized cursor position within the card (0..1)
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 120, damping: 18 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 120, damping: 18 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isCoarse || isLowTier) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    if (isCoarse || isLowTier) return;
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={reset}
      style={isLowTier ? undefined : {
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        transformPerspective: 1000,
      }}
      className={cn(isLowTier ? undefined : 'transform-gpu will-change-transform', className)}
    >
      {children}
    </motion.div>
  );
};
