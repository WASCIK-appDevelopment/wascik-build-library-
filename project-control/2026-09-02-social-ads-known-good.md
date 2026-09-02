# Owner Console Social Ads Checkpoint — 2026-09-02

## Source of truth

- Working repository: `WASCIK-appDevelopment/wascik-portfolio`
- Branch: `main`
- Latest reviewed source checkpoint: `715d89529c63d12f36403de97c2745ef35416369`
- GitHub remains the source of truth.
- Production publishing remains manual and requires explicit owner approval.
- No production deployment was authorized or performed for this checkpoint.
- The existing deployed OpenAI credential remains unchanged and server-side.

## Owner-verified result

The current Social Ads generator was reported working as intended after the September 2 refinements. Major additions may be considered later, but this implementation is the known-good baseline to preserve.

## Completed behavior

1. Social Ads can use the full eligible affiliate product catalog rather than a small hard-coded campaign list.
2. Published Products and Social Ads both open the same dedicated product-to-ad workspace.
3. The workspace guides the owner through setup, written post, picture ad, voiceover, and improve/download/finish stages.
4. Written posts use mobile-friendly formatting, purposeful emojis, deterministic required hashtags, and the configured affiliate CTA.
5. Picture ads use a fixed protected copy panel and keep visible faces/heads and the exact featured product out of that panel.
6. Visual QC treats face overlap and product overlap as separate failures.
7. The deterministic compositor adds merchant, product-specific copy, CTA, and required brand/disclosure treatment after scene generation.
8. The composed picture is temporarily recoverable from IndexedDB on the current device and can be saved through the iPhone share/download flow.
9. Tapping the preview no longer opens an accidental enlarged view.
10. Download Post-Ready Ad exports only publishable primary copy and hashtags; it excludes internal headings and product/platform metadata.
11. Working ad media remains device-local where practical, avoiding unnecessary database/storage egress.
12. Provider credentials remain server-only; owner routes stay authenticated; request storage is disabled where supported; rate-limit backoff and usage tracking remain part of the design.

## Reusable artifacts captured

- `social-ads-creative-system/local-picture-ad-store.example.ts`
- `social-ads-creative-system/post-ready-download.example.ts`
- `social-ads-creative-system/test-checklist.md`
- Expanded `social-ads-creative-system/README.md`

## Preserve as the baseline

- Do not rewrite the known-good composer in place for speculative enhancements.
- Add major creative changes as a new version and switch only after private-preview comparison.
- Do not turn temporary device recovery into permanent cloud storage by default.
- Do not weaken face/product protected-zone validation.
- Do not add internal metadata back into the post-ready download.
- Do not deploy to production without explicit owner approval.

## Remaining Owner Console / Versa OS sequence

1. Preserve this Social Ads baseline while consolidating the full private-preview test list.
2. Continue Owner Console build/type/lint stabilization.
3. Run one private Netlify preview and iPhone acceptance pass when the owner is ready.
4. Fix preview findings while production stays locked.
5. Resume Alpha Observer private-preview testing only after Owner Console stabilization; keep Alpha at Authority Level 0.
6. Begin separate multi-tenant Versa OS architecture only after these internal patterns are proven.
