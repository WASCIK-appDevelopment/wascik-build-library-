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

Resolve affiliate redirects and inspect the final merchant destination. A tracking host may return 404/410 to server monitoring while the same affiliate link still works in a browser; treat an unresolved tracking-host failure as **review**, not proof of removal.

Never search the entire HTML document for generic phrases such as “out of stock” or “sold out.” Those words may belong to recommendations, hidden variants, menus, scripts, or unrelated products. Accept stock warnings only from:

- structured product availability data such as Schema.org `OutOfStock`, `SoldOut`, or `Discontinued`; or
- a product-specific availability/status region in the rendered HTML.

A structured `InStock`, `PreOrder`, or equivalent positive signal overrides stray stock wording. Page-level “product not found” and “discontinued” messages may remain strong signals after the checker reaches a product-specific merchant URL.

Timeouts, bot blocks, incomplete HTML, and network failures are inconclusive. Bring those records to the owner as review items; never auto-remove them.

## Original-product suppression and restoration

Manage pre-existing or hard-coded products with stable product keys and a service-role-only suppression table. Filter suppressions from every unified catalog consumer: public storefront, Published Products, health scanning, duplicate checks, and AI catalog answers.

Removing an original product inserts or updates one suppression record after confirmation. Restoring it deletes that suppression record. Do not remove source objects, company sections, category mappings, or sort metadata during routine owner operations.

## Image quality and repair

Prefer provider feed images. If an approved product lacks a usable image, retrieve og:image or twitter:image from its actual product-specific merchant page. Persist approved image overrides server-side. Do not scrape a merchant homepage and attach a generic image to a product.

## Ticket and event searches

Only expose state/date filters when the selected provider returns structured event location and date fields. A general product marketplace connection does not guarantee live event inventory. Keep a visible “provider not connected” state instead of returning unrelated products.

## Approval, publication, and removal

Choosing a product creates a review queue entry. Durable approval, publication, unpublication, removal, and restoration are separate actions. Each should use an exact proposal, short-lived confirmation token, owner authentication, server validation, and an audit result. Place published products inside their brand section and nearest matching category—not after disclosures or footers.

## Security

- Never return provider tokens to the client.
- Limit API scopes to required endpoints.
- Cap brands, categories, result counts, exclusions, redirects, response bytes, and timeouts.
- Avoid logging secrets or full authorization headers.
- Preserve third-party affiliate destinations and tracking parameters.
- Keep ignore, image-override, and suppression tables service-role-only.
- Keep customer identifiers and affiliate IDs outside this reusable module.
