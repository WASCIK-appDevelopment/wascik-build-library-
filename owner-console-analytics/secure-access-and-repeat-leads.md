# Secure Owner Access and Repeat-Lead Reliability

Reusable patterns for low-friction private-console access and reliable lead capture.

## Owner access

A client-side passcode field is only an input mechanism. Authorization must be enforced by the server on every protected request.

Recommended flow:

1. Check the existing secure session when the console opens.
2. If no valid session exists, show the passcode form.
3. After a reasonable minimum length, debounce briefly and submit automatically.
4. Keep the normal submit button and Enter-key behavior as accessible fallbacks.
5. Exchange the passcode for an HttpOnly, Secure, SameSite session cookie.
6. Store only a nonsecret session marker in browser session storage.
7. Rate-limit failed verification and recovery requests.
8. On sign-out, revoke the server session and clear browser session state.

Do not store the raw passcode in local storage, session storage, URLs, logs, analytics, or the reusable library.

## Passcode recovery

Recovery should:

- accept only the configured owner email
- return the same neutral response whether an email matches or not
- create a short-lived, single-use, cryptographically random token
- store only a token hash and expiry
- deliver the link through a server-side email provider
- invalidate the token after use
- rotate the passcode/server secret safely
- never reveal the authorized email or account existence

## Contact-first lead capture

A visitor does not need to finish a long conversation before becoming a lead. When a valid phone number or email is supplied:

1. Persist the contact immediately.
2. Send the owner alert independently of whether the visitor writes another message.
3. Let the assistant continue the conversation normally.
4. Append later messages and qualification details to the same record.

Database persistence is the source of truth; email is a notification.

## Repeat contacts

A repeated contact must never overwrite or erase the earlier history.

Use a normalized contact key (for example, lowercase email or normalized phone) to find an open record. Then:

- append a `contact_attempt` event
- increment or derive the attempt count
- preserve the original created time
- update the latest-contact time
- append the new conversation segment
- send another owner notification if policy allows
- display the total attempts and latest attempt in the CRM

If business policy calls for a separate lead per session, link the records with a contact identity rather than overwriting either record.

A simple append-only event shape:

```ts
type ContactAttempt = {
  eventType: "contact_attempt";
  occurredAt: string;
  contactAttempt: number;
  sessionId?: string;
};
```

## AI boundary

The public assistant may continue helping the visitor. The private Owner AI may summarize or propose CRM changes, but status, notes, follow-up, publication, deletion, or other mutations require explicit owner confirmation before the server writes them.
