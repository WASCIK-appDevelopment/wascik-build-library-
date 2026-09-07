# Stage 6 - Persistent Lead Database + Owner Handoff

Reusable pattern for turning an AI website representative into a durable business lead pipeline.

## Flow

1. Assistant maintains short session memory in the browser.
2. Server-side qualifier extracts project type, business/project context, and at least one contact method.
3. Once the lead becomes `handoff-ready`, the server attempts an owner notification through an independent email provider before, or separately from, database persistence.
4. The server then persists the lead to a private database when that service is available.
5. Database record stores source path, referrer, summary, recent conversation, optional budget/timeline, qualification score, and workflow status.
6. If email succeeds but persistence fails, return a distinct accepted/emailed-but-not-saved result so the visitor is not asked to resubmit and the owner knows the database copy is missing.
7. Owner workflow can advance `new -> contacted -> in_progress -> closed` when database storage is available.

## Recommended table fields

- `id` UUID primary key
- `capture_key` unique hashed deduplication key
- `created_at`, `updated_at`
- `status`
- `name`, `email`, `phone`
- `business`, `project_type`
- `goals[]`, `features[]`
- `budget`, `timeline`
- `source_page`, `source_path`, `source_referrer`
- `session_id`
- `summary`
- `conversation` JSONB
- `qualification_score`, `qualification_status`
- `alert_sent_at`, `contacted_at`, `closed_at`

## Security pattern

- Enable Row Level Security on the lead table.
- Do not create anonymous read policies for private leads.
- Write through server-controlled code using a Supabase secret key or equivalent privileged server credential.
- Never expose a secret/service-role key in browser code, `NEXT_PUBLIC_*`, committed `.env` files, screenshots, documentation, or client bundles.
- Keep tenant/customer-specific URLs, emails, project IDs, and credentials outside the reusable module.

## Health-check pattern

A useful health endpoint should test more than environment-variable presence. It should make a harmless `SELECT id LIMIT 1` request and report only booleans/status codes such as:

- `databaseConfigured`
- `databaseReachable`
- `databaseStatus`
- `keyKind`

Never return the key itself.

## Duplicate prevention

Create a server-side hash from stable lead attributes such as session ID, normalized email/phone, business, and project type. Store it in a unique `capture_key`. Use an upsert/merge strategy or conflict-aware insert so a handoff-ready assistant does not create a new row on every subsequent message.

## Mobile lesson

On iPhone Safari, form inputs below 16px can trigger automatic page zoom. Use at least 16px input text on narrow screens and constrain floating assistants to the dynamic mobile viewport.

## Alert-email rule

The database remains the preferred system of record, but an alert must not depend on a successful database write. This preserves a contact path during a database outage.

Send only the minimum actionable fields supplied for the handoff: name, email and/or phone, business or project type, goals/features, optional budget/timeline, source page, and a short summary. Do not include the entire conversation or unrelated personal data.

Keep the recipient list fixed or allowlisted in server configuration supplied by the consuming project. Never accept arbitrary recipients from the browser, and never hard-code customer addresses in this reusable module. Record `alert_sent_at` after persistence when possible; treat email-delivered/database-failed as its own observable outcome.
