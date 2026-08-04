import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '../lib/utils';

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
 */
export const TiltCard: React.FC<TiltCardProps> = ({ children, className, max = 8, onClick }) => {
  const ref = useRef<HTMLDivElement>(null);

  // Normalized cursor position within the card (0..1)
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 120, damping: 18 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 120, damping: 18 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={reset}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        transformPerspective: 1000,
      }}
      className={cn('transform-gpu will-change-transform', className)}
    >
      {children}
    </motion.div>
  );
};
