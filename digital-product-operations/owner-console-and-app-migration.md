# Owner Console and App Migration Path

This guide preserves the reusable path from downloadable digital products to a private Owner Console and a customer-facing guided-workspace application.

## Architectural ruling

The current Owner Console and the future full application are not the same product.

- The **Owner Console** is the authenticated operating surface used to manage templates, products, releases, assets, prices, bundles, publication, customer access, and diagnostics.
- The **customer application** is the guided workspace where an entitled customer creates projects, completes structured sections, receives optional AI help, and exports or downloads the work.
- The **downloadable files** remain release assets and offline/customer deliverables.

Build the Owner Console controls first. Do not expose unfinished template, release, or pricing tools directly to customers.

## What the existing product work contributes

Large completed workbooks already contain valuable software specifications:

- domain workflow and section order
- prompt wording and help text
- field types and expected answers
- progress structure
- cross-reference and continuity needs
- output/export expectations
- customer onboarding instructions
- licensing and packaging expectations
- QA lessons from fillable-field testing

Treat these as source material for a template engine. Do not simply embed hundreds of static pages into the app.

## Phase 1 — Inventory and manifests

For every existing product:

1. Assign a stable product ID and slug.
2. Record its lifecycle honestly.
3. Register every tested customer asset.
4. Record checksums, file sizes, page counts, and interactive-field counts.
5. Separate customer files from seller assets and storefront configuration.
6. Create immutable release records for verified packages.
7. Flag unknown or unfinished packages instead of inferring completion.

Deliverable: the Owner Console can show one trusted inventory even before the customer app exists.

## Phase 2 — Owner product operations

Add private modules for:

- product status
- asset upload/replace
- QA checklist
- release creation
- pricing
- storefront visibility
- bundle composition
- checkout/delivery verification

Use confirmation cards for publish, retire, replace-release, price-change, and entitlement-revocation actions.

Deliverable: an owner can control what is sellable and published without editing source code.

## Phase 3 — Secure commerce and delivery

Connect:

- server-verified checkout events
- customer identity
- product and bundle entitlements
- signed or authenticated downloads
- delivery history
- replacement-release support

Never grant access from a browser-reported payment success alone. Verify the payment event server-side.

Deliverable: customers receive the correct immutable release and the owner can diagnose delivery.

## Phase 4 — First interactive template

Choose one product as the pilot and convert its structure into:

- section definitions
- prompt/field definitions
- validation rules
- help text
- project answers
- progress calculation
- autosave
- export mapping

Prove:

- mobile and desktop usability
- tenant isolation
- resume after sign-out/device change
- backup/export
- template-version stability
- migration behavior after a template update
- acceptable performance on a large project

Deliverable: one complete guided customer workspace that coexists with the downloadable edition.

## Phase 5 — AI-assisted project work

Add narrowly scoped assistance:

- explain this field
- brainstorm options
- draft from already approved project facts
- find contradictions or missing sections
- summarize current work
- suggest the next incomplete step

Store a suggestion separately until the customer accepts it. Include the template version and relevant project-record version in the AI request so advice is grounded in the correct context.

Deliverable: useful assistance without silent data changes or cross-tenant leakage.

## Phase 6 — Reuse across product categories

After the pilot is stable, reuse the engine for other domains by changing template definitions rather than rebuilding the application shell.

Shared capabilities should include:

- dashboard
- project creation
- section navigation
- field rendering
- autosave
- attachments
- AI suggestions
- export
- release downloads
- billing/entitlements

Domain-specific behavior belongs in template definitions or isolated extensions.

## Stop conditions

Do not advance a product to public app availability when:

- its release files have not passed QA
- its template version is not frozen for active customer projects
- its export has not been compared with the intended customer deliverable
- tenant/RLS tests are incomplete
- checkout or entitlement verification is simulated
- the owner cannot recover or replace a failed release
- mobile autosave/resume has not been proven

## Success condition

The migration is successful when the original product knowledge becomes a reusable guided-workspace template, the owner can control releases and publication safely, customers retain reliable downloads/exports, and the same engine can support another product category without copying the whole application.
