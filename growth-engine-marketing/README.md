# Growth Engine Marketing + Conversion

Reusable patterns extracted from the WASCIK Growth Engine work for turning a public website into a measurable acquisition system.

## Use this module for

- conversion-focused service funnels
- low-friction introductory offers
- first-party funnel event tracking
- campaign/UTM attribution
- public-to-owner lead flow design
- persistent social-ad workspaces
- reusable ad libraries and photo libraries
- affiliate-brand campaign workflows
- ad-source email subscription attribution
- safe parallel Git branch collaboration

## Conversion funnel pattern

A cold-traffic funnel should lead with one clear primary offer before broader capabilities.

Recommended order:

1. Specific offer and price/value proposition.
2. Primary CTA and lower-pressure secondary CTA.
3. Proof or transparent demonstration material.
4. Included scope and direct-support expectations.
5. Honest explanation of introductory pricing when relevant.
6. Broader services only after the primary offer is understood.
7. Advanced AI/automation capabilities as an expansion path, not a distraction.
8. Final no-pressure contact CTA.

Do not fake testimonials or customer proof. If a business is early-stage, use clearly labeled portfolio demonstrations, concept projects, or live demos instead.

## Funnel event tracking pattern

Track the actions that reveal purchase intent, not only page views.

Useful events include:

- funnel page viewed
- primary offer clicked
- ask-a-question CTA clicked
- phone CTA clicked
- demo/portfolio clicked
- final CTA section reached
- form submitted or email action initiated

Capture campaign context when present:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- landing path
- referrer
- generated/session identifier

Keep tracking first-party and low-PII. Reuse an existing event table when the schema supports a generic event name plus metadata instead of creating unnecessary new database tables.

## Social-ad workspace pattern

The owner-facing ad system should work as a persistent workspace instead of a one-shot generator.

Reusable components:

- service/product selector
- persistent "ad work in progress" record
- guard before replacing an existing draft
- generated preview storage
- owner-edit path
- saved ad library
- photo/media library
- platform selection
- brand/service-specific creative profiles
- affiliate product/event search
- cost/usage visibility for AI generation

A draft should survive navigation and allow the owner to resume rather than recreate work.

## Affiliate subscription attribution

Subscription forms can preserve the visitor's acquisition context without exposing private tracking data.

Useful attribution fields:

- source type (`brand_page`, `generated_ad`, `affiliate_services`)
- source key / campaign identifier
- source path
- product identifier when applicable
- ad platform when applicable

A generated ad can append safe query parameters that let the subscription form remember which campaign, brand, or product brought the visitor in.

## Parallel branch collaboration pattern

When multiple agents/conversations are working on the same repository, use one shared integration branch for combined development testing.

Rules:

1. Each worker reads the current remote branch state before writing.
2. Keep ownership boundaries clear (for example public funnel vs owner console).
3. Commit directly to the shared integration branch only when the user has designated it for that purpose.
4. Do not merge the shared branch into production/default branch without explicit approval.
5. Local Codespaces should normally only need `git pull` to receive combined remote work.
6. If a local branch and remote branch diverge, merge normally; never force-push over unseen remote work.
7. Configure `pull.rebase=false` when merge-based pulls are the desired default.

## Production-state vocabulary

Always distinguish:

- built
- committed
- pushed
- merged into integration branch
- merged into production branch
- deployed
- live
- indexed
- measured

A feature can be built and testable on an integration branch without being live in production.

## Reuse boundaries

Keep reusable library material customer-neutral. Production projects should inject their own pricing, contact details, service names, database configuration, API keys, brand assets, and campaign identifiers.
