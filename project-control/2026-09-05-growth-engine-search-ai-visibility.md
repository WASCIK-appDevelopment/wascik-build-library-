# WASCIK Growth Engine Search and AI Visibility Control Record - 2026-09-05

This is a WASCIK-specific project-control record. Reusable customer-neutral patterns are stored in `search-ai-visibility/`.

## Source scope

This checkpoint reconciles usable information from:

1. Theo Website Analysis.
2. ClickGrow Comparison.
3. Growth Engine / Search Visibility work through September 5, 2026.

The September 1 controlling handoff remains the consolidated historical source through that date. This record adds the later implementation and audit delta without claiming that unverified production changes are live.

## Controlling workflow

- Production repository: `WASCIK-appDevelopment/wascik-portfolio`
- Production branch: `main`
- Hosting: Netlify
- Publishing: manual and owner-controlled
- A GitHub commit is not presumed deployed
- Build, commit, push, deployment, live verification, indexing, ranking, citation, and conversion remain separate states

## Search foundation recorded through September 1

- Search Console ownership verified through the root HTML-file method
- sitemap processed
- homepage indexed and eligible
- HTTPS valid
- Business Profile publicly active
- Yelp active
- branded searches visible
- non-branded Little Rock and Arkansas service searches remained the primary gap
- COOFANDY and DHgate canonical corrections were recorded as committed, deployed, and live, pending recrawl
- service-area model confirmed: no public storefront; services remote or at customer locations by appointment
- private residential address must not be presented as a walk-in location

## Reusable source records in the production project

- `growth-engine/wascik-site-profile.json`
- `growth-engine/keyword-opportunity-map.json`
- `growth-engine/keyword-opportunity-brief.md`
- `growth-engine/ai-citation-authority-monitoring-plan.md`
- `docs/growth-content-backlog.md`
- `docs/local-profile-consistency-checklist.md`
- `app/robots.ts`
- `app/sitemap.ts`

Customer-neutral versions of the transferable patterns are now represented in `search-ai-visibility/`.

## September 3 implementation

Commit `38bc5a1a5835bf2f84a9f52056e1bb2008c50008` - `Strengthen local and AI search signals`

Files:

- `app/layout.tsx`
- `app/start-project/ConversionProjectPage.tsx`
- `public/llms.txt`

The change strengthened structured identity and local-service signals, expanded visible service and FAQ content, and added an AI-orientation file. At the recorded verification point, the GitHub change existed but the new `/llms.txt` response was not yet confirmed live. Netlify publication remained a separate owner-controlled action.

## Latest search and AI-discovery interpretation

- Branded discovery was strong in the recorded tests.
- Competitive non-branded local discovery remained weak.
- Google could identify the business and its profiles, but broad service recommendations favored established competitors with stronger reviews, citations, and local authority.
- The main constraint was not basic crawlability. It was non-branded relevance, third-party authority, genuine reviews, and measurable conversion.
- The latest conversation audit reported a larger live sitemap than the September 1 handoff. Treat the exact live URL count as a dated audit value and verify production again after each deliberate deployment.

## Current priority order

1. Deliberately publish and verify the authorized search changes when the owner approves.
2. Confirm `/llms.txt`, structured data, service content, sitemap, canonicals, and crawler rules on production.
3. Complete and test the genuine lead conversion path.
4. Strengthen the highest-value Little Rock and Arkansas service pages.
5. Earn genuine customer reviews.
6. Align Google, Yelp, Bing, social profiles, and legitimate directories.
7. Publish useful original resources and case studies.
8. Measure branded/non-branded search, AI citations, and qualified leads weekly.

## Guardrails

- Do not publish the private residential address.
- Do not describe the residence as a public storefront.
- Do not fabricate reviews, citations, client results, or personal product experience.
- Do not promise rankings, traffic, leads, sales, or platform approval.
- Do not copy the Google verification token into reusable examples.
- Do not automatically publish Netlify.
