# Dynamic Console-Published Affiliate Storefront

Reusable Next.js pattern for replacing hard-coded merchant product cards with a shared, database-driven storefront controlled from a private owner console.

## Core design

- Keep brand identity, route slug, disclosure, fallback copy, and approved destination policy in a shared brand registry.
- Render all merchant routes through one reusable product-list component or route template.
- Read only approved and published products on public pages.
- Keep search candidates, Ready Products, published products, suppressed products, and removed products as distinct states.
- Route publication through a server allowlist; never trust a client-supplied destination path.
- Preserve stable brand landing buttons even when a merchant currently has no provider feed.
- Show a truthful empty state instead of unrelated products or invented placeholder inventory.
- Keep network search and public rendering separate so a provider outage does not corrupt already approved catalog content.

## No-feed merchant workflow

A merchant may have an active contract but no usable network product feed. Support an authorized manual-import path using:

- approved merchant assets or network creative
- verified product titles, descriptions, prices, images, and destination URLs
- stable product IDs
- documented creative-use permission
- owner review before Ready Products
- confirmation-gated publication

Never scrape or copy unofficial assets when the merchant requires approved creative.

## Route and data safeguards

1. Normalize brand aliases to one canonical ID.
2. Maintain the same destination in the brand registry, publication API allowlist, and public renderer.
3. Require disclosure on every route.
4. Deduplicate by stable ID and canonical destination.
5. Keep product images associated with the specific product.
6. Make unpublication reversible.
7. Treat price, inventory, subscription terms, and events as changeable.
8. Keep deployment separate from a source commit; public production changes require the project's deployment approval.

## Verification

For every brand route, verify mobile rendering, empty states, published-product retrieval, image dimensions, outbound tracking, disclosure, duplicate behavior, suppression/restoration, and production build output.
