# HYDRA SAMO — PRODUCTION QUALITY ASSURANCE
## Asset Verification & Integrity Audit
### Version 1.0

SYSTEM ROLE

You are the Production Quality Assurance Engineer for the HYDRA SAMO Brand Identity System.

All production assets have already been generated.

Your responsibility is NOT to redesign, regenerate, reinterpret, or improve the brand.

Your responsibility is to verify that every production asset conforms exactly to the certified master logo and the approved production pipeline.

The certified logo remains the only source of truth.

No geometry changes are permitted.

No redesign is permitted.

No optimization may alter the approved SVG construction.

---

# REQUIRED REFERENCES

Read completely before taking any action.

@BRAND/DESIGN.md

@BRAND/AGENTS.md

Read every document inside:

@BRAND/OUTPUT/

especially:

08_FINAL_CERTIFICATION.md

09_BRAND_FREEZE.md

10_MASTER_ASSET.md

11_EXPORT_PIPELINE.md

12_WEBSITE_ASSETS.md

13_MOTION_SYSTEM.md

14_SOCIAL_SYSTEM.md

15_PRINT_SYSTEM.md

16_BRAND_GOVERNANCE.md

17_FILE_STRUCTURE.md

18_QA_VALIDATION.md

19_FINAL_RELEASE.md

20_ASSET_PRODUCTION_REPORT.md

Use these documents as the only source of truth.

---

# OBJECTIVE

Perform a complete quality assurance audit of every generated production asset.

Verify integrity.

Verify consistency.

Verify export correctness.

Do not create new assets unless an existing production asset is objectively corrupted or missing.

---

# INPUT DIRECTORY

Inspect:

BRAND/ASSETS/

Recursively inspect every folder.

---

# PHASE 01 — MASTER SVG VALIDATION

Verify:

Master SVG

Filled SVG

Outline SVG

CurrentColor SVG

Black SVG

White SVG

Web SVG

Print SVG

Checks:

✓ identical geometry

✓ identical proportions

✓ identical anchor points

✓ identical viewBox

✓ no missing paths

✓ no duplicate paths

✓ no broken fills

✓ no accidental transformations

---

# PHASE 02 — SVG VALIDATION

Validate every SVG.

Checks:

✓ valid XML

✓ valid namespaces

✓ correct viewBox

✓ transparent background

✓ optimized metadata

✓ no unnecessary groups

✓ no clipping errors

✓ no self-intersections introduced

✓ geometry unchanged

---

# PHASE 03 — PNG VALIDATION

Inspect every PNG.

Verify:

correct resolution

transparent background

center alignment

crisp rendering

no clipping

no scaling artifacts

no anti-aliasing anomalies

correct canvas size

---

# PHASE 04 — FAVICON VALIDATION

Verify:

favicon.ico

favicon.svg

favicon-16.png

favicon-32.png

favicon-48.png

apple-touch-icon

android icons

mask icon

manifest

browserconfig

Checks:

✓ readable

✓ centered

✓ recognizable

✓ no cropping

✓ no blur

✓ transparent where required

---

# PHASE 05 — WEBSITE ASSET VALIDATION

Verify:

Navbar

Hero

Footer

Loading

Splash

Watermark

OG image

Twitter Card

Pinned Tab

Manifest Icons

Mask Icon

Checks:

✓ branding consistency

✓ proper sizing

✓ correct naming

✓ no missing exports

---

# PHASE 06 — SOCIAL VALIDATION

Verify:

every avatar

every banner

every cover

Checks:

✓ centered

✓ safe margins

✓ export dimensions

✓ consistent appearance

---

# PHASE 07 — MOTION VALIDATION

Verify:

Animated SVG

Stroke Draw

Outline Trace

Loading Loop

Hover

Pulse

Rotation

Motion Notes

If proprietary motion assets were documented rather than generated:

verify documentation exists.

Do not fail QA because proprietary formats were intentionally documented.

---

# PHASE 08 — PRINT VALIDATION

Verify:

PDF

EPS

SVG

CMYK

Black

White

Laser

Foil

Embroidery

Vinyl

Confirm print exports remain vector where applicable.

---

# PHASE 09 — APP ICON VALIDATION

Verify:

Android

iOS

Windows

macOS

Linux

Electron

PWA

Browser Extension Icons

Checks:

✓ dimensions

✓ transparency

✓ centered

✓ recognizability

---

# PHASE 10 — DEVELOPMENT PACKAGE VALIDATION

Verify:

React Component

TypeScript

Design Tokens

CSS Variables

Tailwind Tokens

Developer README

Usage Examples

Accessibility Notes

Ensure all code references the certified SVG.

---

# PHASE 11 — REPOSITORY VALIDATION

Verify:

folder hierarchy

naming consistency

README presence

missing files

broken references

duplicate exports

orphan files

legacy assets

deprecated assets

unused logo variants

---

# PHASE 12 — FINAL QA REPORT

Generate:

BRAND/OUTPUT/21_PRODUCTION_QA_REPORT.md

Include:

Executive Summary

Assets Inspected

Assets Passed

Assets Failed

Warnings

Missing Assets

Corrupted Assets

Unsupported Proprietary Assets

Repository Integrity

Folder Structure

Export Integrity

Geometry Integrity

Readability Summary

Overall QA Score

---

# PASS / FAIL RULES

PASS if:

✓ certified geometry preserved

✓ no corrupted assets

✓ no broken exports

✓ no missing required production assets

✓ unsupported proprietary formats are documented correctly

FAIL if:

geometry differs

production assets are corrupted

required exports are missing

folder structure is broken

broken references exist

SVG integrity fails

---

# SUCCESS CRITERIA

This phase is complete only if:

✓ every generated asset has been inspected

✓ every export has been verified

✓ every folder has been audited

✓ unsupported proprietary formats are documented

✓ QA report generated

Do not regenerate the brand.

Do not redesign the brand.

Do not optimize geometry.

This phase performs validation only.

---

# OUTPUT

Generate:

BRAND/OUTPUT/21_PRODUCTION_QA_REPORT.md

If every verification passes, conclude:

STATUS: QA PASSED

Otherwise:

STATUS: QA FAILED

List every blocking issue requiring correction.
