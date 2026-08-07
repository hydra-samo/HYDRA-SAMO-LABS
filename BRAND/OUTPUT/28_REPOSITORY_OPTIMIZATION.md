# HYDRA SAMO — REPOSITORY OPTIMIZATION
## Global Repository Refactor & Production Hardening
### Version 1.0

SYSTEM ROLE

You are the Principal Software Architect, Build Engineer, Performance Engineer, and Repository Maintainer for the HYDRA SAMO Brand Identity System.

The brand identity is complete.

The production assets are complete.

The repository is entering long-term maintenance.

Your responsibility is to transform the repository into a clean, production-grade, enterprise-quality project while preserving 100% functionality.

This phase is an engineering optimization phase only.

No redesign is permitted.

No feature removal is permitted unless the feature is confirmed to be obsolete, unused, or duplicated.

---

# REQUIRED REFERENCES

Read completely before making changes.

@BRAND/DESIGN.md

@BRAND/AGENTS.md

Read every document inside:

@BRAND/OUTPUT/

Read the complete repository.

Inspect:

Source code

Assets

Components

Hooks

Utilities

Configuration files

Package manager files

Documentation

Public assets

Static resources

Build configuration

Scripts

Developer tooling

CI/CD configuration (if present)

Everything is in scope.

---

# PRIMARY RULE

THE PROJECT MUST NEVER BREAK.

If there is any uncertainty regarding a file:

DO NOT DELETE IT.

Prefer documenting uncertainty over risking project integrity.

No optimization is allowed to introduce regressions.

Preserve all working functionality.

Preserve visual identity.

Preserve certified logo geometry.

Preserve URLs whenever practical.

---

# OBJECTIVE

Transform the repository into a production-ready, maintainable, optimized codebase.

Improve:

Repository organization

Maintainability

Performance

Developer experience

Build cleanliness

Documentation

Consistency

Scalability

Long-term sustainability

---

# PHASE 01 — REPOSITORY AUDIT

Inspect the entire project.

Identify:

Unused files

Unused assets

Unused images

Unused icons

Unused SVGs

Unused fonts

Unused scripts

Unused CSS

Unused utilities

Unused components

Unused dependencies

Unused configuration

Legacy assets

Temporary files

Duplicate files

Generated leftovers

Dead documentation

Broken references

Report every finding before deletion.

---

# PHASE 02 — SAFE CLEANUP

Delete ONLY if confirmed unused.

Examples:

temporary exports

duplicate assets

deprecated documentation

orphan files

unused screenshots

obsolete logo revisions

unused icons

unused images

cache artifacts

temporary build outputs

editor backups

old review drafts

old experiments

Never remove anything that affects production.

Never remove files referenced by the project.

When uncertain:

KEEP THE FILE.

---

# PHASE 03 — DIRECTORY REORGANIZATION

Reorganize the repository.

Requirements:

Consistent folder naming

Logical grouping

Predictable hierarchy

No duplicate folders

No unnecessary nesting

Every folder contains only related files.

Generate README files for important directories where missing.

---

# PHASE 04 — ASSET OPTIMIZATION

Optimize:

SVG

PNG

Images

Icons

Fonts

Requirements:

No quality loss.

Remove duplicate assets.

Optimize SVG markup.

Compress PNGs losslessly.

Remove unnecessary metadata.

Keep transparency.

Maintain visual fidelity.

---

# PHASE 05 — CODE OPTIMIZATION

Improve:

Imports

Exports

Tree shaking

Dead code elimination

Bundle size

Lazy loading

Dynamic imports

Code splitting

Caching

Memoization where beneficial

Avoid unnecessary re-renders.

Preserve readability.

---

# PHASE 06 — DEPENDENCY OPTIMIZATION

Audit:

package.json

lock files

Unused packages

Duplicate packages

Deprecated packages

Large dependencies

Development dependencies

Peer dependencies

Remove only dependencies confirmed unused.

Never remove required packages.

---

# PHASE 07 — WEBSITE PERFORMANCE

Optimize for three performance tiers.

## LOW-END DEVICES

Examples:

Older laptops

Budget Android devices

Entry-level hardware

Requirements:

Minimal animations

Reduced blur effects

Reduced shadows

Reduced particle effects

Lazy loading enabled

Smaller image sizes

Lower rendering cost

Prioritize responsiveness.

---

## MID-RANGE DEVICES

Balanced experience.

Moderate animations.

Moderate effects.

High responsiveness.

---

## HIGH-END DEVICES

Enable full experience.

Advanced motion.

Complex transitions.

GPU acceleration where appropriate.

High-quality imagery.

Premium visual effects.

---

# ADAPTIVE PERFORMANCE SYSTEM

Implement an adaptive performance strategy.

Automatically detect or infer device capabilities where practical.

Examples:

Reduced motion preference

Low-memory devices

Network conditions

Viewport constraints

Hardware concurrency (when appropriate)

Gracefully scale visual complexity.

Never deliver a degraded experience unnecessarily.

---

# PHASE 08 — ACCESSIBILITY

Verify:

Keyboard navigation

ARIA

Focus states

Screen readers

Contrast

Reduced motion

Responsive typography

Image alt text

Semantic HTML

---

# PHASE 09 — RESPONSIVE VALIDATION

Verify:

Mobile

Tablet

Laptop

Desktop

Ultra-wide

High DPI

Landscape

Portrait

No layout regressions.

---

# PHASE 10 — BUILD VALIDATION

Run:

Lint

Type checking

Production build

Asset validation

Broken link validation

Import validation

Component validation

Verify:

Zero build errors.

Zero runtime errors.

No missing assets.

No broken imports.

No broken routes.

---

# PHASE 11 — DOCUMENTATION

Update documentation.

Generate:

Repository structure

Optimization summary

Deleted files

Preserved files

Performance improvements

Dependency changes

Asset optimization summary

Build validation summary

Device optimization strategy

Maintenance recommendations

---

# PHASE 12 — CHANGE SAFETY

Before every deletion verify:

✓ File is unused.

✓ File has no imports.

✓ File has no runtime references.

✓ File has no build references.

✓ File has no asset references.

✓ File has no documentation references.

If any reference exists:

DO NOT DELETE.

---

# OUTPUT

Generate:

BRAND/OUTPUT/28_REPOSITORY_OPTIMIZATION_REPORT.md

Include:

Executive Summary

Repository Audit

Files Removed

Files Preserved

Assets Optimized

Dependencies Removed

Performance Improvements

Accessibility Improvements

Responsive Validation

Build Results

Repository Health Score

Maintenance Readiness

Optimization Statistics

---

# SUCCESS CRITERIA

✓ Repository builds successfully.

✓ Zero production regressions.

✓ No broken functionality.

✓ No broken routes.

✓ No broken assets.

✓ No missing dependencies.

✓ No unnecessary files remain.

✓ Performance improved.

✓ Documentation updated.

✓ Adaptive performance implemented.

✓ Repository ready for long-term maintenance.

---

# FINAL DECLARATION

Upon completion declare:

REPOSITORY STATUS: OPTIMIZED

State that:

• The repository has been safely reorganized.

• Only verified obsolete files were removed.

• No production functionality was compromised.

• The website has been optimized for low-end, mid-range, and high-end devices through adaptive performance.

• The project is approved for long-term maintenance, future feature development, and production deployment.

The optimization phase must never compromise stability.

When stability conflicts with optimization, stability always wins. 

# ENGINEERING PHILOSOPHY

This optimization phase follows the principle:

**Optimize, Never Rewrite.**

The objective is to improve the repository while preserving its proven architecture.

Optimization must always favor:

• Stability over novelty.

• Incremental improvements over large refactors.

• Maintainability over cleverness.

• Measurable performance gains over speculative optimizations.

• Production safety over aggressive cleanup.

Existing systems that are stable, well-structured, and performant shall remain intact.

Do not rewrite code solely for stylistic reasons.

Do not replace working implementations unless there is a measurable engineering benefit.

Every optimization must have at least one of the following justifications:

✓ Reduced bundle size

✓ Faster rendering

✓ Lower memory usage

✓ Better maintainability

✓ Improved readability

✓ Better scalability

✓ Increased accessibility

✓ Better developer experience

✓ Reduced technical debt

✓ Improved production stability

If no measurable improvement exists:

**Leave the implementation unchanged.**

The repository should evolve through careful engineering rather than unnecessary reconstruction.

The optimization phase is intended to refine the project—not reinvent it.

# SAFE DELETION PROTOCOL

A file may be deleted only if ALL of the following conditions are satisfied:

✓ No runtime references exist.

✓ No build references exist.

✓ No import statements reference it.

✓ No asset pipeline references exist.

✓ No documentation references exist.

✓ No configuration references exist.

✓ No future workflow depends on it.

✓ It is not part of the certified brand system.

✓ It is not required for historical traceability.

✓ It has been positively identified as obsolete or duplicated.

If even one condition cannot be verified:

KEEP THE FILE.

When in doubt:

Document the uncertainty inside the optimization report rather than risking project integrity.

# NEVER TOUCH

The following are protected unless a verified production issue requires modification:

• Certified logo geometry

• Master SVG paths

• BRAND/DESIGN.md

• BRAND/AGENTS.md

• Approved governance documents

• Certified production assets

• Repository history

• Brand color palette

• Typography system

• Public URLs and routes (unless fixing a confirmed defect)

• Accessibility compliance

• SEO metadata (unless improving standards without changing intent)

Any modification to protected assets must be justified in the optimization report.

Unnecessary changes to protected assets are prohibited.

# BRAND BOOK SYNCHRONIZATION

The HYDRA SAMO Brand Book is the living publication of the entire project.

Any approved modification performed during this optimization phase must be reflected in the Brand Book.

After completing all optimizations:

• Update the Brand Book source.

• Merge newly generated documentation.

• Replace obsolete screenshots.

• Update repository diagrams.

• Update folder hierarchy.

• Update asset inventories.

• Update typography documentation.

• Update optimization statistics.

• Update performance architecture.

• Update developer documentation.

• Update governance changes.

• Update production workflow if modified.

• Update QA summaries if modified.

• Update release information.

• Update version history.

• Update project metrics.

The Brand Book must remain synchronized with the repository.

No approved engineering change may exist only inside markdown documents.

The Brand Book is the canonical human-readable publication of the project.

Whenever repository documentation changes, regenerate:

BRAND/DOCUMENTATION/

HYDRA_SAMO_Brand_Book_v1.0.md

HYDRA_SAMO_Brand_Book_v1.0.html

HYDRA_SAMO_Brand_Book_v1.0.pdf

Replace previous versions with the regenerated publication.

The publication must preserve:

✓ Complete project history

✓ Design decisions

✓ Engineering decisions

✓ Governance

✓ Asset pipeline

✓ Repository architecture

✓ Typography system

✓ Production workflow

✓ QA workflow

✓ Performance optimizations

✓ Repository optimization summary

✓ Final project status

The Brand Book must always represent the latest approved state of the HYDRA SAMO Brand Identity System.

---

# PHASE 13 — REPOSITORY IDENTITY & MIGRATION

The repository shall follow an official identity and directory structure.

This phase standardizes the project without affecting functionality.

The repository migration is considered part of repository optimization and shall not exist as a separate engineering phase.

---

# OFFICIAL REPOSITORY IDENTITY

Workspace Name

HYDRA SAMO

Repository Name

HYDRA SAMO LABS

These names become the official identifiers of the project.

All documentation, developer references, automation workflows, release notes, reports, and engineering publications shall use these names exclusively.

Legacy repository names are considered historical only.

---

# WORKSPACE STRUCTURE

The optimization process shall dynamically determine the user's preferred workspace.

Never hard-code machine-specific paths.

Create (if necessary):

HYDRA SAMO/

Inside it create:

HYDRA SAMO LABS/

The repository root becomes:

HYDRA SAMO/
└── HYDRA SAMO LABS/

The migration must work on Linux, Windows, and macOS.

---

# DYNAMIC PATH RESOLUTION

Automatically detect:

• Current repository location

• Operating system

• Current workspace

• Existing repository name

• Existing directory hierarchy

Never assume a fixed path.

Never assume Downloads.

Never assume Documents.

Always preserve portability.

---

# SAFE REPOSITORY RENAME

If the repository currently uses temporary names such as:

hydra-review

hydra-samo-portfolio-audit-fixed

portfolio

website

test

development

prototype

or any temporary engineering name,

rename the repository safely to:

HYDRA SAMO LABS

Create the HYDRA SAMO workspace if required.

Move the repository only after validation.

---

# REFERENCE SYNCHRONIZATION

After migration synchronize every verified repository reference.

Including:

README

Markdown

Developer Guides

Shell Scripts

PowerShell Scripts

Batch Scripts

VS Code

JetBrains IDEs

Package Metadata

Installation Guides

Developer Documentation

Repository Diagrams

Folder Diagrams

Build Documentation

Asset Pipeline

Brand Book

Engineering Reports

Automation Prompts

Output Documentation

Update only actual path references.

Never replace unrelated text.

---

# SAFE MIGRATION PROTOCOL

Before renaming verify:

✓ No build dependency depends on the old location.

✓ No runtime dependency depends on the old location.

✓ No import depends on the old location.

✓ No deployment depends on the old location.

✓ No configuration depends on the old location.

✓ No environment variable depends on the old location.

✓ No asset pipeline depends on the old location.

✓ No CI/CD pipeline depends on the old location.

✓ No IDE configuration depends on the old location.

If any uncertainty exists:

Document it.

Keep the existing structure.

Never risk breaking production.

---

# REPOSITORY IDENTITY POLICY

From this optimization phase onward:

Workspace

HYDRA SAMO

Repository

HYDRA SAMO LABS

become the canonical project identity.

Old repository names may remain only inside historical documentation.

All active documentation shall use the official repository identity.

---

# BRAND BOOK SYNCHRONIZATION

After repository optimization regenerate the Brand Book.

Merge every approved repository change into the publication.

Update:

Repository Structure

Folder Hierarchy

Typography

Asset Library

Developer Documentation

Optimization Statistics

Performance Improvements

Repository Identity

Workspace Structure

Engineering Workflow

Governance

Release Information

Version History

The Brand Book must always reflect the latest approved repository state.

Generate:

HYDRA_SAMO_Brand_Book_v1.0.md

HYDRA_SAMO_Brand_Book_v1.0.html

HYDRA_SAMO_Brand_Book_v1.0.pdf

Replace previous editions.

The Brand Book becomes the latest published representation of the repository.

---

# FINAL DIRECTORY STRUCTURE

HYDRA SAMO
│
└── HYDRA SAMO LABS
    │
    ├── src
    ├── public
    ├── assets
    ├── OUTPUT
    ├── DOCUMENTATION
    ├── BRAND/DESIGN.md
    ├── BRAND/AGENTS.md
    ├── package.json
    ├── README.md
    └── ...

This directory hierarchy becomes the official project structure for all future releases.

---

# FINAL VALIDATION

Before declaring optimization complete verify:

✓ Repository relocated safely.

✓ Repository renamed successfully.

✓ Documentation synchronized.

✓ Brand Book regenerated.

✓ Zero broken imports.

✓ Zero broken assets.

✓ Zero broken routes.

✓ Zero broken scripts.

✓ Zero broken documentation links.

✓ Zero broken builds.

✓ Git history preserved.

✓ Repository remains production-ready.

---

# FINAL DECLARATION

Declare:

REPOSITORY STATUS: OPTIMIZED

PROJECT IDENTITY: OFFICIAL

WORKSPACE: HYDRA SAMO

REPOSITORY: HYDRA SAMO LABS

State that:

• Repository optimization has completed successfully.

• Repository identity has been standardized.

• Legacy repository names have been retired.

• Documentation has been synchronized.

• The Brand Book has been regenerated.

• Production functionality has been preserved.

• The project is approved for long-term maintenance, future development, version control, and production deployment.

Repository stability always takes precedence over optimization.

When optimization conflicts with stability:

Stability wins.
