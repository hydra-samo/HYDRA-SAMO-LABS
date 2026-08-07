# Developer Motion Notes

Implement animation in the React app with the same contract as the demos in this folder.

```ts
// Entrance (hero / nav logo on load)
.hydra-reveal path {
  fill: none;
  stroke: currentColor;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: hydraDraw 0.9s cubic-bezier(0.65, 0, 0.35, 1) forwards;
}
.hydra-reveal path:nth-child(1) { animation-delay: 0s; }
.hydra-reveal path:nth-child(2) { animation-delay: 0.15s; }
.hydra-reveal path:nth-child(3) { animation-delay: 0.30s; }
.hydra-reveal path:nth-child(4) { animation-delay: 0.45s; }
@keyframes hydraDraw { to { stroke-dashoffset: 0; } }
```

```ts
// Loading state (approved pulse)
.hydra-pulse {
  animation: hydraPulse 3.2s ease-in-out infinite;
  transform-origin: 50px 41.94px;
}
@keyframes hydraPulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%      { opacity: 0.55; transform: scale(0.9); }
}
```

```ts
// Always honor reduced motion
@media (prefers-reduced-motion: reduce) {
  .hydra-reveal path,
  .hydra-pulse,
  .hydra-idle { animation: none; }
}
```

## Rules

1. Keep `pathLength="1"` on all four paths so draw/trace math stays uniform.
2. Never animate `d`, never rotate the mark, never bake glow into the SVG.
3. Glow and reflections remain external utilities (`.hydra-mark-glow` in `WEBSITE_v1.1/src/index.css`).
4. Do not use `HydraLogo` outside its component contract (`WEBSITE_v1.1/src/components/HydraLogo.tsx`).
