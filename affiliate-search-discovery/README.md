# Affiliate Search + Review Discovery

Customer-neutral patterns for a private owner console that retrieves real affiliate products from approved network APIs, separates results by brand and category, repairs catalog images, and controls publication and health-review actions.

## Use this module for

- server-only affiliate-network API adapters
- category and multi-brand product discovery
- exact per-brand x per-category batch quotas
- owner-selected batch sizes with a safe maximum
- session-only seen/skipped-product exclusion
- approval queues that do not publish automatically
- merchant-page product health checks after affiliate redirects
- product- and brand-level health-warning ignores
- duplicate detection and review
- missing-thumbnail repair from merchant metadata
- separate ready-to-publish and published-product inventories
- confirmation-gated publication and removal
- conditional ticket location and date filters when a ticket provider supports them

## Files

- `network-product-search.example.ts` - provider-neutral search and normalization.
- `batch-matrix.example.ts` - Cartesian brand/category planning so every pair gets its own quota.
- `session-review-state.example.ts` - session-only seen, skipped, and selected-product state.
- `merchant-health-scanner.example.ts` - redirect-aware merchant checks, homepage safeguards, and duplicate keys.
- `catalog-image-repair.example.ts` - merchant metadata image extraction for missing thumbnails.
- `health-ignore-schema.sql` - service-role-only ignore and image-override tables.
- `published-catalog-workflow.md` - durable state separation, placement, and confirmation rules.
- `implementation-notes.md` - security, UX, provider limitations, and publication-gate rules.

## Core rules

1. Keep network credentials on the server. Never send access tokens to the browser.
2. Search every selected brand/category pair separately. Two brands x two categories x five means up to 20 results.
3. Match an actual merchant/brand field, not a product title that merely contains the brand name.
4. Exclude noncommissionable records when the provider exposes commission eligibility.
5. Treat the requested count as a per-pair maximum, not a promise that enough qualified products exist.
6. Reject invented products. Every candidate must come from an approved catalog or connected provider response.
7. Repair missing images only from the actual product-specific merchant page or approved feed metadata.
8. Preserve session-only exclusions until sign-out; durable rejects or ignores require explicit business actions.
9. Separate approval, publication, health review, and unpublication into distinct owner states.
10. Require confirmation and server authorization before every durable catalog mutation.
11. Do not imply that a general product API provides live ticket inventory. State/date search requires event data from the connected provider.

This module intentionally excludes customer names, account IDs, credentials, private emails, affiliate tracking IDs, and provider-specific tenant identifiers.
