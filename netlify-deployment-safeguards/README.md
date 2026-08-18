# Netlify Environment and Secret-Scanning Safeguards

Reusable deployment guidance for Next.js projects hosted on Netlify and backed by Supabase.

## Why this exists

A Netlify production build can fail when secret scanning finds the value of `SUPABASE_URL` in generated client or cache output. A Supabase project URL is a public service endpoint and may legitimately appear in browser-delivered code. The Supabase server secret must remain protected.

## Permanent project configuration

Add this to the project's `netlify.toml`:

```toml
[build.environment]
  SECRETS_SCAN_OMIT_KEYS = "SUPABASE_URL"
```

Equivalent Netlify UI configuration:

- Key: `SECRETS_SCAN_OMIT_KEYS`
- Value: `SUPABASE_URL`
- Secret flag: off
- Scope: all scopes
- Deploy context: production (or all contexts when the plan permits)

## Security boundary

Safe to omit from secret scanning:

- `SUPABASE_URL` — public project endpoint

Never omit or expose:

- `SUPABASE_SECRET_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- API tokens, console keys, passwords, or private signing secrets

Do not disable Netlify secret scanning globally. Omit only known public identifiers.

## Production environment checklist

Netlify does not automatically inherit GitHub repository or Codespaces secrets. Import the project's environment variables into Netlify before the first production build.

1. Import the production `.env` values into Netlify.
2. Mark actual credentials as secret.
3. Make variables available to Builds, Functions, and Runtime.
4. Add the `SUPABASE_URL` scanning exception above.
5. Keep automatic publishing locked when required.
6. Trigger a manual production deploy with a cleared cache.
7. Verify owner-console login, Supabase-backed content, AI features, images, and affiliate links.

## Failure recovery

If Netlify reports that `SUPABASE_URL` was detected during secret scanning:

1. Confirm the match is the public Supabase endpoint—not the secret key.
2. Add `SECRETS_SCAN_OMIT_KEYS=SUPABASE_URL`.
3. Clear the build cache and redeploy.
4. Do not use `SECRETS_SCAN_OMIT_PATHS` unless a separate verified cache-only false positive remains.
