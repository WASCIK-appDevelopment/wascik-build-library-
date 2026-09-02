# Social Ads Creative System — Reuse Test Checklist

Use this checklist for a private preview or local development build before production approval.

## Product access and workspace

- [ ] Every eligible approved/published product can be found by search or filter.
- [ ] Product thumbnail and Create Ad control open the same dedicated ad workspace.
- [ ] Replacing an unfinished draft requires a clear in-app confirmation.
- [ ] Product, merchant, destination, and image data in the workspace match the selected product.
- [ ] Generated working assets are not written to the permanent database unless the owner explicitly saves/publishes them.

## Guided flow

- [ ] Setup, written post, picture ad, voiceover, and improve/download/finish steps appear in order.
- [ ] The owner can regenerate one stage without losing unrelated completed stages.
- [ ] Finish/Clear removes the temporary recovery asset and resets the workspace intentionally.

## Written post

- [ ] Copy uses short mobile-friendly paragraphs.
- [ ] Four to eight purposeful emojis improve scanning without obscuring meaning.
- [ ] Required CTA and brand/affiliate hashtags are present exactly once.
- [ ] Affiliate copy uses the configured profile-traffic CTA, such as LINK IN BIO.
- [ ] No invented price, discount, availability, product claim, or personal testimonial appears.
- [ ] Download Post-Ready Ad contains only the publishable copy and hashtags.
- [ ] Download excludes internal headings, product metadata, platform labels, destination notes, and voiceover instructions.

## Picture ad and QC

- [ ] The generated scene contains no model-rendered advertising typography.
- [ ] The deterministic compositor owns all readable ad text.
- [ ] The protected copy panel remains within the configured copy zone.
- [ ] A visible face/head does not overlap the protected copy panel.
- [ ] The exact featured product does not overlap the protected copy panel.
- [ ] Product-only creatives position the exact product in the designated product zone.
- [ ] QC reports face-in-copy-zone and product-in-copy-zone separately.
- [ ] Failed placement or fidelity triggers a bounded corrective retry, then a clear failure.
- [ ] Merchant, product title, product-specific hook/support, CTA, and required disclosure/hashtag render legibly.
- [ ] Face and exact-product fidelity meet their independent thresholds.

## Device recovery and iPhone behavior

- [ ] A completed composed picture is stored as a Blob in IndexedDB on the current device.
- [ ] Returning to the same draft restores the temporary picture without a database fetch.
- [ ] A different draft cannot accidentally restore the previous product's picture.
- [ ] Save Picture Ad opens the iPhone share/download flow and preserves full resolution.
- [ ] Tapping the preview does not enlarge or navigate away.
- [ ] Vertical page scrolling continues over/around the preview.
- [ ] Browser storage unavailable/private-mode failures show a friendly message and do not lose the current in-memory result.
- [ ] Finish/Clear deletes the IndexedDB recovery record.

## Security, cost, and reliability

- [ ] Provider keys and affiliate credentials remain server-side.
- [ ] Every generation route verifies the authenticated owner request.
- [ ] AI requests use transient/non-training storage controls such as `store: false` where supported.
- [ ] Expensive generation stages are serialized.
- [ ] HTTP 429 handling honors Retry-After and uses bounded exponential backoff.
- [ ] Usage is recorded in the private feature ledger.
- [ ] Provider organization usage loads once when the console opens and refreshes only on explicit owner action.
- [ ] Remote product images are lazy-loaded and are not copied into permanent storage merely for browsing.
- [ ] No production deployment occurs without explicit owner approval.

## Mobile accessibility

- [ ] Primary controls remain visible and tappable at iPhone widths.
- [ ] Buttons use clear action labels rather than icon-only critical actions.
- [ ] Progress and recovery messages explain whether data is device-local or permanently saved.
- [ ] Focus, loading, error, and disabled states are understandable without hover.
