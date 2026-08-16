# Published Catalog Workflow

Keep catalog state separated so the owner can work quickly without losing history.

1. **Discovery results** are temporary candidates.
2. **Approved products** are durable private records but are not public.
3. **Ready to publish** contains approved records selected for a destination page.
4. **Published products** is a complete inventory of both console-published and pre-existing catalog items.
5. **Health review** contains merchant-page failures, product-specific sold-out signals, and possible duplicates.
6. **Ignore** records a product- or brand-level exception without deleting the underlying product.
7. **Remove from publication** is a confirmation-gated durable action. “Remove from this list” must not be labeled or implemented as publication removal.

## Placement rule

When publishing, place a product inside its merchant/brand section and then near products in the closest matching category. Never append dynamic products after legal disclosures or page footers.

## Safety rule

Every durable approve, publish, unpublish, or remove operation should follow:

owner request -> exact proposal -> confirmation card -> short-lived signed token -> authenticated server validation -> database write -> audit result

A descriptive AI answer alone must never mutate catalog state.
