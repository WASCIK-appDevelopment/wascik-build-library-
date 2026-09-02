# WASCIK Build Library

Reusable code, architecture patterns, implementation guides, and selected WASCIK project-control records.

## Available modules

### Digital Product Operations + Guided Workspace
Path: `digital-product-operations/`

Reusable foundation for:

- structured workbook and guided-system templates
- customer project instances and autosaved answers
- product, asset, QA, release, pricing, and bundle controls
- fillable PDF, editable-document, and app-workspace delivery
- confirmation-gated publication
- secure customer entitlements and downloads
- AI suggestions that remain separate until human acceptance
- staged migration from downloadable products to an owner console and customer application

Start with `digital-product-operations/README.md`.

### Growth Engine Marketing + Conversion
Path: `growth-engine-marketing/`

Reusable foundation for:

- conversion-focused service funnels
- primary-offer and low-pressure CTA design
- first-party funnel-event tracking
- UTM/campaign attribution
- persistent social-ad workspaces
- saved ad and media libraries
- affiliate campaign/subscription attribution
- parallel multi-agent Git branch collaboration

Start with `growth-engine-marketing/README.md`.

### Social Ads Creative System
Path: `social-ads-creative-system/`

Reusable foundation for:

- prompt-first social-ad generation
- owner identity/product fidelity controls
- Creative Director planning
- multi-pass visual QC and repair
- deterministic typography/compositor layers
- affiliate brand and product/event campaigns
- platform-aware CTAs
- AI usage/rate-limit handling
- full approved/published-product access through one guided workspace
- fixed face/product-safe copy panels with independent QC flags
- device-local picture recovery and iPhone save flows
- post-ready written downloads without internal metadata

Start with `social-ads-creative-system/README.md`.

### Supabase Free-Tier Operations
Path: `supabase-free-tier-operations/`

Reusable foundation for:

- free-tier-first database/storage architecture
- device/iCloud-first permanent media handling
- internal storage caps below provider limits
- egress protection
- billing-anchor monthly egress estimates
- request-on-entry provider usage snapshots with manual refresh
- work-in-progress media policies
- photo-library cleanup and byte budgets
- overwrite-in-place temporary voice/media
- analytics/database growth controls

Start with `supabase-free-tier-operations/README.md`.

### AI Assistant Funnel
Path: `ai-assistant-funnel/`

Reusable foundation for:

- AI website representatives
- service-business lead qualification
- affiliate and e-commerce shopping assistants
- page-aware assistant behavior
- normalized multi-brand catalogs
- deterministic product recommendation reasoning
- private owner AI/content studios
- avatar/digital representative deployments
- customer packaging and recurring-service models

Start with `ai-assistant-funnel/README.md`.

### Owner Console + First-Party Analytics
Path: `owner-console-analytics/`

Reusable foundation for:

- private owner dashboards
- confirmation-gated AI database actions
- CRM status/note/follow-up workflows
- secure passcode auto-submit and recovery patterns
- repeat-contact lead history without overwrites
- shared liquid-glass navigation and stable iPhone detail drawers
- first-party outbound affiliate/referral click tracking
- site/page visit analytics
- Codespaces secret recovery
- safe consolidation of divergent feature branches with newer `main` work

Start with `owner-console-analytics/README.md`.

### Affiliate Search + Review Discovery
Path: `affiliate-search-discovery/`

Reusable foundation for:

- server-only affiliate-network product search
- multi-brand and multi-category batch planning
- owner-selected result counts
- session-only seen/skipped-product exclusion
- image-required candidate review
- conditional ticket location/date filtering
- confirmation-gated catalog publication and removal
- merchant-page product health monitoring and duplicate review
- false-positive-resistant product availability checking
- reversible suppression/restoration of original catalog products
- persistent product/brand warning ignores
- merchant metadata thumbnail repair
- separate ready-to-publish and complete published-product inventories

Start with `affiliate-search-discovery/README.md`.

### Affiliate Storefront
Path: `affiliate-storefront/`

Reusable foundation for:

- multi-brand affiliate catalogs
- merchant navigation and dedicated brand routes
- product and event cards
- affiliate and ticket-resale disclosures
- reliable local-image handling in Next.js

Start with `affiliate-storefront/README.md`.

### Conversion Thank-You Page
Path: `conversion-thank-you-page/`

Reusable foundation for:

- post-inquiry and post-purchase confirmation pages
- Google Ads and analytics destination-based conversion tracking
- search-safe `noindex` conversion routes
- responsive owner-portrait and brand presentation
- safeguards against false conversions and private URL data

Start with `conversion-thank-you-page/README.md`.

### Netlify Deployment Safeguards
Path: `netlify-deployment-safeguards/`

Reusable guidance for:

- importing production environment variables into Netlify
- keeping GitHub/Codespaces secrets separate from Netlify
- preventing public `SUPABASE_URL` values from causing false secret-scan failures
- preserving protection for Supabase service-role keys and other credentials
- manual cleared-cache production deployment while automatic publishing remains locked

Start with `netlify-deployment-safeguards/README.md`.

## Project control records

Operational records capture WASCIK-specific project state without storing credentials or private secrets.

Latest records:

- `project-control/2026-08-21-growth-engine-status.md` — current Growth Engine direction, funnel conversion work, tracking, Social & Ads capabilities, affiliate subscription attribution, branch workflow, indexing status, and the exact next-work sequence.
- `project-control/2026-08-25-digital-products-versa-foundation.md` — current WASCIK Digital Solutions author-product inventory, storefront checkpoint, and the controlled path for reusing the products in the Owner Console and future Versa application.
- `project-control/2026-08-25-small-business-forms-bundle.md` — completed Small-Business Forms Bundle release, verified package and QA facts, Business Tools storefront placement, pricing state, repository checkpoint, and remaining checkout/deployment controls.
- `project-control/2026-09-01-owner-console-verso-os-checkpoint.md` — latest Owner Console source checkpoint, liquid-glass/mobile/access/lead/affiliate/egress lessons, Alpha Level 0 boundary, production lock, and controlled next sequence toward Versa OS.
- `project-control/2026-09-02-social-ads-known-good.md` — owner-verified Social Ads baseline covering full product access, guided generation, post-ready copy, protected face/product composition, device-local recovery, iPhone export, security, and production lock.

## Library rule

Reusable modules should stay customer-neutral. Put customer-specific branding, affiliate IDs, credentials, private business information, and deployment secrets in the customer project—not in reusable library modules. Project-control records may name WASCIK-specific implementation state, but must still exclude credentials and private secrets.
