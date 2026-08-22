# WASCIK Growth Engine Project Control Record — 2026-08-21

This record captures the WASCIK project state confirmed during the August 21, 2026 work session. It is operational project history, not a reusable customer-neutral module.

## Strategic direction confirmed

WASCIK Growth Engine should not be a simple ClickGrow clone. ClickGrow is being treated as a competitive benchmark for AI marketing automation, while WASCIK is being designed as a broader connected system combining:

- brand intelligence
- AI funnel builder
- CRM/lead management
- social/content automation
- reviews/reputation automation
- listings/local SEO
- AI receptionist
- email/SMS follow-up
- ads/campaign automation
- conversion analytics
- owner console

Immediate business priority shifted from adding more product features to acquiring traffic, leads, and the first paying customers.

## Customer-acquisition focus

Primary introductory offer:

- professional one-page small-business website
- $324 introductory price
- mobile-friendly design
- business/services presentation
- clear call/contact actions
- two revision rounds
- direct developer communication

Acquisition strategy discussed:

- direct local outreach first
- social content and paid/organic campaign traffic second
- local SEO / Google visibility in parallel
- use WASCIK itself as Customer #1 for the Growth Engine
- measure the real acquisition path before automating more of it

## Public funnel conversion work completed

The public `/start-project` route was rebuilt around the primary $324 offer.

Changes include:

- primary offer moved to the top of the funnel
- stronger price/value headline
- primary CTA: Claim the $324 Website
- softer CTA: Ask Michael a Question
- direct phone CTA
- portfolio/demo proof before broader services
- explicit statement that the Summit example is fictional demonstration material, not fabricated customer proof
- explanation that the $324 price is an introductory client-portfolio-building offer
- broader apps/AI/e-commerce/branding/support capabilities moved below the primary website offer
- AI assistant content moved lower so it supports the sale instead of competing with it
- final no-pressure CTA section
- homepage offer banner added so the $324 website special is visible earlier in the visitor journey

Production/main commit chain for this funnel work included:

- `4352e97e574950d28901b63841433b294f0321a6` — Add conversion-focused start project funnel
- `da5ed28bcd3d9e18d95291d5b8edbad62196314c` — Route start project page to conversion funnel
- `76c68075ad515244656ce2ec7738df3de2739e45` — Add homepage website offer banner
- `715420707bb07adbc91efce548f2e987aaa3a0cd` — Surface website offer on homepage

## Funnel conversion tracking completed

A first-party funnel-event layer was added on the shared integration branch without rewriting the funnel component or touching the owner console.

Files added/changed:

- `app/start-project/FunnelEventTracker.tsx`
- `app/api/funnel-event/route.ts`
- `app/start-project/layout.tsx`

Tracked events:

- `funnel_view`
- `claim_324_click`
- `ask_michael_click`
- `call_click`
- `demo_click`
- `final_cta_view`

Attribution captured when present:

- source
- medium
- campaign
- landing path
- session ID
- referrer
- user agent

Implementation deliberately reuses `site_visit_events` instead of requiring a new database table. Event and attribution metadata are encoded into the stored path fragment/query payload while retaining the existing analytics storage pattern.

## Social & Ads / Growth Engine work confirmed on integration branch

The shared branch contains a substantial owner-facing social advertising system that was not yet represented in the Build Library index before this update.

Confirmed capabilities include:

- persistent Ad Work in Progress state
- resume-current-ad workflow
- replacement warning before overwriting an existing ad draft
- WASCIK service campaign selection
- affiliate brand campaign selection
- published affiliate product/event search
- dedicated work-in-progress ad workspace
- saved ad library
- owner photo/media library
- photo-ad composer iterations
- owner-edit routes for generated creative
- ad preview persistence
- ad library API
- social-ad image generation API
- social-ad email content API
- social-ad creative-director API
- OpenAI usage/cost visibility components
- reusable social-ad creative profile logic

The Social & Ads area is being treated as an owner workspace rather than a one-shot generator so an ad can be started, saved, resumed, edited, and reused.

## Affiliate subscription attribution confirmed

Affiliate pages now contain an email subscription pattern that can remember what brought the visitor to the form.

Confirmed source types:

- affiliate services landing page
- individual affiliate brand page
- generated ad

Attribution can preserve:

- brand/campaign source key
- source path
- product identifier
- ad platform

This allows future promotional email segmentation based on the visitor's demonstrated interest without changing the affiliate destination itself.

## Important earlier work now represented in the library

The Build Library already documented several affiliate discovery/storefront patterns, but this control record specifically confirms additional capabilities that had been implemented in the project and should not be forgotten:

- manual affiliate product photo upload and persistence
- Ready Products bulk publication controls
- saved catalog search cursors / continuation from previous catalog pages
- persistent product history and reset controls
- duplicate-aware publication behavior
- malformed affiliate URL filtering
- Impact deep-link construction and prevention of double wrapping
- false-positive-resistant product availability checking
- reversible removal/restoration of original products
- dedicated COOFANDY and DHgate affiliate pages and sitemap entries

## Search / indexing status

Google Search Console showed seven affiliate-service URLs in `Discovered - currently not indexed` status. Google had discovered the URLs through the sitemap. Validation was started on August 21, 2026.

Known affected URLs shown included:

- `/affiliate-services`
- `/affiliate-services/aquacurve`
- `/affiliate-services/eurooptic`
- `/affiliate-services/focus-camera`
- `/affiliate-services/gearup`
- additional affiliate-service URLs lower in the report

Operational rule: do not repeatedly restart validation while Google's current validation run is active. The report's last-update timestamp may lag behind newly deployed code.

## Git / branch workflow established

Current shared development/integration branch:

`agent/social-ads-content-planner`

Purpose:

- both active ChatGPT workstreams can place compatible development work on one remote integration branch
- the user can pull one branch into Codespaces and see the combined dev state
- production `main` is not automatically changed by work on this branch

Rules established:

1. Read latest remote branch state before making changes.
2. Keep work areas separated when possible (public funnel/tracking vs owner console/social ads).
3. Do not force-push over remote work from another conversation.
4. Pull/merge remote updates when local and remote histories diverge.
5. `git config pull.rebase false` was selected so normal pulls use merge behavior.
6. Do not merge the integration branch back into `main` until explicitly approved.
7. Pulling `main` into the integration branch does not push integration-branch work back to `main`.

At the last branch comparison during this session, `agent/social-ads-content-planner` was 105 commits ahead of `main` and 0 behind after the funnel-tracking commits were added. This count is a point-in-time status and will change as new commits are added.

## Deployment state

The user is currently testing and developing from the integration branch and does not want unrelated integration-branch work automatically deployed to production.

Do not equate:

- branch commit with production deployment
- local dev visibility with live Netlify state
- Google discovery with Google indexing

## NEXT WORK — resume here

### Immediate next step

Verify the new funnel conversion events end-to-end in development and confirm that events actually reach `site_visit_events` with the expected encoded event/campaign metadata.

Validation sequence:

1. Pull latest `agent/social-ads-content-planner` into the active Codespace.
2. Run the dev server.
3. Open `/start-project` with and without UTM parameters.
4. Trigger each tracked CTA/action once.
5. Confirm records are being written successfully.
6. Confirm `final_cta_view` is not firing repeatedly or excessively.
7. Confirm tracking failures never block navigation, mail, phone, or demo actions.

### After tracking verification

Build the owner-facing conversion report for the Growth Engine so the owner can see:

- funnel visits
- $324 claim clicks
- question clicks
- calls
- demo views
- final CTA reaches
- conversion rate by source/campaign
- date-range comparison

This should be added carefully to the owner analytics area only after checking the current owner-console work from the other active conversation to avoid collisions.

### Customer-acquisition work after measurement is visible

- create campaign-specific URLs using UTM parameters
- produce social/ad creative pointing directly to `/start-project`
- develop the free website-review/audit lead offer as the lower-commitment acquisition path
- begin structured Central Arkansas small-business prospecting
- measure real traffic and revise funnel copy/layout based on observed behavior rather than speculation

### Do not prioritize yet

Do not add large new Growth Engine features merely for breadth until the current funnel is receiving enough real traffic to produce meaningful conversion data.
