# Accessibility Notes — Hydra Samo Mark

## Component defaults (already implemented)

- `aria-hidden="true"` + `focusable="false"` on the `<svg>` — decorative by default.
- If the mark carries meaning (brand link), the accessible name lives on the wrapper:

```tsx
<a href="/" aria-label="Hydra Samo — home">
  <HydraLogo className="h-9 w-9 text-emerald-500" />
</a>
```

## Contrast

- Emerald `#10b981` on abyssal `#060c09` ≈ 6.2:1 (AA). Emerald on white ≈ 2.5:1 (decorative only).
- Outline variant should be reserved for large sizes or overlays on text-contrast-abated surfaces.

## Motion

- Every animation honors `prefers-reduced-motion: reduce` (site CSS already disables `hydra-mark-pulse` and ambient drift).
- No blinking, strobing, or rotation.

## Color

- The mark must never be the sole carrier of meaning — pair with text (see brand link pattern).
