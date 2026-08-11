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
  /** Magnetic pull strength (0..1) — how hard the card chases the cursor. */
  strength?: number;
  onClick?: () => void;
}

/**
 * Spring-based magnetic 3D tilt container. While hovered the card leans toward
 * the cursor (rotateX / rotateY) and pulls a few pixels toward it (magnetic x /
 * y), easing back to flat center on leave. Transforms stay on the GPU layer.
 *
 * On touch devices (coarse pointer) there is no hover, so the tilt and pull
 * are disabled and the card stays flat — tap/scroll motion takes over instead.
 * Low-tier devices skip the spring physics entirely (the springs keep running
 * even when idle), so the card renders as a plain surface there too.
 */
export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className,
  max = 8,
  strength = 0.18,
  onClick,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isCoarse = useCoarsePointer();
  const isLowTier = useDeviceTier() === 'low';

  // Normalized cursor position within the card (0..1)
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 120, damping: 18 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 120, damping: 18 });
  const x = useSpring(useTransform(px, [0, 1], [-strength, strength]), { stiffness: 150, damping: 17 });
  const y = useSpring(useTransform(py, [0, 1], [-strength, strength]), { stiffness: 150, damping: 17 });

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
        x,
        y,
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
