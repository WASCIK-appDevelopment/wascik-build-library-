# AI Assistant Setup & Troubleshooting

Use this checklist for future WASCIK or customer AI representative deployments.

## 1. Secrets and environment

- Never commit API keys to GitHub.
- Keep `.env*` ignored by Git.
- For local Next.js development, use a root `.env.local` file containing `OPENAI_API_KEY=<secret>`.
- Restart the dev server after changing environment variables.
- In production, use the host's secret/environment-variable settings rather than repository files.
- If a key is ever visible in a screenshot, terminal log, issue, commit, or chat, revoke it and create a replacement.

## 2. Safe configuration check

Add a health endpoint that reports only whether configuration is present. Never echo the key.

Expected development check:

```json
{ "configured": true, "model": "gpt-5-mini", "secretExposed": false }
```

## 3. OpenAI Platform setup

A ChatGPT subscription does not automatically fund API usage. For each production project:

1. Create/select the intended OpenAI Platform project.
2. Create a project API key.
3. Add prepaid credits or enable the intended billing arrangement.
4. Keep auto-reload off during early testing unless automatic replenishment is explicitly desired.
5. Set a conservative project budget/spend alert.
6. Review Usage periodically.

Common billing failure:

- `billing_not_active` means the API key reached OpenAI successfully but the project/account cannot spend yet.

## 4. Responses API pattern

For a website representative using a reasoning-capable model, avoid extremely small output budgets. `max_output_tokens` includes reasoning plus visible output. A practical starting point for short website answers is:

- model: configurable, default `gpt-5-mini`
- reasoning effort: `minimal`
- max output tokens: around `800`
- store: `false` unless conversation storage is explicitly required

If the API request succeeds but no text is shown, inspect whether the response was incomplete, refused, or consumed its token budget before producing visible output.

## 5. Codespaces / iPhone workflow

When testing from an iPhone:

- Verify the Git branch separately from the filesystem directory.
- Project directory example: `/workspaces/<repo>`.
- Branch can be a feature branch such as `agent/ai-funnel-foundation`.
- Use a second terminal for `curl` tests while the dev server runs in the first terminal.
- A forwarded Codespaces site uses the `-3000.app.github.dev` host, not the editor's `github.dev` URL.
- If a route works with `curl -I http://localhost:3000/...` but not in Safari, troubleshoot port forwarding rather than application routing.

Useful safe checks:

```bash
git branch --show-current
curl -I http://localhost:3000/path-to-test
```

Do not run commands that print secrets.

## 6. Error map

- `AI service is not configured` -> server cannot see `OPENAI_API_KEY`; verify environment file/host secret and restart.
- `billing_not_active` -> billing/credits problem, not code or authentication.
- `401`/invalid key -> replace/revoke key and confirm correct project key.
- `representative returned an empty response` -> inspect model output budget/reasoning settings and incomplete/refusal metadata.
- `404` on preview route -> wrong branch, stale checkout, or route missing locally.
- Homepage opens instead of preview in Codespaces -> confirm forwarded port URL, not editor URL.

## 7. Deployment checklist

Before mounting the representative on a customer's live site:

- API secret configured on production host.
- Health route reports configured without leaking secrets.
- Billing and project budget reviewed.
- Page/context grounding enabled.
- No sensitive business data included in client-side bundles.
- Affiliate disclosure behavior verified where applicable.
- Mobile collapsed state tested.
- Human contact/handoff path available.
- Failure states show a graceful fallback rather than raw API errors.
