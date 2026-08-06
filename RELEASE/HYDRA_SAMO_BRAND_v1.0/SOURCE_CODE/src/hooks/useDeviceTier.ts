import { useEffect, useState } from 'react';

/**
 * Performance tier of the current device — 'low' | 'medium' | 'high'.
 *
 * Drives the rendering budget: weak phones/tablets skip smooth-scroll, blur
 * entrances, ambient drift, backdrop filters and other GPU-heavy effects; mid
 * hardware gets a lighter version; desktops get the full treatment. The tier
 * is also mirrored onto `<html data-quality="low|medium|high">` so CSS can
 * gate static styles (ambient blobs, glass blur) without any JS per frame.
 *
 * Detection is heuristic (CPU cores, device memory, network class, pointer)
 * and read once, then cached for the session.
 */
export type DeviceTier = 'low' | 'medium' | 'high';

interface DeviceInfo {
  hardwareConcurrency?: number;
  deviceMemory?: number;
  effectiveType?: string;
  saveData?: boolean;
}

let cachedTier: DeviceTier | null = null;

function detectTier(): DeviceTier {
  if (typeof navigator === 'undefined') return 'high';

  const nav = navigator as Navigator & DeviceInfo;
  const cores = nav.hardwareConcurrency ?? 8;
  const memory = nav.deviceMemory ?? 4;

  // Weak CPU + touchscreen is the classic low-end phone.
  if (cores <= 4 && window.matchMedia('(pointer: coarse)').matches) return 'low';

  let score = 0;
  if (cores <= 4) score += 1;
  else if (cores <= 8) score += 2;
  else score += 3;

  if (memory <= 2) score += 1;
  else if (memory <= 4) score += 2;
  else score += 3;

  const eff = nav.effectiveType;
  if (eff === 'slow-2g' || eff === '2g') score -= 1;
  if (nav.saveData) score = Math.min(score, 2);

  if (score <= 2) return 'low';
  if (score <= 4) return 'medium';
  return 'high';
}

export function useDeviceTier(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>(() => {
    if (typeof window === 'undefined') return 'high';
    if (cachedTier) return cachedTier;
    cachedTier = detectTier();
    return cachedTier;
  });

  useEffect(() => {
    const el = document.documentElement;
    el.dataset.quality = tier;
    return () => {
      delete el.dataset.quality;
    };
  }, [tier]);

  return tier;
}
