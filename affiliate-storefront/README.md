# Reusable Affiliate Storefront

Customer-neutral Next.js/React building blocks extracted from the WASCIK affiliate catalog and event-page work.

## Included

- normalized product, merchant, affiliate-link, and event data contracts
- reusable product card
- merchant-page navigation
- reusable event card
- purchase and ticket-resale disclosures
- reliable local-image guidance
- implementation checklist for multi-brand affiliate hubs
- shared database-driven merchant routes controlled by a private publication console
- authorized manual-import workflow for merchants without provider feeds

See `dynamic-console-published-storefront.md` for the shared route, publication-state, no-feed, manual-import, and deployment-control pattern.

## Suggested structure in a customer project

```text
app/
  affiliate-services/
    page.tsx
    merchant-name/page.tsx
    events/page.tsx
components/
  affiliate/
public/
  affiliate/
    merchant-name/
data/
  affiliate-products.ts
  affiliate-events.ts
```

## Implementation checklist

1. Keep tracked links in data, not hard-coded throughout page markup.
2. Give each merchant or major category a dedicated route once its catalog grows.
3. Put direct merchant buttons near the top of the main affiliate page.
4. Group related products into clear departments.
5. Preserve `rel="sponsored noopener noreferrer"` on outbound tracked links.
6. Add a visible disclosure on every affiliate route.
7. Treat price, inventory, event schedule, and performer information as changeable.
8. Verify every route in mobile preview and run the production build.
9. Keep real affiliate IDs, branding, customer information, and deployment secrets outside this library.

## Event data warning

Concert and ticket information expires quickly. Record the date schedules were checked and verify current details before deployment. A generic affiliate destination can support all cards, but users should be told to search for the performer or event after following the link.

## Adoption

Copy only the needed files into a customer project, apply that customer’s design system, replace all placeholder data, and verify merchant/program terms before publishing.
