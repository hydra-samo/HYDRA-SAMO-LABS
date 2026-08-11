import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useDeviceTier } from '../hooks/useDeviceTier';

/* ------------------------------------------------------------------ *
 * Hero ambient engine — a lightweight 2D canvas dot-matrix field,     *
 * scoped strictly inside the Hero (absolute inset-0, never fixed, so  *
 * nothing bleeds into the sections below). Emerald dots at ≤12%       *
 * opacity crawl on a slow horizon drift with a gentle cursor          *
 * parallax. No WebGL, no postprocessing — one 2D context, one rAF.    *
 * ------------------------------------------------------------------ */

interface Dot {
  x: number;
  y: number;
  r: number;
  a: number;
}

/* Emerald reads as light on the abyssal canvas; a deepened emerald keeps the
   ≤12% whisper legible on the warm paper light theme. Derived from the theme
   token so this never drifts from the palette. */
function resolveDotColor(): string {
  const bg = getComputedStyle(document.documentElement)
    .getPropertyValue('--bg-canvas')
    .trim();
  const m = /^#([0-9a-f]{6})$/i.exec(bg);
  if (!m) return '#10b981';
  const n = parseInt(m[1], 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum > 128 ? '#047857' : '#10b981';
}

export function HeroAmbient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();
  const tier = useDeviceTier();
  const isLow = tier === 'low';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = Boolean(reduceMotion) || isLow;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const spacing = isLow ? 52 : 42;

    let dotColor = resolveDotColor();

    let width = 0;
    let height = 0;
    let dots: Dot[] = [];

    const rebuild = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      dots = [];
      const onPaper = dotColor !== '#10b981';
      for (let y = spacing / 2; y < height; y += spacing) {
        for (let x = spacing / 2; x < width; x += spacing) {
          dots.push({
            x,
            y,
            r: 1 + Math.random() * 0.9,
            a: (onPaper ? 0.08 : 0.05) + Math.random() * 0.07,
          });
        }
      }
    };
    rebuild();

    const period = () => height + spacing;

    let drift = 0;
    let parallaxX = 0;
    let parallaxY = 0;
    let mouseNX = 0;
    let mouseNY = 0;
    let raf = 0;

    const onResize = () => rebuild();

    const onPointerMove = (e: PointerEvent) => {
      mouseNX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseNY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    /* Theme flips swap the resolved dot color; the running rAF picks it up
       automatically, static (reduced) mode repaints once. */
    const themeObserver = new MutationObserver(() => {
      const next = resolveDotColor();
      if (next !== dotColor) {
        dotColor = next;
        if (reduced) draw();
      }
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    const draw = () => {
      drift = (drift + 0.12) % spacing;

      const targetX = mouseNX * 14;
      const targetY = mouseNY * 10;
      parallaxX += (targetX - parallaxX) * 0.045;
      parallaxY += (targetY - parallaxY) * 0.045;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = dotColor;

      const P = period();
      for (const d of dots) {
        const y = (((d.y + drift - spacing / 2) % P) + P) % P + spacing / 2;
        const depth = 1 + (d.y / Math.max(1, height)) * 0.4;
        ctx.globalAlpha = d.a;
        ctx.beginPath();
        ctx.arc(d.x + parallaxX, y + parallaxY * depth, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      if (!reduced) raf = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    if (reduced) {
      draw();
    } else {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(raf);
      themeObserver.disconnect();
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, [reduceMotion, isLow]);

  return (
    <div
      className="absolute inset-0 z-0 h-full w-full overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
