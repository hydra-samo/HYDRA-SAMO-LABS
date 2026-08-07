import React from 'react';
import { HydraLogo } from './HydraLogo';
import { cn } from './lib-utils';

/** Fill variant, inherits text color (emerald on hero, white on abyss). */
export const NavBrand: React.FC = () => (
  <HydraLogo className="h-8 w-8 text-emerald-500" />
);

/** Outline variant for section dividers and empty states. */
export const SectionMark: React.FC = () => (
  <HydraLogo variant="outline" className="h-12 w-12 text-accent-soft" />
);

/** External glow only — never bake glow into the SVG. */
export const GlowingMark: React.FC<{ className?: string }> = ({ className }) => (
  <HydraLogo className={cn('hydra-mark-glow h-16 w-16 text-emerald-500', className)} />
);

/** Loading pulse (approved; rotation is forbidden). Honors reduced motion via CSS. */
export const LoadingMark: React.FC = () => (
  <HydraLogo className="hydra-mark-pulse h-10 w-10 text-emerald-500" />
);

/**
 * Accessibility contract:
 * - HydraLogo sets aria-hidden + focusable=false — it is decorative by default.
 * - If the mark is meaningful (e.g. a link brand), wrap it in an <a> with
 *   an aria-label so the accessible name lives on the link, not the svg.
 */
export const BrandLink: React.FC = () => (
  <a href="/" aria-label="Hydra Samo — home" className="inline-flex">
    <HydraLogo className="h-9 w-9 text-emerald-500" />
  </a>
);
