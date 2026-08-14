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
- `setup-and-troubleshooting.md` — deployment, billing, Codespaces/iPhone, API-key, and error-diagnosis checklist.
- `security-patterns.md` — reusable owner-only studio/authentication guidelines.
- `sales-packaging.md` — ways WASCIK can package and sell this capability to customers.

## Architecture

1. Browser representative reads the current pathname.
2. Page-context resolver determines the assistant role and allowed knowledge scope.
3. Server endpoint receives user message + page context.
4. Structured reasoning retrieves approved business/catalog data.
5. AI model may phrase the response, but should not invent products, prices, policies, or company claims.
6. Lead, booking, purchase, or human-handoff action is returned as a structured next step.

## Important implementation rules

- Keep API keys and private business data server-side.
- Use explicit affiliate disclosures on monetized recommendations.
- Never rely on a hidden URL alone for an owner-only workspace; enforce server-side authentication.
- Use consent before creating an avatar or voice modeled after a real person.
- Keep business knowledge tenant-specific when deploying this for multiple clients.
- Prefer structured product/service retrieval before generative response writing.
- Add a safe configuration health check before diagnosing model failures.
- Keep local and production API billing separate from ChatGPT subscriptions.
- For reasoning-capable models, do not starve visible responses with overly small output-token limits.
- Default live-site widgets to a collapsed state so the assistant does not cover page content until invited.

## Customer deployment model

Each customer can share the same core engine while supplying their own:

- brand name and colors
- avatar/persona configuration
- service or product catalog
- FAQ and approved knowledge
- route/page rules
- lead fields and handoff destinations
- booking or CRM integrations
- disclosure/compliance text
- OpenAI project/key and billing policy

This module is intentionally framework-friendly, but the current examples are TypeScript-first and fit Next.js/React deployments particularly well.
