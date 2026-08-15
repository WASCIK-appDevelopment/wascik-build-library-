# Confirmation-Gated Owner AI Actions

Use this pattern when an owner-facing AI assistant can change durable business state such as lead status, notes, follow-up dates, inventory flags, campaign state, or publication controls.

## Workflow

1. **Read current state** from the trusted database/server.
2. **Interpret the owner's request** and generate a structured proposed action.
3. **Do not mutate yet.** Return a human-readable confirmation card that clearly identifies the target, proposed change, and any important consequence.
4. **Require explicit confirmation** from the authenticated owner.
5. **Re-authorize on the write endpoint.** Never trust browser state alone.
6. **Validate the action again** server-side against an allowlist of supported mutations.
7. **Write the change** using server-only database credentials.
8. **Return the canonical updated record** and refresh the UI from persisted state.

## Recommended proposal shape

```ts
type OwnerActionProposal = {
  action: "set_status" | "add_note" | "set_follow_up";
  recordId: string;
  displayLabel: string;
  currentValue?: string | null;
  proposedValue: string;
  reason?: string;
};
```

## Security rules

- Authenticate both the proposal/read route and the mutation route.
- Do not expose database secret/service-role credentials to the client.
- Use an action allowlist rather than accepting arbitrary SQL/field names from the model.
- Re-fetch or validate current state before writing when stale-state conflicts matter.
- Log enough metadata for operational audit without storing unnecessary sensitive text.
- For high-impact actions, add a second confirmation or stronger authentication as appropriate.

## UX rule

The confirmation UI should be visually distinct from ordinary AI text. The owner should be able to tell immediately: **the AI is proposing an action, not claiming it already happened.**

## CRM-specific lesson

When conversational enrichment continues after an owner changes a lead from New to Contacted/In Progress/Closed, the persistence layer should preserve the existing workflow status. Do not accidentally reset status to a default value during an upsert.