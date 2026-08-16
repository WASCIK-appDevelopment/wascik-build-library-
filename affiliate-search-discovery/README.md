# Affiliate Search + Review Discovery

Customer-neutral patterns for a private owner console that retrieves real affiliate products from approved network APIs, separates results by brand and category, and keeps review decisions scoped to the current signed-in session.

## Use this module for

- server-only affiliate-network API adapters
- category and multi-brand product discovery
- separate brand/category result batches
- owner-selected batch sizes with a safe maximum
- session-only seen/skipped-product exclusion
- approval queues that do not publish automatically
- product-image requirements for future ad creation
- conditional event-location and date filters when a ticket provider supports them
- graceful fallback when a provider is unavailable

## Files

- `network-product-search.example.ts` - provider-neutral batch planner, image requirement, and result normalization.
- `session-review-state.example.ts` - session-only seen, skipped, and selected-product state.
- `implementation-notes.md` - security, UX, provider limitations, and publication-gate rules.

## Core rules

1. Keep network credentials on the server. Never send access tokens to the browser.
2. Search each selected brand/category combination separately so one brand cannot fill another brand's batch.
3. Treat the requested count as a per-batch maximum, not a promise that the provider has enough matching products.
4. Reject invented products. Every candidate must come from an approved catalog or connected provider response.
5. Require a usable product image when the downstream workflow includes ads or social creative.
6. Mark displayed candidates as seen for the current signed-in session so repeat searches return a new population.
7. Clear session-only exclusions on sign-out. Durable rejections require a separate explicit business decision.
8. Choosing a product adds it to a review queue; it does not publish to a public storefront.
9. Use a final confirmation gate before durable approval or publication.
10. Do not imply that a general affiliate-network product API provides live ticket inventory. Location/date filtering requires event data from the connected provider.

This module intentionally excludes customer names, account IDs, credentials, private emails, affiliate tracking IDs, and provider-specific tenant identifiers.
