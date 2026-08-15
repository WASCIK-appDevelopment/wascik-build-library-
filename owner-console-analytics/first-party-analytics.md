# First-Party Click and Visit Analytics

A reusable pattern for collecting simple business telemetry in a private owner console while preserving external merchant/network attribution.

## Outbound click pattern

For affiliate, referral, partner, booking, or merchant links:

1. Visitor clicks the original outbound URL.
2. Browser sends a small first-party analytics event to the application's own endpoint using `sendBeacon` or `fetch(..., { keepalive: true })`.
3. The original outbound URL opens normally.
4. Server validates the destination and stores the event in a private analytics table.

Do **not** require an intermediate open redirect solely for analytics. That adds security risk and can complicate external attribution.

### Suggested event fields

- `created_at`
- generated/session identifier
- merchant/source label
- item/offer label
- source pathname
- destination URL or destination host
- referrer when useful
- user-agent/device context only when genuinely needed

Avoid identity fields unless there is a separate consented business requirement.

## Auto-tracking pattern

A document-level click listener can cover a whole storefront/affiliate route tree. It should:

- run only inside the intended route scope
- ignore same-origin navigation
- ignore unsupported protocols
- identify explicitly tracked links and skip them to prevent double counting
- infer merchant/item labels from route, host, or nearby card text
- never block the destination if analytics fails

## Site/page visit pattern

A lightweight client component can record a visit on selected public pages. Keep internal/admin routes excluded unless intentionally measured.

Recommended dashboard metrics:

- total events
- last 24 hours
- last 7 days
- estimated unique sessions
- top source pages
- top merchants/items
- recent activity

## Accuracy language

A generated browser/session identifier is useful for rough unique-session analytics, but it is **not** a guaranteed unique-human count. Browsers, private mode, device changes, storage clearing, and shared devices can change the result.

## Privacy and retention

Collect the minimum needed for the business question. Define retention limits for high-volume event tables. Do not mix private CRM identity data into click analytics merely because both are stored in the same database.