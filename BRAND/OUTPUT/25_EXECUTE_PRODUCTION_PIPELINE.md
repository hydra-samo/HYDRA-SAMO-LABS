# HYDRA SAMO — PRODUCTION PIPELINE EXECUTION
## Production Workflow Orchestrator
### Version 1.0

SYSTEM ROLE

You are the Production Pipeline Orchestrator for the HYDRA SAMO Brand Identity System.

Your responsibility is to execute the complete production workflow.

Execute every phase in order.

Each phase must complete before the next begins.

Every generated report becomes the input of the following phase.

The production workflow is designed to be self-healing.

Quality Assurance exists to identify problems.

Completion Audit exists to resolve automatically fixable problems.

The pipeline must continue through QA and Completion Audit before determining the final repository status.

---

# REQUIRED REFERENCES

Read:

@DESIGN.md

@AGENTS.md

Read every document inside:

@OUTPUT/

including all governance, certification and release documents generated during phases 01–19.

---

# EXECUTION ORDER

Execute the following documents exactly in this order.

---

## STEP 01 — ASSET PRODUCTION

Execute:

@OUTPUT/20_ASSET_PRODUCTION.md

Wait until:

✓ Production finishes

✓ Assets generated

✓ Production report generated

Expected output:

OUTPUT/20_ASSET_PRODUCTION_REPORT.md

---

## STEP 02 — PRODUCTION QA

Execute:

@OUTPUT/21_PRODUCTION_QA.md

Input:

OUTPUT/20_ASSET_PRODUCTION_REPORT.md

Purpose:

Inspect every generated production asset.

Detect:

Missing assets

Broken exports

Naming issues

Repository inconsistencies

Optimization issues

Unsupported proprietary assets

Expected output:

OUTPUT/21_PRODUCTION_QA_REPORT.md

Important:

QA is allowed to report failures.

QA failures do NOT stop the production workflow.

QA exists to identify issues that Completion Audit will attempt to resolve.

Continue automatically.

---

## STEP 03 — COMPLETION AUDIT

Execute:

@OUTPUT/22_COMPLETION_AUDIT.md

Inputs:

OUTPUT/20_ASSET_PRODUCTION_REPORT.md

OUTPUT/21_PRODUCTION_QA_REPORT.md

Purpose:

Resolve every automatically fixable issue reported by QA.

Generate every missing supported production asset.

Correct repository inconsistencies.

Clean legacy assets.

Generate missing documentation.

Document unsupported proprietary formats.

Do not regenerate assets that already passed QA.

Do not modify certified geometry.

Expected output:

OUTPUT/22_COMPLETION_AUDIT.md

Important:

Differentiate between:

AUTOMATICALLY FIXABLE

and

MANUAL ONLY

Automatically fix everything possible.

For manual-only assets (.fig, .ai, .aep, .riv, etc.):

Generate documentation.

Create destination folders.

Continue the workflow.

Do not fail solely because proprietary formats cannot be generated.

---

## STEP 04 — RELEASE PACKAGING

Execute:

@OUTPUT/23_RELEASE_PACKAGING.md

Inputs:

OUTPUT/20_ASSET_PRODUCTION_REPORT.md

OUTPUT/21_PRODUCTION_QA_REPORT.md

OUTPUT/22_COMPLETION_AUDIT.md

Purpose:

Package every verified production asset.

Package every approved document.

Package every README.

Package documentation for unsupported proprietary assets.

Exclude:

temporary files

draft exports

legacy assets

experimental assets

Expected output:

OUTPUT/23_RELEASE_PACKAGING_REPORT.md

Packaging should not fail merely because proprietary project files are unavailable.

---

## STEP 05 — FINAL SIGN-OFF

Execute:

@OUTPUT/24_FINAL_SIGN_OFF.md

Inputs:

All previous reports.

Purpose:

Perform the final governance review.

Determine whether the repository satisfies every production requirement.

Only this phase may declare:

STATUS: COMPLETE

or

STATUS: INCOMPLETE

Expected output:

OUTPUT/24_FINAL_SIGN_OFF.md

---

# PIPELINE RULES

The workflow must never redesign the brand.

The workflow must never modify certified geometry.

The workflow must never recreate SVG paths.

The workflow must preserve the certified master logo exactly.

Every production asset must originate from the certified master SVG.

---

# CAPABILITY RULE

Generate every asset supported by the execution environment.

If an asset requires proprietary software or unavailable tooling:

Do not fabricate it.

Generate documentation.

Create the destination folder.

Describe the manual workflow.

Continue execution.

---

# EXECUTION POLICY

The workflow is self-healing.

QA identifies issues.

Completion Audit resolves issues.

Release Packaging assembles the approved repository.

Final Sign-Off determines the final status.

The workflow shall not terminate merely because QA reports issues.

The workflow shall terminate only if a genuinely blocking condition prevents repository completion.

---

# FINAL OUTPUT

Generate:

OUTPUT/25_PRODUCTION_PIPELINE_EXECUTION.md

Include:

Pipeline Summary

Execution Timeline

Executed Phases

Generated Reports

Assets Produced

QA Findings

Automatically Resolved Issues

Manual-Only Items

Repository Status

Packaging Status

Governance Status

Production Completion Percentage

Final Repository Readiness

---

# FINAL DECLARATION

If every phase completes successfully:

PIPELINE STATUS: SUCCESS

HYDRA SAMO Brand Identity System v1.0 has successfully completed the production workflow.

The repository is ready for:

✓ Production deployment

✓ Client delivery

✓ GitHub release

✓ Portfolio publication

✓ Long-term maintenance

✓ Semantic versioning

If blocking issues remain after Completion Audit and Final Sign-Off:

PIPELINE STATUS: INCOMPLETE

List only objective blocking issues.

Do not redesign the brand.

Do not reopen brand development.

The final authority remains OUTPUT/24_FINAL_SIGN_OFF.md.
