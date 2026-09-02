# Social Ads Creative System

Reusable architecture extracted from the WASCIK Social & Advertising owner-console work.

## Use this module for

- prompt-first social-ad generation
- owner/photo identity preservation
- product-reference fidelity
- multi-pass visual QC
- brand/category creative profiles
- brand-level affiliate campaigns and individual product/event campaigns
- persistent ad workspaces
- private photo and finished-ad libraries
- platform-aware CTA behavior
- AI usage/cost visibility
- device-first finished-ad export with low-egress working media
- mobile-first owner-console UX
- full approved/published-product access from one ad workspace
- device-local picture-ad recovery and iPhone export
- post-ready written downloads without internal metadata
- protected copy-panel validation for both faces and exact products

## Included reusable artifacts

- `local-picture-ad-store.example.ts` — one-current-draft IndexedDB Blob recovery without a database round-trip.
- `post-ready-download.example.ts` — configurable publishable-copy export that excludes internal metadata.
- `test-checklist.md` — private-preview coverage for product access, written posts, picture QC, device recovery, security, and iPhone behavior.

## Core architecture

Use a four-stage pipeline instead of asking one model to do everything at once:

1. **Creative Director**
   - accepts short plain-English instructions
   - supplies house defaults when the owner gives little or no direction
   - resolves ad mode, identity lock, hero priority, interaction, layout, style, headline, support copy, benefit callouts, CTA, scene brief, and negative constraints

2. **Image scene generator/editor**
   - uses owner and product references when available
   - creates the photographic scene only
   - must not render readable advertising copy inside the scene

3. **QC validator**
   - checks visible identity fidelity, exact-product fidelity, requested interaction, hero prominence, and copy-safe face placement
   - rejects outputs below configured thresholds instead of silently accepting them
   - may trigger a targeted identity-repair pass

4. **Deterministic compositor**
   - adds all final ad typography after the image passes QC
   - keeps text out of protected face/product zones
   - renders headline, support line, benefit callouts, CTA, and brand/footer treatment consistently

This separation is important. Image models are unreliable at preserving identity/product fidelity while also creating polished readable typography. Let the image model create the scene and let deterministic code render text afterward.

## Prompt-first owner UX

Default UI should be simple:

- one natural-language prompt box
- owner/photo selection
- Generate
- Regenerate
- Save

Move technical controls into a collapsed **Advanced Overrides** section:

- creative mode
- image quality
- layout
- base style
- identity lock
- hero priority
- gaze
- expression
- interaction
- refinement
- extra directions

A blank prompt should be valid and should invoke house defaults rather than throw an error.

Examples of short prompts the system should understand:

- `Put me in this chair and make it premium.`
- `Put these shoes on me and make them the hero.`
- `Make me look at the camera and smile.`
- `Show off my tattoos and athletic build.`
- `Make me and the product equal heroes.`

## House-default behavior

When the owner does not explicitly override the style, default to:

- strong identity preservation when an owner photo is used
- exact product preservation when a product image is supplied
- product/service relevance inferred from merchant, category, title, and known creative profile
- mobile-readable copy
- benefit-driven headline/support hierarchy
- two or three short truthful benefit callouts when appropriate
- safe text placement away from face and critical product details
- platform-aware CTA
- text-free generated scene

Do not invent prices, discounts, guarantees, availability, specifications, or personal experience.

## Text-free scene rule

The generated photographic scene should explicitly prohibit:

- slogans
- readable labels
- captions
- badges
- signs
- floating words
- hologram/UI words
- fake logos
- CTA text
- watermarks

All final advertising text belongs in the compositor.

## Identity-preservation pattern

Use configurable identity tiers:

- `strong`
- `medium`
- `flexible`

For strong identity, preserve visible facial geometry, head shape, hairline/baldness, eyes, eyebrows, nose, mouth, jaw, facial hair, skin tone, apparent age, tattoos, body build, and recognizable proportions.

Avoid beautification, age changes, slimming, bulking, or face redesign unless explicitly requested.

A stronger image model may be used only for strong-identity mode while lower-cost models handle normal edits.

## Product-reference pattern

When an exact product image exists:

- pass that exact product reference to the image-edit stage
- preserve distinctive shape, color, logos, controls, and other identifying details
- require visible use/hold/wear/sit interaction when requested
- reject the output if the product reference was not actually included

Signed proxy product URLs should be verified server-side and resolved to the original merchant image before being sent to the image model.

## Multi-pass QC pattern

Useful QC fields:

- identity score
- product score
- interaction score
- hero/prominence score
- face-in-copy-zone flag
- recommended copy zone
- concrete failure reasons

Recommended behavior:

- strong identity gets the highest threshold
- exact product gets a separate fidelity threshold
- required physical interaction gets its own threshold
- shared/product hero modes require stronger product prominence
- if the first scene fails, retry with corrective instructions
- for strong identity, allow one focused identity-repair pass
- return a failure instead of accepting a visibly bad ad after the pass limit

## Copy-safe compositor pattern

The compositor should render text after QC and should own:

- brand/merchant eyebrow
- headline
- support line
- two or three benefit callouts/chips
- CTA button
- footer/destination label
- optional `LINK IN BIO` strip for social platforms

Use hierarchy rather than one-color plain text. A reusable treatment can combine:

- white headline
- softer secondary text
- brand/category accent color
- checkmark or pill benefit chips
- stronger CTA contrast

The compositor should remain deterministic and independent from the generated scene.

## Benefit-callout generation

The Creative Director should return short truthful benefits inferred from supplied merchant/product/category context.

Example categories:

- AI/business: automate workflows, improve response, scale operations
- pool/outdoor furniture: comfort, outdoor style, relaxation
- apparel: fit, style, comfort
- optics/outdoor: clarity, durability, field use
- welding: power, versatility, shop-ready use
- gaming optimization: connection stability, lower lag, mobile/PC optimization
- tickets/events: concerts, sports, live events, current listings

If the AI returns too few benefit callouts, deterministic category-based fallbacks may fill missing slots. Do not invent unsupported claims.

## Platform-aware CTA pattern

Examples:

- Instagram / TikTok / Threads: prefer `LINK IN BIO` when profile traffic is the intended route
- Facebook or general website placements: `SEE DETAILS`, `LEARN MORE`, `SHOP NOW`, or category-appropriate action
- ticket/event campaigns: `FIND TICKETS`, `VIEW EVENTS`, or similar

Do not render long raw tracking URLs on the image. Show a short branded destination label while the actual tracked URL remains in the post/link field.

## Affiliate brand campaigns vs product campaigns

Support both:

1. **Brand/service campaign**
   - merchant/category-level ad
   - useful when no individual product feed exists or the partner sells one core service

2. **Individual product/event campaign**
   - exact item, event, ticket listing, apparel piece, chair, tool, optic, etc.

Do not force fake product records merely to make a merchant appear in Social Ads.

A brand-campaign layer can pin generic approved catalog records such as gaming-service, welding-brand, or ticket-marketplace entries while preserving individual product/event records underneath.

## Product-library-to-ad workspace

Do not limit Social Ads to a small hard-coded merchant list. The owner should be able to reach the same dedicated ad workspace from:

- the searchable Social Ads product library
- a product thumbnail
- a clear Create Ad control
- the Published Products inventory

Both entry points must pass the same normalized, approved product snapshot. Warn before replacing an unfinished draft.

Use a guided mobile-first sequence:

1. setup and product confirmation
2. written social post
3. picture ad
4. optional voiceover
5. improve, download, and finish

Each stage should be regenerable without discarding unrelated completed work.

## Split-state owner workspace

Keep lightweight durable references separate from heavy temporary media.

Recommended server-side or session-backed state:

- current draft identifier
- selected product/service snapshot or stable product ID
- platform and objective
- owner/photo reference ID
- status and updated timestamp

Recommended device-local working state:

- composed picture-ad Blob
- width, height, MIME type, draft/product key, and saved timestamp
- temporary preview URL derived from the Blob

Store only one current recovery asset when the product is designed around a single active ad. Restore it only when its draft/product key matches. Clear it on Finish/Clear. If IndexedDB is unavailable, keep the current in-memory result usable and show a friendly recovery warning.

This split avoids sending a generated image to permanent storage and retrieving it again merely to continue editing or save it to the phone.

For internal navigation in Codespaces/preview hosts, prefer framework-native routing over hard `window.location.assign()` calls so the app does not accidentally escape the forwarded preview host.

## Private media libraries

Permanent cloud storage is optional, not the default working path.

Use private, server-authorized storage for assets the owner explicitly chooses to keep:

- reusable owner photo library
- explicitly saved finished-ad library
- durable voice or campaign assets that must be available across devices

Keep ordinary generated previews and recovery copies on the current device where practical. Use signed access, private buckets, and RLS/no-public-policy tables for anything permanently stored.

For service-card image fitting, preserve the original upload and save a separate fitted derivative. Useful fitting controls include contain, fill, stretch, scale, independent width/height stretch, and X/Y position.

## Brand/category profiles

Maintain a resolver with:

- known-brand profile overrides
- category-based fallback
- generic premium fallback

Profiles can control:

- default creative mode
- mood
- background direction
- suggested interaction
- accent treatment
- likely hero priority

Do not require hard-coded brand support for every future partner; new merchants should still get sensible category-driven behavior.

## AI usage and cost visibility

Track feature-level spend separately from provider organization-cost reporting.

Recommended approach:

- record estimated cost per AI request in a private feature ledger
- tag by feature such as `leads` or `ads`
- query provider organization-cost API separately
- for a working-budget gauge, use the higher of posted provider spend vs current tracked feature spend so provider reporting lag cannot make the remaining amount look artificially high

Important distinction:

- a configured working-budget remainder is an internal estimate
- it is not automatically the provider's authoritative prepaid-credit balance

Keep normal API keys and organization Admin API keys separate. Store development secrets in the development secret store and production secrets in the deployment platform environment. Do not put raw secrets in the repository.

For a private owner console, fetch provider organization usage once when the authenticated console session opens, reuse it across module navigation, and expose a manual Refresh action. Do not poll every 10–15 minutes when the owner only needs an opening snapshot.

## Rate-limit handling

AI workflows can generate multiple provider requests from one visible user action: planning, image edit, validation, retries, repair pass, cost polling, and other UI requests.

Reusable protections:

- debounce cost/usage refreshes
- do not poll provider usage endpoints aggressively
- cache usage results briefly where acceptable
- serialize expensive generation passes
- apply exponential backoff and honor `Retry-After` headers on HTTP 429 responses
- avoid automatic retries that can multiply a rate-limit burst
- display a friendly owner message explaining that the provider rate limit was reached temporarily

## Written-post output contract

Generate publishable copy as structured data, then normalize it deterministically.

Recommended requirements:

- short phone-friendly paragraphs
- four to eight purposeful emojis when appropriate
- emoji-led highlights instead of a dense wall of text
- required CTA and required brand/affiliate hashtags inserted exactly once
- affiliate profile-traffic CTA configured as `LINK IN BIO`
- no unsupported price, discount, availability, specifications, guarantee, or personal experience

The download action should build a post-ready text file from only:

1. primary publishable copy
2. the required CTA if it is not already present
3. deduplicated publishable hashtags

Exclude internal headings, category labels, product metadata, platform/destination notes, generation commentary, and voiceover instructions.

## Fixed protected copy panel and visual safety

A reliable mobile creative can reserve an explicit left-side panel and place protected visual subjects outside it.

One proven portrait-layout starting point is approximately:

- copy panel: x = 3–49%, y = 3–75%
- protected person/product zone: primarily the right side of the canvas

Treat these percentages as configurable layout tokens, not universal constants.

When an owner photo is used:

- place the visible head/face outside the copy panel
- keep the exact featured product outside the copy panel
- prefer a right-side owner/product composition
- reject the scene if either protected subject enters the panel

For a product-only creative, place the exact product deterministically in the designated product zone, such as the rightmost 44% of a portrait canvas.

QC must report separate flags:

- `faceInCopyZone`
- `productInCopyZone`

Do not combine them into one generic overlap score. A pass requires both flags to be false, along with the configured identity and product-fidelity thresholds.

The compositor can place merchant, product title, product-specific hook/support, truthful benefit callouts, CTA, and required disclosure/hashtag inside the protected text panel after the image passes QC.

## Preview interaction and iPhone save

The composed canvas/image is an output preview, not a navigation control.

Recommended mobile behavior:

- disable preview pointer activation when no editing interaction is required
- use `touch-action: pan-y` so vertical scrolling continues
- disable accidental selection and touch callouts on the canvas
- offer a large explicit Save Picture Ad to iPhone/Photos action
- explain that iPhone users should choose Save Image from the share sheet when necessary
- restore the local recovery Blob when the owner returns to the same draft
- clear the recovery record only through an intentional Finish/Clear action

## OpenAI request and security contract

- Keep the provider key server-side and reuse the consuming project's deployed configuration.
- Authenticate every owner generation route.
- Send `store: false` or the provider's equivalent transient-storage control where supported.
- Use strict structured output for planning/copy/QC contracts.
- Serialize expensive stages and apply bounded backoff for HTTP 429 responses.
- Honor `Retry-After` instead of multiplying a burst with immediate automatic retries.
- Record feature usage privately without exposing organization-level credentials.
- Load provider organization usage once when the authenticated console opens; refresh only on owner request.
- Never copy a secret, affiliate account ID, private product record, or customer-specific URL into this reusable module.

## Known-good baseline rule

Once the owner verifies the complete workflow, record its source commit and preserve it as the baseline. Later improvements should be additive or versioned. Do not silently change the protected-zone contract, device-local recovery behavior, required CTA/hashtag policy, or post-ready download format.

## Versioned rollout pattern

When a working ad compositor becomes stable, preserve it and introduce major behavior changes as a new version (`V4`, `V5`, `V6`, etc.), then switch a one-line wrapper/export to the new version.

Benefits:

- fast rollback
- lower regression risk
- easier side-by-side comparison
- preserves known-good implementation while iterating

## Reuse boundaries

Keep reusable code customer-neutral. Inject customer-specific:

- merchant names
- affiliate IDs/URLs
- owner photos
- brand assets
- service names
- business URLs
- secrets
- database identifiers

from the consuming project rather than hard-coding them into the reusable module.
