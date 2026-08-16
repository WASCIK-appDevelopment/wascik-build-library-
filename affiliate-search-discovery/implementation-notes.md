# Implementation Notes

## Provider boundary

Call affiliate APIs only from authenticated server routes. Read credentials from environment variables and return normalized product fields to the owner UI. Health checks should report only configured/not configured or a sanitized provider status.

## Brand/category batching

Create the Cartesian product of selected brands and categories. Fetch every pair independently and label every response section with both values. A selected count is per pair: two brands x two categories x five results requests up to 20 qualified candidates.

## Brand and commission validation

Use provider merchant, campaign, catalog, or advertiser identifiers for brand matching. Do not accept a record just because the product title contains a selected brand name. Exclude entries marked noncommissionable, zero-commission, inactive, or outside an approved contract when those fields are available.

## Session behavior

Store displayed IDs, skipped candidates, chosen candidates, filters, and current result batches in session storage when the requirement is “do not repeat during this sign-in.” Restore those values after an accidental refresh. Clear the storage key during sign-out.

## Merchant-page health

Resolve affiliate redirects and inspect the final merchant destination. Treat 404/410 as strong failure signals. Apply sold-out or unavailable text detection only on a product-specific path; a merchant homepage can contain unrelated sold-out text. Surface possible duplicates for owner review instead of silently deleting them.

## Image quality and repair

Prefer provider feed images. If an approved product lacks a usable image, retrieve og:image or twitter:image from its actual product-specific merchant page. Persist approved image overrides server-side. Do not scrape a merchant homepage and attach a generic image to a product.

## Ticket and event searches

Only expose state/date filters when the selected provider returns structured event location and date fields. A general product marketplace connection does not guarantee live event inventory. Keep a visible “provider not connected” state instead of returning unrelated products.

## Approval, publication, and removal

Choosing a product creates a review queue entry. Durable approval, publication, unpublication, and removal are separate actions. Each should use an exact proposal, short-lived confirmation token, owner authentication, server validation, and an audit result. Place published products inside their brand section and nearest matching category—not after disclosures or footers.

## Security

- Never return provider tokens to the client.
- Limit API scopes to required endpoints.
- Cap brands, categories, result counts, exclusions, redirects, response bytes, and timeouts.
- Avoid logging secrets or full authorization headers.
- Preserve third-party affiliate destinations and tracking parameters.
- Keep ignore and image-override tables service-role-only.
- Keep customer identifiers and affiliate IDs outside this reusable module.
