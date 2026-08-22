# WASCIK Build Library

Reusable code, architecture patterns, implementation guides, and selected WASCIK project-control records.

## Available modules

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

Latest record:

- `project-control/2026-08-21-growth-engine-status.md` — current Growth Engine direction, funnel conversion work, tracking, Social & Ads capabilities, affiliate subscription attribution, branch workflow, indexing status, and the exact next-work sequence.

## Library rule

Reusable modules should stay customer-neutral. Put customer-specific branding, affiliate IDs, credentials, private business information, and deployment secrets in the customer project—not in reusable library modules. Project-control records may name WASCIK-specific implementation state, but must still exclude credentials and private secrets.
