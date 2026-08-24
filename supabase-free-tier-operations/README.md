# Supabase Free-Tier Operations

Reusable WASCIK architecture for keeping small production projects inside Supabase's free-plan database, storage, and egress limits for as long as practical.

## Core rule

Treat Supabase as application infrastructure, not as a permanent media warehouse.

Recommended ownership split:

- Supabase: small business records, current working state, compact metadata, temporary/reusable references
- owner device / iCloud / external archive: finished ads, original full-resolution photos, permanent recordings, export files, backups

Do not sacrifice AI generation quality merely to save database/storage space. Keep the high-quality generation pipeline and reduce what is persisted afterward.

## Internal guardrails

Set application-level caps below provider hard limits so the product warns or blocks before the account reaches a quota.

Example internal policy for a 1 GB Storage free tier:

- reusable owner-photo library: 24 items maximum
- reusable owner-photo storage budget: about 100 MB
- per-photo upload: 5 MB maximum
- finished generated ads: device/iCloud only
- rolling WIP previews: browser-local; do not persist every few seconds
- WIP voice: one overwrite-in-place temporary object, not an archive
- old ad library: read/delete only during migration to device-first storage

Use warning levels such as 60%, 75%, and 90% for future usage dashboards.

## Egress protection

Storage size alone is not enough. Repeated reads of the same large objects can exhaust monthly egress.

Avoid:

- uploading a full canvas every few seconds
- loading dozens/hundreds of full-resolution private photos on every owner-console visit
- issuing fresh signed URLs continuously
- keeping large finished-image libraries in Supabase when the owner can save them locally
- polling analytics or usage endpoints unnecessarily

Prefer:

- explicit/manual saves
- overwrite-in-place current-state objects
- longer cache lifetimes for stable private references where appropriate
- smaller library caps
- compact API responses
- pagination / result limits
- local device storage for permanent media

## Work-in-progress pattern

Persistent WIP should keep small structured state in the database:

- selected product/service id and snapshot
- platform
- objective / notes
- generated text result
- timestamps/status

Large preview media should not autosave repeatedly. If persistent preview recovery is truly required, checkpoint infrequently and use a compressed format. Otherwise keep the canvas in-browser and export the finished result to the owner's device.

## Finished-media pattern

For owner-only generated assets, prefer a browser save/share flow:

1. Render the final canvas.
2. Convert to a file/blob.
3. Use the Web Share API when supported (especially iPhone).
4. Fall back to a local download.
5. Do not POST the finished file to Supabase unless the user explicitly opts into cloud persistence.

Legacy Supabase media libraries can remain read/delete-only until the owner removes old assets.

## Photo-library pattern

A reusable photo library should be intentionally small.

Before accepting an upload:

- validate MIME/type
- enforce per-file byte limit
- query current item count and stored bytes
- reject uploads that exceed internal item or byte budget
- tell the owner to remove old references and keep permanent originals elsewhere

Display current library bytes in the UI and provide easy single-item and bulk cleanup controls.

## Voice/media pattern

Do not create a new storage object for every take.

For WIP voice:

- overwrite one predictable current-object path
- enforce a small byte cap
- label it temporary
- keep permanent/master recordings on device/iCloud or another intentional archive

## Analytics/database growth

Event tracking can also consume database capacity over time.

Use:

- first-party low-PII events
- session-side dedupe for one-time visibility events
- compact metadata
- allowlists for event names
- aggregation/retention strategy before event volume becomes large
- limits on owner-console result queries

Do not store full provider payloads, generated images, verbose prompts, or redundant copies in analytics tables when compact identifiers/metadata are enough.

## Deployment policy

Development secrets and production secrets remain separate. Free-tier optimizations should work consistently in development, branch deploys, and production.

Do not rely on provider grace periods as normal capacity. Treat temporary complimentary overages as time to fix architecture before the next billing cycle.

## Reuse boundary

Keep free-tier policy constants customer-neutral and centralized (for example `supabaseFreeTierPolicy.ts`). Consuming projects can override thresholds later when moving to a paid plan, without rewriting storage routes.
