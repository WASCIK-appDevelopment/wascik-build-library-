# Provider Categories, Filters, and Manual Review Queues

Reusable affiliate-discovery workflow for reducing irrelevant results and unnecessary database/media traffic.

## Discovery sequence

1. Select an approved network.
2. Select an approved merchant/brand.
3. Request that merchant's actual category or taxonomy values when the provider exposes them.
4. Normalize the provider labels for display without replacing the original provider identifiers.
5. Let the owner select one or more merchant categories.
6. Apply optional filters:
   - price range
   - availability
   - discount/promotion
   - product type
   - include keywords
   - exclude keywords
7. Fetch a bounded result set for each selected brand/category pair.
8. Display each candidate in a review card with an explicit Select action.
9. Move selected candidates into a durable Ready Products queue.
10. Publish, remove, or generate advertising material only through separate confirmation-gated actions.

Do not pretend every affiliate network exposes merchant-level categories. When a provider lacks them, fall back to feed categories, verified product-type values, or a clearly labeled keyword search.

## State separation

Keep these states distinct:

- **Search candidates**: temporary/session results; not published
- **Ready Products**: owner-selected durable records awaiting action
- **Published Products**: live catalog records
- **Suppressed Products**: reversibly hidden originals
- **Ad Drafts**: temporary creative metadata/reference snapshots

Search result cards should not become durable database records until the owner selects them. Persist compact product metadata and approved source URLs; avoid copying remote images into application storage merely to review them.

## Manual catalog audit

Opening the affiliate page should not automatically crawl every published product. That behavior can create avoidable network, database, and egress use.

Use a manual action such as **Run product health audit**:

- owner starts it intentionally
- show the last audit time
- process bounded batches
- store compact findings
- require confirmation before unpublishing/deleting
- distinguish timeout/bot block from verified unavailability
- allow reversible suppression and restoration

A weekly owner-initiated audit is often sufficient for a small catalog. Scheduling should be an explicit business decision, not an invisible page-load side effect.

## Ad handoff without media round-trips

An ad can begin from:

- a current search candidate
- a Ready Product
- a Published Product

Pass a compact product snapshot or product identifier to the ad workspace. Resolve the current approved source image server-side when generation begins. Keep the working canvas in the browser where practical, download/share the finished ad to the owner's device, and discard temporary media after completion unless cloud persistence was explicitly chosen.
