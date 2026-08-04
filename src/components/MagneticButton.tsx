import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '../lib/utils';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  title?: string;
  'aria-label'?: string;
}

/**
 * A button that gently pulls toward the cursor while hovered (and springs back
 * on leave). Used on primary CTAs to make the interface feel tactile.
 */
export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className,
  strength = 0.35,
  onClick,
  type = 'button',
  disabled = false,
  title,
  'aria-label': ariaLabel,
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 150, damping: 15, mass: 0.7 });
  const y = useSpring(useMotionValue(0), { stiffness: 150, damping: 15, mass: 0.7 });

  const onMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={reset}
      title={title}
      aria-label={ariaLabel}
      style={{ x, y }}
      className={cn('transform-gpu will-change-transform', className)}
    >
      {children}
    </motion.button>
  );
};
