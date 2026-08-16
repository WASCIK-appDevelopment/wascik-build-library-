# Implementation Notes

## Provider boundary

Call affiliate APIs only from authenticated server routes. Read credentials from environment variables and return normalized product fields to the owner UI. Health checks should report only configured/not configured or a sanitized provider status.

## Brand/category batching

Create the Cartesian product of selected brands and categories. Fetch every pair independently and label every response section with both values. This prevents the first brand returned by a provider from consuming the whole result limit.

## Session behavior

Store displayed IDs, skipped candidates, chosen candidates, filters, and current result batches in session storage when the requirement is “do not repeat during this sign-in.” Restore those values after an accidental refresh. Clear the storage key during sign-out.

## Image quality

When products will feed advertising workflows, accept only candidates with a usable image URL. Normalize common provider image field names and protocol-relative URLs. A production system should also validate broken or blocked image URLs before durable approval.

## Ticket and event searches

Only expose state/date filters when the selected provider returns structured event location and date fields. A general product marketplace connection does not guarantee live event inventory. Keep a visible “provider not connected” state instead of returning unrelated products.

## Approval and publication

Choosing a product creates a review queue entry. Durable catalog approval and public storefront publication are separate actions and should require a confirmation step, server-side authorization, validation, and an audit record.

## Security

- Never return provider tokens to the client.
- Limit API scopes to required read endpoints.
- Cap selected categories, brands, result counts, exclusions, and request timeouts.
- Avoid logging secrets or full authorization headers.
- Preserve third-party affiliate destinations and tracking parameters.
- Keep customer identifiers and affiliate IDs outside this reusable module.
