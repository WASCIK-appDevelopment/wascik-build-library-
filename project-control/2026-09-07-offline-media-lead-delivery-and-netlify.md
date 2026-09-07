# WASCIK Offline Media, Lead Delivery, and Netlify Checkpoint

Controlling checkpoint date: September 7, 2026

## Control boundaries

- Application repository: `WASCIK-appDevelopment/wascik-portfolio`, branch `main`.
- Netlify automatic production publishing remains locked. A successful build does not authorize publication.
- Supabase was offline during the final implementation review, so no claim in this record treats Supabase-dependent behavior as live-verified.
- The Social Ads photo generator stopped working before the Supabase outage. Do not attribute that incident to Supabase without reproducing it.

## Verified application changes

The application now separates two phone-photo intentions:

- **Use Once from Phone** normalizes a selected phone image for the active generator without adding it to a library.
- **Save to My Photos** tries the private Supabase library and falls back to a persistent IndexedDB device library when Supabase is unavailable.
- Device-library add, remove, clear, restore, source labeling, and newest-first ordering are implemented for offline operation.

Lead delivery now attempts a Resend notification before Supabase persistence. Alerts are sent to the two owner-approved addresses `michael@wascik.com` and `lewismike0435@gmail.com` and include the supplied actionable contact/project information. If notification succeeds but Supabase storage fails, the direct form can report an emailed-but-not-saved result instead of losing the handoff.

Public customer-facing contact references were migrated to `michael@wascik.com`.

## Build and Netlify checkpoint

- Application commit published: `0da4a05`.
- Verification before publication: Next.js 16.2.11 compiled, TypeScript passed, 106 static pages generated, and the application worktree was clean.
- Netlify deploy ID: `6a9e306528d02f0008b250f8`.
- The deploy built successfully, was manually published after explicit owner approval, and the canonical `https://wascik.com/` contact email was verified.
- Auto Publishing Locked remains the required policy.

Netlify secret scanning had rejected verified non-secret configuration values. The consuming project now omits only these key names from scanning: `SUPABASE_URL`, `AWIN_PUBLISHER_ID`, `WASCIK_ALERT_EMAIL`, and `WASCIK_ALERT_FROM`. Actual credentials, including Supabase privileged keys and `RESEND_API_KEY`, remain scanned and server-only.

## Not yet verified

- Supabase cloud-photo save, merge, remove, and lead persistence must be retested after the project is available.
- The database-independent email path was implemented and build-verified but should receive an end-to-end live lead test when service and budget allow.
- The Social Ads generator incident remains open.

## Exact next diagnostic sequence for Social Ads

1. Reproduce one photo-generation request while recording the route status, request ID, timing, model, and whether the failure is planning, image generation, scene validation, integration, or persistence.
2. Confirm rate-limit and timeout behavior: serialize expensive calls, honor `Retry-After`, and ensure no hidden automatic retry multiplies charges.
3. Test the image pipeline with the selected owner photo and product image while bypassing Supabase reads/writes.
4. Test Supabase photo retrieval and persistence separately after Supabase returns.
5. Run one controlled full workflow only after the failing stage is identified; do not spend repeated image-generation credits on blind retries.
6. Record the repaired source commit and owner-verified result before replacing the September 2 known-good baseline.
