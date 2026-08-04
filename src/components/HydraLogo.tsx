import React from 'react';
import { cn } from '../lib/utils';

interface HydraLogoProps {
  className?: string;
  variant?: 'fill' | 'outline';
  animated?: boolean;
}

const HEAD_PATH =
  'M 50 11 C 53 15, 56 19, 57.8 24 C 59.5 28.5, 56.5 38, 54 45 C 53.2 47, 52.6 48, 52 48.6 C 48.5 49.4, 47 48.6, 46.6 44 C 45.8 36, 44.8 30, 45.5 26 C 46.5 21, 47.8 16, 50 11 Z';

export const HydraLogo: React.FC<HydraLogoProps> = ({
  className,
  variant = 'fill',
  animated = false,
}) => {
  const isOutline = variant === 'outline';

  return (
    <svg
      viewBox="0 0 100 100"
      data-hydra-mark
      aria-hidden="true"
      focusable="false"
      className={cn('hydra-mark block text-current', animated && 'hydra-mark-spin', className)}
    >
      <g
        className="hydra-heads"
        fill={isOutline ? 'none' : 'currentColor'}
        stroke={isOutline ? 'currentColor' : 'none'}
        strokeWidth={isOutline ? 3 : undefined}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path className="hydra-head hydra-head-0" d={HEAD_PATH} pathLength={1} />
        <path
          className="hydra-head hydra-head-1"
          d={HEAD_PATH}
          transform="rotate(120 50 50)"
          pathLength={1}
        />
        <path
          className="hydra-head hydra-head-2"
          d={HEAD_PATH}
          transform="rotate(240 50 50)"
          pathLength={1}
        />
      </g>
    </svg>
  );
};
