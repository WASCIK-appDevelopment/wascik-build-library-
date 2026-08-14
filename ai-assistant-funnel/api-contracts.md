# Reusable API Contracts

These are recommended server-side interfaces for customer implementations.

## POST /api/assistant/chat

Request:

```json
{
  "message": "What service do I need?",
  "pathname": "/services/web-design"
}
```

Response:

```json
{
  "text": "...",
  "role": "service",
  "actions": [{ "label": "Start a project", "href": "/contact" }],
  "handoffReady": true
}
```

## POST /api/assistant/shop

Request:

```json
{
  "query": "I need a GPS with a dash camera",
  "pathname": "/shop/navigation"
}
```

Response:

```json
{
  "recommendations": [],
  "disclosure": "Affiliate disclosure text when required",
  "context": { "role": "store" }
}
```

## POST /api/assistant/lead

Use structured fields rather than storing an arbitrary chat transcript as the only lead record.

Suggested fields:

```json
{
  "name": "",
  "email": "",
  "phone": "",
  "business": "",
  "need": "",
  "budgetRange": "",
  "preferredContact": "",
  "sourcePath": "",
  "conversationId": ""
}
```

## POST /api/assistant/handoff

Returns the approved handoff channel, such as contact form, booking route, CRM task, email workflow, SMS provider, or live-agent session.

## Owner AI endpoints

Private owner tools should use separate authenticated endpoints such as:

- `/api/owner-ai/generate-caption`
- `/api/owner-ai/generate-video-script`
- `/api/owner-ai/generate-ad-concept`
- `/api/owner-ai/content-batch`

Do not expose owner-only generation endpoints through the public representative.

## Model integration rule

The model should receive structured retrieved context, not unrestricted access to the entire customer application. Keep secrets, API keys, CRM credentials, and private customer data server-side.
