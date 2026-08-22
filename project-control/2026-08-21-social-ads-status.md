# WASCIK Social & Ads Project Control Record — 2026-08-21

This record captures the Social & Ads owner-console state at the end of the August 21, 2026 work session. It is operational WASCIK project history; reusable patterns are documented separately in `social-ads-creative-system/README.md`.

## Shared branch state

Active integration branch:

`agent/social-ads-content-planner`

At the end-of-session verification, the branch was:

- 110 commits ahead of `main`
- 0 commits behind `main`

The branch currently contains both the Social & Ads owner-console work and current Growth Engine work from parallel ChatGPT workstreams.

Do not merge or deploy merely because work is pushed. Production deployment remains a separate explicit action.

## Photo-ad generator status

The stable wrapper currently points to:

`PhotoAdComposerV6`

Earlier versions remain in the project as rollback points.

### V6 behavior

- prompt-first Simple Creative Director UI
- blank prompt invokes WASCIK house defaults
- owner photo library selection
- Generate / Regenerate / Save flow
- technical controls hidden under Advanced Overrides
- strong identity preservation by default when an owner photo is used
- exact product-reference preservation where available
- product/shared/owner hero logic
- gaze/expression/interaction overrides available when needed
- generated scene instructed to remain free of readable advertising text
- deterministic compositor adds final ad typography
- richer typography hierarchy instead of plain all-white copy
- automatic product/service benefit callouts
- accent styling and checkmark/pill benefit treatment
- platform-aware CTA behavior including LINK IN BIO where appropriate
- QC readout for identity, product, interaction, and hero scores
- multi-pass validation and targeted identity repair retained from earlier versions

## Creative Director status

The server-side Creative Director accepts short natural-language instructions and produces a structured production plan.

Current house-default rules include:

- preserve owner identity closely unless explicitly overridden
- infer product/service positioning from merchant, title, category, and creative profile
- keep important copy away from face/product details
- generate headline + support copy + 2–3 truthful product/service benefit callouts
- prefer social-appropriate CTA treatment
- keep generated photographic scene text-free
- do not invent prices, guarantees, unsupported specifications, availability, or personal experience

Short prompts should be enough, for example:

- `Put me in this AquaCurve chair and make it premium.`
- `Put these shoes on me and make them the hero.`
- `Make me look at the camera and smile.`
- `Show off my tattoos and muscular build.`

## Affiliate campaign selection

The Social Ads home now supports a dedicated Affiliate Brand Campaigns section in addition to individual product/event selection.

Brand-level campaign cards added for:

- GearUP
- ArcCaptain
- TicketNetwork

Behavior:

- GearUP can be advertised as its core gaming-network-optimization service
- ArcCaptain can be advertised at brand/category level even without individual product feed access
- TicketNetwork can be advertised both as a general ticket marketplace and through individual event records

Existing individual affiliate product/event search remains available below the brand-campaign section.

Future task: review approved GearUP email/assets and determine which supplied screenshots/marketing materials may be stored in My Photos or attached to the GearUP campaign profile.

## Navigation fix

A product-selection bug in GitHub Codespaces preview was traced to hard navigation using `window.location.assign()`.

The Social Ads picker now uses Next.js internal routing so selecting an ad remains inside the forwarded preview application instead of escaping to a GitHub/Codespaces page.

An in-page Replace Current Ad confirmation panel is retained to avoid unreliable native confirmation behavior on iPhone Safari.

## WASCIK service media fitting

WASCIK first-party service cards support owner-approved imagery rather than affiliate-image recovery.

The fitting workflow preserves the original phone upload and creates a separate service-card derivative.

Available fitting behavior includes:

- fit entire photo
- fill box
- stretch to box
- free edit reset
- shrink/enlarge
- independent width stretch
- independent height stretch
- horizontal positioning
- vertical positioning

## Private libraries and persistence

Current private owner-console media/data includes:

- My Photos
- My Ad Library
- Ad Work in Progress
- saved ad preview
- persisted voice recording attachment
- WASCIK service approved media assignments

Private storage uses server-authorized Supabase access with RLS/no-public-policy design.

## OpenAI cost/usage monitoring

The owner console contains three usage gauges:

- Leads
- Ads
- Overall remaining working budget

Important logic:

- Leads and Ads use the private WASCIK feature ledger
- Overall reconciles provider organization-cost reporting against tracked feature spend
- the working-budget remainder is an internal configured estimate, not a direct OpenAI prepaid-wallet balance

Development and production may use separate OpenAI Admin API keys. The development key is stored in the development secret environment and the production key in Netlify environment variables.

Netlify environment-variable changes require a fresh deployment before server routes can read the new values.

## Rate-limit issue observed

A red OpenAI message was observed in the usage panel indicating too many requests / a request-per-minute limit had been reached.

The usage gauge currently refreshes automatically once every 60 seconds and also supports manual refresh.

One visible ad generation can create multiple provider requests:

- Creative Director plan
- image generation/edit
- QC validation
- retry pass when required
- identity-repair pass when required
- separate organization-cost refresh

A short burst can therefore reach an OpenAI requests-per-minute limit even when the owner only tapped Generate once or twice.

### Recommended next hardening

- add brief server-side caching to `/api/owner/openai-costs`
- debounce/lock duplicate usage refresh requests
- honor OpenAI 429 `Retry-After` behavior
- add exponential backoff only where a retry is appropriate
- avoid automatically retrying expensive image generation repeatedly during a rate-limit event
- display a clear owner message such as `OpenAI is temporarily rate-limiting requests. Wait a moment and try again.`

## Next Social & Ads work

After one V6 photo-ad test confirms the new compositor is acceptable:

1. inspect the voice/recording section
2. add AI voice-direction rules for sophisticated, confident, conversational, authoritative, energetic, warm, sales-focused, pacing, emphasis, and pauses
3. improve generated written ads with stronger hooks, platform-specific structure, tasteful emojis, checkmark benefit lists, stronger CTAs, and more variation
4. add smart CTA/destination display support so ads can show LINK IN BIO plus a clean destination label without rendering ugly raw tracking URLs
5. later review approved partner assets from GearUP/ArcCaptain/TicketNetwork emails and attach permitted media to campaign profiles

Do not update production solely to test unfinished Social & Ads changes unless explicitly approved.
