# WASCIK AI Assistant Funnel — Reusable Build Module

Reusable architecture extracted from the WASCIK portfolio AI funnel project for future customer websites and internal WASCIK products.

## What this module is for

Use this module when a client needs a website AI representative, shopping assistant, lead qualifier, support assistant, page-aware concierge, or private owner AI workspace.

The design separates the visible representative from the intelligence behind it so the same engine can be reused across industries and websites.

## Reusable pieces

- `types.ts` — normalized contracts for page context, catalog items, recommendations, and assistant responses.
- `pageContext.ts` — configurable pathname-to-role resolver. Lets one assistant behave differently across service, store, merchant, private-owner, and general pages.
- `catalog.ts` — generic normalized catalog adapter helpers for product/service catalogs.
- `shoppingReasoner.ts` — deterministic intent scoring and recommendation logic that only recommends supplied catalog items.
- `widget/RepresentativeWidget.tsx` — reusable standing representative + speech-bubble widget architecture.
- `api-contracts.md` — suggested server API shapes for chat, shopping, page context, and lead capture.
- `openaiConfig.ts` — reusable server-side OpenAI environment/config helper.
- `health-route-example.ts` — safe health endpoint pattern that checks configuration without exposing secrets.
- `openai-live-route-example.ts` — reusable Responses API route with minimal reasoning effort, safer output budget, and grounded-response rules.
- `leadQualification.ts` — lightweight Stage 5 session-aware lead qualification that requires only project type, business/project context, and one contact method before handoff.
- `supabaseLeadPersistence.ts` — generic Stage 6 server-side Supabase lead persistence with deduplication support and no tenant-specific credentials.
- `stage6-lead-database.md` — reusable persistent lead database, RLS, health-check, owner handoff, minimal-alert email, and mobile implementation guidance.
- `setup-and-troubleshooting.md` — deployment, billing, Codespaces/iPhone, API-key, and error-diagnosis checklist.
- `security-patterns.md` — reusable owner-only studio/authentication guidelines.
- `sales-packaging.md` — ways WASCIK can package and sell this capability to customers.
- `../owner-console-analytics/` — reusable private owner-console, confirmation-gated action, first-party analytics, secret-recovery, and branch-consolidation patterns extracted after Stage 6 became operational.

## Architecture

1. Browser representative reads the current pathname.
2. Page-context resolver determines the assistant role and allowed knowledge scope.
3. Server endpoint receives user message + page context + short session memory.
4. Structured reasoning retrieves approved business/catalog data.
5. Lead qualifier remembers already supplied details and asks at most one missing core question at a time.
6. AI model may phrase the response, but should not invent products, prices, policies, or company claims.
7. As soon as a usable contact method is present, a server-only persistence layer may create/update the lead; business/project details can continue enriching the same row afterward.
8. Email may send a minimal owner alert after durable storage succeeds, but the private database/owner console remains the source of truth.
9. Owner-facing AI actions should be proposed first, shown in a visually distinct confirmation state, and written only after explicit authenticated owner confirmation.

## Important implementation rules

- Keep API keys and private business data server-side.
- Use explicit affiliate disclosures on monetized recommendations.
- Never rely on a hidden URL alone for an owner-only workspace; enforce server-side authentication.
- Use consent before creating an avatar or voice modeled after a real person.
- Keep business knowledge tenant-specific when deploying this for multiple clients.
- Prefer structured product/service retrieval before generative response writing.
- Add a safe configuration health check before diagnosing model failures; for databases, test a harmless real read rather than only checking whether a key exists.
- For AI providers, distinguish key authentication from a real model request: authentication can succeed while quota/billing/model access still fails.
- Keep local and production API billing separate from ChatGPT subscriptions.
- For reasoning-capable models, do not starve visible responses with overly small output-token limits.
- Default live-site widgets to a collapsed state so the assistant does not cover page content until invited.
- On iPhone Safari, use 16px or larger form-input text to avoid automatic zoom and constrain floating UI to the mobile viewport.
- Do not turn lead qualification into an interrogation. Treat budget and timeline as optional unless the business specifically requires them.
- Treat budget as planning information, not an automatic rejection criterion, unless an explicit business rule says otherwise.
- Save a lead when a usable contact method is present if the business wants immediate capture; do not force a second permission loop after the visitor has already requested contact.
- Store full lead details in the private database/owner console; email notifications should remain minimal alerts.
- Deduplicate leads so later messages in the same conversation enrich the existing row instead of creating repeated rows.
- Preserve existing CRM workflow status during enrichment; an upsert should not reset Contacted/In Progress/Closed back to New.
- Persist an alert-delivery marker (for example `alert_sent_at`) after successful notification and use database-driven idempotency where duplicate alerts matter.

## Customer deployment model

Each customer can share the same core engine while supplying their own:

- brand name and colors
- avatar/persona configuration
- service or product catalog
- FAQ and approved knowledge
- route/page rules
- lead fields and handoff destinations
- private database project and credentials
- booking or CRM integrations
- disclosure/compliance text
- OpenAI project/key and billing policy

This module is intentionally framework-friendly, but the current examples are TypeScript-first and fit Next.js/React deployments particularly well.
