# Network Catalog Normalization and Full-Catalog Search

Reusable rules for affiliate consoles that combine network APIs, merchant feeds, Shopify catalogs, and event inventory without leaking provider-specific data mistakes into the owner interface.

## Problem this pattern prevents

Affiliate feeds are inconsistent. A field labeled category may contain a product title, event name, SKU, numeric identifier, merchant name, country, or tracking URL. A single provider page may also represent only the first slice of a catalog. Treating those values as trustworthy produces empty searches, one-result searches, irrelevant categories, duplicate products, and category menus filled with individual products or events.

## Required architecture

1. Separate the network selector from the brand selector. Changing networks must clear brand, category, results, pagination, and any in-flight category request.
2. Give each network a server-side adapter with one normalized product contract.
3. Scope every provider request by the selected advertiser identity before applying keywords or categories.
4. Page through the provider or storefront catalog until the requested bounded search window is satisfied or the source is exhausted.
5. Deduplicate by stable provider ID, normalized destination URL, and merchant plus title.
6. Classify from product fields only. Never classify from merchant metadata, tracking URLs, IDs, countries, or network labels.
7. Return a controlled category vocabulary. Do not return raw provider category values directly to the UI.
8. Allow merchant-specific classifiers when a broad shared taxonomy is not accurate enough.
9. Preserve an explicit Other category, but keep it visible and eligible for keyword search and later reclassification.
10. Normalize known aliases before matching an advertiser or merchant.
11. Require a real image for image-required review queues; separately report legitimate image-less records.
12. For a source with no usable provider catalog, report catalog unavailable. Never substitute another merchant's products.

## Ticket and event exception

Event feeds are not ordinary product catalogs. Use region, state, venue, date, performer, and event-name fields. A category menu should contain stable regions or event types, not event IDs or individual event names. If provider event data is unavailable, do not imply that a general affiliate product API supplies live events.

## Shopify and direct-store feeds

Shopify's public products endpoint may cap a response. Follow supported pagination and stop at a deliberate safety limit. Record the retrieval count, deduplication count, records rejected for missing links or images, and whether the source was exhausted. A single 250-record response is not proof that the full catalog contains only 250 products.

## Verification matrix

For every enabled brand:

- load its category list
- search every controlled category
- run at least one broad keyword and one exact product keyword
- verify page 2 or later where inventory supports it
- confirm result counts and requested limits
- confirm brand isolation
- confirm images, destination URLs, prices, and availability
- verify aliases
- verify empty-feed behavior
- verify Other-category visibility
- record unresolved misclassifications instead of claiming full completion

Run static typing, linting, a production build, and bounded live-source checks. A build pass alone does not prove live catalog correctness.

## Privacy and portability

Keep advertiser IDs, publisher IDs, credentials, private emails, and customer-specific category lists in the adopting project. This library records the reusable control pattern only.
