# Security and Privacy Patterns

## Public assistant

- Keep model/API credentials on the server.
- Validate and length-limit user input before forwarding it to any model or downstream service.
- Retrieve approved business context explicitly; do not let the assistant improvise policies, prices, warranties, availability, or regulated claims.
- Rate-limit public endpoints in production.
- Log enough metadata for debugging without unnecessarily storing sensitive conversations.
- Keep tenant/customer data isolated when the same engine serves multiple businesses.

## Affiliate / commerce assistant

- Carry disclosure text with every monetized recommendation flow where required.
- Recommend from the supplied catalog only.
- Treat current price, inventory, shipping, promotions, and merchant policies as merchant-controlled data unless refreshed from an authoritative source.
- Mark outbound monetized links appropriately, such as `rel="sponsored noopener noreferrer"` in web UIs.

## Owner-only AI studio

A hidden pathname is not access control.

Use:

1. server-side authentication
2. secure, HTTP-only session cookies or a trusted identity provider
3. authorization checks on every owner-only server endpoint
4. `noindex` metadata as an additional privacy measure, not as security
5. environment variables or a secrets manager for credentials
6. logout/session-expiration behavior

For a single-owner deployment, a server-held owner credential can bootstrap the prototype. Production deployments should prefer a managed authentication provider, passkeys, OAuth, or another robust identity mechanism.

## Real-person avatar and voice

- Obtain explicit permission from the person whose likeness or voice is used.
- Keep consent records and define allowed uses.
- Make it clear to site visitors that they are interacting with an AI/digital representative when confusion is reasonably possible.
- Provide a way to disable or replace a likeness if consent changes.
