# Safe Consolidation of a Divergent Feature Branch

Use this when a long-lived feature branch contains major work but `main` has also moved forward with unrelated or overlapping updates.

## Avoid the risky shortcut

Do not force a merge merely because the feature branch is far ahead. If it is also behind `main`, shared files may silently replace newer production work.

## Safe procedure

1. Compare the branches and record `ahead_by`, `behind_by`, and changed files.
2. Identify conflict surfaces: shared layouts, configuration, navigation, catalogs, metadata, or frequently edited pages.
3. Create a temporary integration branch **from the newest `main`**.
4. Layer additive feature subtrees onto that current baseline.
5. For shared/conflicting files, preserve the newer `main` logic first, then manually add only the required feature changes.
6. Preserve both histories when appropriate with a normal merge/integration commit; do not rewrite history unless there is a specific approved reason.
7. Verify critical files/features from both sides after integration.
8. Advance `main` only after the integration branch is confirmed to be a descendant of current `main` or otherwise safely mergeable.
9. Close obsolete/conflicted PRs so the team has one clear baseline.
10. Re-run build, lint/tests, and key route checks from the consolidated branch.

## Verification checklist

Verify at least:

- new feature routes still exist
- newer `main` routes/content still exist
- shared metadata/config retained intended changes from both sides
- secrets were not copied into source
- deployment was not triggered unintentionally
- the team knows which branch is now authoritative

## State language

A successful Git merge does not mean a feature is deployed. Track these separately:

`built -> tested -> committed -> merged -> deployed -> live -> externally verified`

This distinction is especially important when production publishing is deliberately manual.