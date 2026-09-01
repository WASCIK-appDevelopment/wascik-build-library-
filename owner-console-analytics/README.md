# Owner Console + First-Party Analytics

Reusable patterns for private business consoles that combine authenticated owner workflows, confirmation-gated AI actions, first-party traffic analytics, and operational recovery practices.

## Use this module for

- private owner dashboards
- AI-assisted CRM/status management
- confirmation-gated database writes
- first-party outbound click analytics
- site/page visit analytics
- mobile-first owner workflows
- shared liquid-glass navigation and stable detail drawers
- secure low-friction owner access and repeat-lead preservation
- Codespaces secret recovery
- safe consolidation of divergent Git branches

## Files

- `confirmed-owner-actions.md` - propose -> confirm -> write pattern for AI-assisted mutations.
- `first-party-analytics.md` - event architecture for outbound clicks and site visits without interfering with third-party attribution.
- `codespaces-secret-recovery.md` - secure development-secret recovery for disposable Codespaces.
- `branch-consolidation.md` - safe procedure for reconciling a long-lived feature branch with newer `main` work.
- `mobile-liquid-glass-shell.md` - shared console shell, accessible drawers, command-center layout, and iPhone horizontal-drift prevention.
- `secure-access-and-repeat-leads.md` - cookie-backed access, neutral recovery, contact-first capture, and append-only repeat attempts.
- `TrackedOutboundLink.example.tsx` - reusable explicit outbound-link tracker.
- `SiteVisitTracker.example.tsx` - reusable lightweight page-visit tracker.

## Core rules

1. Never treat a hidden URL as owner authentication. Enforce access server-side.
2. AI may propose a write, but destructive or workflow-changing actions should require explicit owner confirmation before execution.
3. Database/server state is the source of truth; email is only an alert channel.
4. Analytics should minimize PII and use generated/session identifiers unless a consented identity requirement exists.
5. Do not replace external affiliate URLs just to collect first-party click data. Record the event and preserve the original destination.
6. Never store production secrets, tenant IDs, passwords, personal contact information, or customer-specific affiliate identifiers in this reusable library.
7. Distinguish built, merged, deployed, live, verified, and measured states.
8. Render every feature route through one authenticated shell so navigation, session, usage, and mobile behavior remain consistent.
9. Persist a valid email or phone immediately; later attempts append history and notifications instead of overwriting the original lead.

This module is intentionally customer-neutral. Production projects should inject their own brand, database, authentication policy, destinations, and environment values.