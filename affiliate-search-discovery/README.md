# Affiliate Search + Review Discovery

Customer-neutral patterns for a private owner console that retrieves real affiliate products from approved network APIs, separates results by brand and category, repairs catalog images, and controls publication and health-review actions.

## Use this module for

- server-only affiliate-network API adapters
- provider/merchant category and multi-brand product discovery
- price, availability, discount, product-type, and keyword filtering
- exact per-brand x per-category batch quotas
- owner-selected batch sizes with a safe maximum
- session-only seen/skipped-product exclusion
- approval queues that do not publish automatically
- merchant-page product health checks after affiliate redirects
- false-positive-resistant product availability checking
- reversible suppression and restoration of original/hard-coded products
- product- and brand-level health-warning ignores
- duplicate detection and review
- missing-thumbnail repair from merchant metadata
- owner-supplied photo uploads for image-less Ready Products
- malformed and explicitly invalid affiliate-link rejection
- partial bulk publication that publishes clean products and leaves duplicates for review
- separate ready-to-publish and published-product inventories
- confirmation-gated publication and removal
- conditional ticket location and date filters when a ticket provider supports them
- network switching, full-catalog pagination, controlled taxonomy, alias normalization, and truthful no-feed states
- contract-aware promotion controls and staged partnership acceptance

## Files

- `network-product-search.example.ts` - provider-neutral search and normalization.
- `batch-matrix.example.ts` - Cartesian brand/category planning so every pair gets its own quota.
- `session-review-state.example.ts` - session-only seen, skipped, and selected-product state.
- `merchant-health-scanner.example.ts` - redirect-aware merchant checks, product-specific availability parsing, and duplicate keys.
- `catalog-image-repair.example.ts` - merchant metadata image extraction for missing thumbnails.
- `ready-product-image-upload.example.tsx` - mobile-friendly blank-thumbnail upload control.
- `ready-product-image-upload-route.example.ts` - authenticated storage and Ready Product persistence.
- `validated-affiliate-links.example.ts` - syntax and explicit malformed-link filtering.
- `partial-bulk-publication.example.ts` - publish clean products while retaining duplicates.
- `health-ignore-schema.sql` - service-role-only ignore, image-override, and original-product suppression tables.
- `published-catalog-workflow.md` - durable state separation, placement, and confirmation rules.
- `implementation-notes.md` - security, UX, provider limitations, and publication-gate rules.
- `category-filter-review-queue.md` - provider taxonomy selection, layered filters, temporary candidates, Ready Products, manual audits, and low-egress ad handoff.
- `network-catalog-normalization.md` - network/brand isolation, full-catalog pagination, category normalization, alias handling, event exceptions, and live verification.
- `affiliate-partnership-intake.md` - contract evaluation, SaaS/AI diligence, promotion permissions, testing gates, and acceptance-state controls.

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
11. Validate affiliate links before review, but do not treat a timeout or merchant bot block as proof that a link is invalid.
12. Offer manual image upload only on durable Ready Products after the owner can inspect the destination link.
13. During bulk publication, publish nonduplicates and leave duplicate candidates in Ready Products for explicit review or removal.
14. Keep every public destination route in both the client destination list and the server allowlist.
15. Do not imply that a general product API provides live ticket inventory. State/date search requires event data from the connected provider.
16. Never flag generic “out of stock” wording found anywhere in a page; require product-specific availability evidence and honor positive InStock signals.
17. Remove original products with reversible suppression records so company sections, categories, routes, and sort placement remain intact.
18. Do not crawl the full catalog merely because the owner opened the page; run bounded health audits only through an intentional action or approved schedule.
19. Keep search candidates temporary until the owner selects them into Ready Products; do not persist every result or copy every remote image into application storage.
20. Never expose raw provider category values until they pass a controlled taxonomy; product names, event names, SKUs, and IDs are not categories.
21. Page through bounded provider results and record whether the source was exhausted; the first page is not the whole catalog.
22. If a provider supplies no usable catalog, report that state and use only an authorized manual-import workflow.
23. Enforce advertising permissions from structured contract data and apply the stricter rule when network fields conflict with bespoke advertiser terms.

This module intentionally excludes customer names, account IDs, credentials, private emails, affiliate tracking IDs, and provider-specific tenant identifiers.
