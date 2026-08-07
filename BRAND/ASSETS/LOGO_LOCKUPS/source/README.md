# Lockup Wordmark Source Font

The HYDRA SAMO lockup wordmark is vectorized (no live font) from the exact
typeface the website renders in its wordmark: **Space Grotesk 700**.

| Field | Value |
| --- | --- |
| Family | Space Grotesk (Florian Karsten) |
| Weight | Bold — `usWeightClass 700` |
| Build | **Version 2.000** — Google Fonts release v22 (`fonts.gstatic.com/s/spacegrotesk/v22/...`) |
| Source | `<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700">` in `WEBSITE_v1.1/index.html` |
| File | `SpaceGrotesk-700-google-v2.000.ttf` (decompressed from the served WOFF2) |
| SHA-256 | `cd28e2a6cdd39e27f208aac3b3e477aa1e5b0616c22699e61e9169636a8d40c7` |
| License | SIL OFL 1.1 — see `OFL-1.1.txt` |

## Why this build

The site's wordmark (`--font-display: 'Space Grotesk'`, `font-bold`) renders the
**Google Fonts v2.x** build. The earlier draft was built from the OS-installed
`SpaceGrotesk-Bold.otf` **v1.004** (the 2018 original), which has different
advance widths and sidebearings (~3.4% narrower text). All lockups now use the
v2.000 outlines so the lockup matches the website's rendering letter-for-letter.

This file is kept for regeneration only — every lockup SVG is path-converted and
carries no font dependency.
