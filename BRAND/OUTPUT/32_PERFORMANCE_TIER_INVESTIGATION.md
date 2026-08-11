# HYDRA SAMO — PERFORMANCE TIER / DOM FALLBACK INVESTIGATION

## Status: INSPECTION ONLY — No Code Modified

Scope: `src/systems/performance/*`, `App.tsx`, `main.tsx`, `index.css` (tier block),
`validateShader.ts`, `shaders/index.ts`, `AtmosphereScene.tsx` (full), `usePerformanceProfile.ts`.
`HydraMarkScene.tsx` (orphan) ignored.

Report date: 2026-08-09

---

## 1. Why the normal browser can enter fallback

The DOM signature (static DOM crest, no 3D) is produced **only** when `profile.backend === 'dom'`
(`App.tsx:83`). Per `decideBackend` (`domFallback.ts:29-44`) DOM is chosen under exactly four conditions:

| # | Condition | Source |
|---|---|---|
| 1 | `probe.supported === false` | `domFallback.ts:29` |
| 2 | `tier === 'low'` | `domFallback.ts:33` |
| 3 | `prefers-reduced-motion: reduce` | `domFallback.ts:37` |
| 4 | `contextLost && !contextRestored` | `domFallback.ts:41` |

Since dev-server and preview render in the same browser + OS, conditions 1–3 are identical across all
three environments and are ruled out by the reproduction. The differentiator is **condition 4 — a
WebGL context-loss event that is never recovered**. It is inherently intermittent, which matches the
reproduction ("the site *can* fall").

Why context loss occurs in the normal workflow but not in clean dev/preview sessions:

- **Startup context spike.** `validateShader` (`validateShader.ts:63-74`) creates a fresh, never-disposed
  WebGL2 scratch context on every factory call. At canvas mount the scene builds ~8–10 materials
  (2× haze, 1 current, 3 particle fields, aura, halo, grade) → ~8–10 live scratch contexts
  simultaneously (GC cannot run mid-synchronous-sequence), plus the leaked probe context and the R3F
  render context (`powerPreference: 'high-performance'`, `AtmosphereScene.tsx:339-346`). Under Chrome's
  per-process context cap (~16, lower under pressure) — and worse if the same origin is open in several
  tabs (same renderer process) — the browser evicts the least-recently-used context, typically the
  freshly created R3F canvas → `webglcontextlost`.
- **Dual-GPU powerPreference split.** Probe requests `'default'` (`webgl2Probe.ts:28`), the render
  canvas requests `'high-performance'`. On hybrid-GPU laptops the probe lands on the iGPU while the
  canvas forces the dGPU; the never-released probe context plus a loaded dGPU context is the classic
  eviction trigger.

## 2. Is MEDIUM handled correctly?

**Yes.** MEDIUM never maps to DOM. `decideBackend` excludes only `low`. MEDIUM is the intended
"WebGL, but capped" tier:

- `dpr` cap 1.5 (`DPR_CAP`, `PerformanceManager.ts:41`)
- No bloom (`postProcessing: tier === 'high'`, `PerformanceManager.ts:85`)
- Particles/complexity ×0.7 (`PerformanceManager.ts:74-75`)
- Shadows on, canvas mounted.

CSS tier block confirms: `html[data-quality='medium']` only freezes the blob animation and lightens
glass blur (`index.css:317-334`) — it does not touch the canvas layer.

**A MEDIUM classification cannot, by itself, hide the 3D world.** The observed DOM signature requires
`backend === 'dom'`.

Also: **governor degradation never flips the backend.** `degrade()` (`PerformanceManager.ts:150-168`)
only lowers `dpr`/`renderScale` and disables post/shadows/particles. `emit()` re-runs `decideBackend`
with unchanged `tier`/`probe`/`reducedMotion`/`contextLost` → stays `webgl2`. A degraded MEDIUM canvas
can *look* like "just ambient" (post off, dim), but the canvas is mounted.

## 3. Exact code path responsible

```
webglcontextlost on the R3F canvas
  → contextLoss.ts:16-19 handleLost (preventDefault + handlers.onLost)
  → PerformanceManager.ts:115-120 onLost: contextLost=true, governor.reset(),
      backend = decideBackend() = 'dom', emit()
  → App re-renders (useSyncExternalStore), show3D = false (App.tsx:83)
  → canvas wrapper unmounts (App.tsx:100-110), R3F disposes the canvas,
      useLayoutEffect cleanup removes the event listeners
  → browser fires webglcontextrestored later, but the listener is GONE
  → contextRestored stays false forever → backend stays 'dom' for the session
```

There is no re-probe, no retry, no timer — `PerformanceManager` has no recovery path. The
`contextLoss.ts` header even promises a "restore cycle that re-probes" — that cycle is unreachable
because the canvas is unmounted before restore can be observed.

## 4. Evidence from runtime state

Capture in the failing environment (console only, no file changes):

```js
import('/src/systems/performance').then(m => {
  const p = m.performanceManager.getProfile();
  console.table({ tier: p.tier, backend: p.backend, webgl2: p.webgl2Supported,
    dpr: p.dpr, renderScale: p.renderScale, post: p.postProcessing,
    particles: p.particleScale, complexity: p.sceneComplexity,
    reducedMotion: p.reducedMotion, contextLost: p.contextLost,
    contextRestored: p.contextRestored, reasons: p.decisionReasons });
});
addEventListener('webglcontextlost', e => console.log('CTX LOST @', performance.now()));
addEventListener('webglcontextrestored', e => console.log('CTX RESTORED @', performance.now()));
```

Expected on symptom: `backend: 'dom'`, `contextLost: true`, `contextRestored: false`,
`reasons: ['context-lost']`, and a `CTX LOST` entry with **no** `CTX RESTORED` after it.

If instead `backend: 'dom'` with `reasons: ['reduced-motion' | 'tier-low' | 'webgl2-unsupported']`,
the trigger is environmental, not this bug.

## 5. Dev-only, browser-only, or a genuine governor bug?

**Genuine governor bug in the context-loss recovery path, plus a context-hygiene defect that raises
the trigger probability.**

- The **contract is correct** (degradation ladder: post → DPR → shadows → particles/complexity →
  DOM last; DOM only when WebGL is unusable). Nothing changes it.
- The **bug**: "drop to DOM on loss, return after restore" is implemented so that unmounting the
  canvas on loss guarantees `contextRestored` can never be set — a transient GPU hiccup becomes a
  **permanent session fallback**.
- The **defect**: `probeWebGL2` (never released) + per-call `validateShader` scratch contexts (never
  released, ~8–10 at mount) create the transient context spike that *causes* the eviction.
- Not dev-only, not a shader problem, not a redesign problem.

## 6. Smallest safe fix (recommended, NOT implemented)

**Fix A — defer the DOM flip so restore stays reachable (the actual bug).**
In `PerformanceManager.onLost`: set `contextLost: true` but do **not** emit/decide immediately; start
a short timer (~1000 ms) and flip to `dom` only if `webglcontextrestored` hasn't arrived.
`onRestored` clears the timer and sets `contextRestored: true`. The canvas stays mounted through the
loss (R3F handles the restore since `preventDefault` was called), so restore is observable; a genuine
non-recovering loss still falls to DOM after the grace window. Contract untouched — DOM remains the
last resort.

**Fix B — context hygiene (reduces the trigger).**
Cache a single module-level scratch context in `validateShader.ts` instead of creating one per factory
call (kills the mount-time spike); call `loseContext` on the probe context after reading params in
`webgl2Probe.ts`. Parameter/local changes only.

Do **not** force HIGH, disable the manager, or remove DOM fallback.

## 7. Files that would be touched

- **Fix A:** `src/systems/performance/PerformanceManager.ts` (onLost/onRestored + timer);
  `src/systems/performance/contextLoss.ts` (likely no change).
- **Fix B:** `src/shaders/validateShader.ts`; `src/systems/performance/webgl2Probe.ts`.
- No changes to `AtmosphereScene.tsx`, `Current.tsx`, shaders, `chapters.ts`, `App.tsx`, or brand files.

## 8. Validation required

1. `npm run lint` (tsc strict) and `npm run build` — both pass.
2. **Recovery test:** force a loss on the live canvas (temporary console handle
   `gl.getExtension('WEBGL_lose_context')?.loseContext()` on the R3F canvas); verify the world
   re-appears after restore with no reload; flags return to sane state.
3. **Regression:** with `prefers-reduced-motion: reduce`, WebGL2 disabled, and LOW tier — DOM
   fallback must still engage exactly as before.
4. **Env parity:** dev server, `vite preview`, and deployed/normal flow all show the WebGL world;
   §4 console table shows `backend: 'webgl2'` in each.
