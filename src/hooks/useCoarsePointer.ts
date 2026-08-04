import { useEffect, useState } from 'react';

/**
 * True when the primary input is a coarse pointer (touchscreen) — phones and
 * tablets. Used to gate hover/mouse-only effects (tilt, magnetic buttons,
 * cursor spotlight) behind scroll-driven motion for touch users.
 */
export function useCoarsePointer(): boolean {
  const [coarse, setCoarse] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(pointer: coarse)');
    setCoarse(mq.matches);
    const handler = (e: MediaQueryListEvent) => setCoarse(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return coarse;
}
