# Digital Product Operations + Guided Workspace

Reusable architecture extracted from the process of turning large guided workbooks into tested customer packages and a future application workspace.

This module is intentionally customer-neutral. It documents the parts that can be reused in an owner console, a multi-tenant SaaS product, or a guided-project application without copying a customer's workbook text, branding, contact information, prices, credentials, or private project data.

## Use this module for

- structured workbook and guided-system templates
- section, prompt, field, and instruction definitions
- customer project instances and autosaved answers
- product/version/release management
- fillable PDF, editable document, and app-workspace delivery
- customer-file and seller-file separation
- QA gates before a product can be sold or published
- product bundles and entitlements
- owner-controlled prices, storefront state, and release status
- AI assistance scoped to one project and subject to human confirmation
- migration from static digital products into a reusable software platform

## Core separation

Keep five concepts separate:

1. **Template definition**
   - reusable sections, prompts, field types, guidance, and validation rules
   - contains no customer answers

2. **Customer project instance**
   - one customer's working copy created from a specific template version
   - contains autosaved answers, progress, notes, and optional attachments

3. **Release package**
   - immutable sellable snapshot with approved customer assets
   - may include a fillable PDF, editable document, quick-start guide, license, and cover

4. **Seller configuration**
   - price, launch price, checkout provider reference, listing copy, preview images, and storefront state
   - must not be baked into customer ZIP files when it needs to change independently

5. **Operational control**
   - owner-facing QA, release, pricing, bundle, publication, support, and analytics workflows

This separation lets a product begin as downloadable files and later become an interactive app without discarding the product structure already developed.

## Recommended product lifecycle

Use explicit states rather than a single `complete` flag:

1. `idea`
2. `content_draft`
3. `template_ready`
4. `customer_files_built`
5. `qa_in_progress`
6. `sellable`
7. `published`
8. `retired`

Important distinctions:

- **Content complete** does not mean customer files exist.
- **Files built** does not mean fields, links, downloads, and packaging were tested.
- **Sellable** does not mean publicly published.
- **Branch-ready storefront code** does not mean production is live.
- **Published** should require an authenticated, confirmation-gated owner action.

See `workflow-state-machine.example.ts`.

## Template model

A guided template should support:

- stable template and version identifiers
- ordered sections and subsections
- ordered prompts/fields
- field types such as short text, long text, number, date, choice, checklist, table, and attachment reference
- help text and worked examples
- optional/required rules
- conditional visibility
- validation rules
- progress calculation
- export labels and layout hints
- domain-specific cross-references

Do not store the working application as one large document blob. Store the template structure and customer answers separately so the app can autosave, search, validate, export, and migrate them.

## Owner Console modules

Recommended private modules:

- **Template Manager** — create, version, duplicate, archive, and compare guided systems
- **Product Manager** — connect templates to customer-facing products and formats
- **Release Manager** — run QA gates and create immutable customer releases
- **Asset Registry** — track covers, PDFs, editable documents, guides, licenses, previews, and ZIPs
- **Bundle Manager** — define included releases, bundle order, savings, and entitlement behavior
- **Pricing & Storefront** — control prices and availability without modifying customer packages
- **Customer Access** — view entitlement and delivery status without exposing raw storage paths
- **Support & Diagnostics** — record file/version problems and replacement releases
- **Analytics** — measure views, checkout starts, purchases, downloads, project starts, section progress, and completion

All high-impact actions should use the confirmation-gated pattern from `owner-console-analytics/confirmed-owner-actions.md`.

## Customer application workspace

A future app can turn the same product templates into:

- a project dashboard
- step-by-step guided sections
- autosaved fields
- completion indicators
- search and cross-linking
- notes and attachments
- version history
- continuity/consistency checks
- AI-assisted brainstorming and review
- fillable PDF or editable-document export
- customer-controlled download and backup

The downloadable product remains valuable as an offline/export format. The app becomes another delivery and working mode, not a reason to discard the original product.

## AI assistance boundaries

AI may:

- explain a prompt
- propose draft answers
- summarize the customer's own project data
- identify gaps or contradictions
- suggest next actions
- transform approved structured answers into an export draft

AI must not:

- silently overwrite customer answers
- invent customer facts and save them as confirmed data
- publish a product or change a price without confirmation
- access another tenant's project
- train on or reuse private customer content without an authorized policy
- claim an export or checkout succeeded without a verified result

Store AI suggestions separately from accepted customer answers until the customer confirms them.

## File and asset rules

- Keep seller materials separate from customer downloads.
- Keep prices and checkout configuration outside customer ZIPs.
- Give every release asset a kind, checksum, size, version, and QA state.
- Do not expose private storage paths or permanent public URLs when authenticated delivery is required.
- Preserve replaced releases for audit and customer-support recovery.
- A new release should not silently change an old customer's working project without a migration decision.

## Bundle rules

- A bundle should reference immutable product releases, not vague product names.
- Record the included release version for every bundle item.
- Validate that each item is independently sellable before the bundle can be sellable.
- Keep bundle pricing separate from file contents.
- Grant entitlements per included product so customers can access individual workspaces and downloads.

## Multi-form release pattern

For products made from a numbered collection of reusable forms, preserve one stable inventory across every delivery format.

- Give every form a permanent code, category, title, and order.
- Build a combined fillable edition for customers who want one organized system.
- Build a combined editable edition when deeper customization is part of the offer.
- Include individual editable files when customers may need to reuse or share one form at a time.
- Generate a product manifest and interactive-field manifest from the same inventory.
- Verify page count, field count, field naming, saved-value persistence, cover placement, and ZIP contents before assigning `sellable` status.
- Keep quick-start and license documents inside the customer package.
- Keep seller launch materials, pricing rules, promotional limits, and operational manifests outside the customer download.
- Publish only approved preview assets to a public storefront; protect the release files behind verified payment and entitlement delivery.

A complete customer package and a functioning storefront card are separate checkpoints. A form bundle may be `sellable` while checkout and production publication remain incomplete.

## Security and tenancy

- Put organization/customer ownership on every durable project and entitlement record.
- Enforce row-level access in the database and re-authorize on server write routes.
- Use server-only storage signing and payment verification.
- Never trust a browser-supplied price, release status, entitlement, or tenant identifier.
- Store secrets only in approved environment/secret systems.
- Keep reusable examples free of production credentials, personal emails, private workbook answers, and tenant-specific identifiers.

## Included reference files

- `product-manifest.example.ts` — typed product, release, asset, and bundle contracts
- `workflow-state-machine.example.ts` — explicit lifecycle transitions and sellable-release checks
- `data-model.sql` — customer-neutral PostgreSQL/Supabase reference schema
- `owner-console-and-app-migration.md` — staged path from downloadable products to owner-console and app modules

## Implementation order

1. Normalize the existing product inventory into manifests.
2. Preserve the current tested customer files as release assets.
3. Build the private Product, Asset, QA, and Release modules first.
4. Add bundle and pricing controls.
5. Add secure checkout, entitlements, and delivery.
6. Convert one product template into an interactive customer workspace.
7. Prove autosave, export, migration, backup, and tenant isolation.
8. Reuse the engine for additional product categories.

Do not attempt to convert every large workbook into the app at once. Prove the template engine and customer workspace with one product before broad migration.
