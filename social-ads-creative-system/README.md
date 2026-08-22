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
- mobile-first owner-console UX

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

## Persistent owner workspace

Recommended private server-side state:

- current ad draft
- selected product/service snapshot
- platform
- objective/creative notes
- generated preview
- owner/photo reference
- voice attachment
- generated result metadata
- updated/status timestamps

The draft should survive navigation. Replacing the current draft should use an in-page confirmation panel rather than relying on browser-native confirm dialogs, especially on mobile Safari.

For internal navigation in Codespaces/preview hosts, prefer framework-native routing over hard `window.location.assign()` calls so the app does not accidentally escape the forwarded preview host.

## Private media libraries

Separate private storage for:

- owner photo library
- finished ad library
- ad-work-in-progress preview/voice assets

Use server-authorized signed access, private buckets, and RLS/no-public-policy tables.

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
