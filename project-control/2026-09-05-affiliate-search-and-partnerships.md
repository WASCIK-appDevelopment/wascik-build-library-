# WASCIK Affiliate Search and Partnership Checkpoint

Controlling checkpoint date: September 5, 2026

## Control boundaries

- Repository work is performed on `main` unless Michael explicitly creates and authorizes a different branch.
- A GitHub commit is not proof of a Netlify deployment.
- Do not publish Netlify without Michael's explicit approval.
- Affiliate invitations, conditional emails, network acceptance, console enablement, product publication, advertising permission, and strategic integration are separate states.

## Confirmed remote-main affiliate work

The portfolio remote `main` history includes:

- `68163fc3829d983833aad00388383fff01e8057e` - normalized Focus Camera categories and regional TicketNetwork state selection for Arkansas, Missouri, Mississippi, Tennessee, Oklahoma, Texas, and Louisiana.
- `00ea12eb32fd91f299b9d4fa7ef83f87bd9f49b9` - blocked raw product titles, event names, SKUs, and IDs from Impact category menus.
- `7a1eb158f2c30efe33638f1f6baf83ff7cab7d25` - tightened Impact brand-category scoping and prevented stale category requests from overwriting the current selection.
- `5b8e0f9d60db2c5b0ca1f6547d62d2177a6a3d0e` - repaired affiliate brand product publishing.
- `298c1c10d1c9ea80eaebeb4301f0e7a469517c69` - improved affiliate search and added Zlike Hair.
- `01002b8f22a6fc39055c7808aee100fd952e83d7` - ANTHBOT storefront with tracked products and disclosures.

## Latest verified but not remotely published work

A later every-brand test performed 68 bounded live checks. TypeScript, ESLint, diff review, and the production build passed. Two portfolio files were changed, but the work was reported as not pushed and not published. It repaired EuroOptic sunglasses discovery, Focus Camera classification, the REVOMADIC alias, Philips categories, and Shopify/Awin pagination and deduplication. A minor Zlike Hair half-wig classification remains. This state must not be represented as remote-main or live production until separately committed, pushed, and deployed with approval.

## Catalog findings and controls

The audit observed very different catalog sizes and quality:

- EuroOptic: 173,807 records; broad searches could be crowded out.
- Focus Camera: about 28,871 records; severe feed misclassification was observed.
- COOFANDY: 56,902 records; broad Fashion classification required better product discovery.
- AquaCurve: 77 records.
- DHgate: about 1.66 million records; Other Products visibility and classification required attention.
- Philips: 87 records, including 7 classified as Other.
- ArcCaptain: 850 records.
- Simple Project: 134 records, initially all falling into Other.
- Zlike Hair: source responses capped at 250 and included unusable product-type/SKU values.
- GearUP and ANTHBOT: no usable provider product catalog was available; the console should report unavailable rather than substitute unrelated products.

## ANTHBOT

ANTHBOT is an active Impact relationship and the public storefront is recorded as implemented with Genie, M5, and N8 products, images, tracked links, and disclosures. Console brand aliases, routing, publishing allowlist, database rendering, and three published products are recorded as completed. Daytime N8 and nighttime Genie advertisements are completed.

Pending: complete the Impact contract archive/review, confirm creative-use rules, retrieve approved banners/images/videos/coupons/copy, organize approved assets, archive the completed ads, optionally add them to the owner ad library, verify current prices, and monitor performance.

## GearUP

GearUP for Mobile is associated with GearUP Portal Pte Ltd, Impact program 53368, and recorded 50% payout terms. Written authorization was received for official promotional assets available through Impact Content -> Assets. No usable provider catalog was available during the audit.

Pending: retrieve and organize the authorized assets and verified product information, package valid tracked links, create a controlled manual-import set, place it into the console for owner review, and publish only after confirmation. Do not use unrelated feed records as substitutes.

## COOFANDY promotion restriction

The reviewed terms prohibit affiliate retargeting and paid Meta advertising without written approval. DSP promotion requires advance written approval. Organic social promotion may proceed only when otherwise compliant. The advertiser may reverse up to 100% of a commissionable action, and media partners may not fire their own completion tracking pixel. Store these restrictions in promotion-policy controls before advertising.

## Awin - Simple Project and Zlike Hair

The console separates Impact and Awin brands. Simple Project uses an Awin/direct Shopify catalog path and requires full pagination, deduplication, usable categories, images, and keyword search.

Zlike Hair Awin program 102013 was accepted. Recorded terms include 10% commission and a 45-day cookie. Bespoke terms prohibit trademark bidding and use of the brand in paid-search display URLs or ad copy; Google Shopping/PLA promotion is prohibited without permission. Where a structured Awin field conflicts with bespoke terms, apply the stricter bespoke restriction. The storefront is `https://zlikehair.com`.

## Rewarx Studio AI

Rewarx Studio AI is an Awin invitation, merchant/profile 129153, for an AI service that creates product photography, mockups, model images, listing assets, and advertising graphics. At evaluation it was a new Shopify application launched May 11, 2026 with zero Shopify reviews. Public prices reviewed were Starter $29.90, Growth $54.90, and Scale $129.90 monthly.

The reviewed offer states 50% commission for the first 12 months of a continuous paid subscription and a 30-day attribution window. Editorial, social, and email promotion are permitted. Paid search does not earn the standard commission and was treated as prohibited for operational control. Cancellation and later reactivation without the affiliate link may break continued attribution.

A conditional-acceptance email was sent to Rewarx on September 4, 2026. It requested written confirmation of monthly versus annual commission treatment, complimentary testing, agency/commercial-use rights, generated-asset ownership, client-image privacy and AI-training treatment, retention/deletion, advance notice of term changes, legal business details, and an affiliate-support contact. Acceptance also depends on successful product-quality testing.

Current status: conditions sent; response not documented; testing incomplete; Awin invitation not accepted; not approved for advertising. Michael intends to use and recommend Rewarx if it passes testing and the conditions are accepted. A possible deeper future integration with WASCIK Versa OS is an idea only and was not offered or agreed.

## Immediate continuation

1. Preserve the verified unpushed catalog-search fixes and move them to remote `main` through a reviewed commit.
2. Re-run the 68-check matrix and confirm the Zlike Hair half-wig classification.
3. Retrieve and organize authorized GearUP and ANTHBOT assets through their approved sources.
4. Keep no-feed brands available for controlled manual import without showing unrelated products.
5. Await Rewarx's written response; test the product before any Awin acceptance or promotion.
6. Do not publish Netlify without Michael's explicit approval.
