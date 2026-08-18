# Published Catalog Workflow

Keep catalog state separated so the owner can work quickly without losing history.

1. **Discovery results** are temporary candidates.
2. **Approved products** are durable private records but are not public.
3. **Ready to publish** contains approved records selected for a destination page.
4. **Published products** is a complete inventory of both console-published and pre-existing catalog items.
5. **Health review** contains merchant-page failures, product-specific sold-out signals, and possible duplicates.
6. **Ignore** records a product- or brand-level warning exception without deleting the underlying product.
7. **Remove from publication** is a confirmation-gated durable action. “Remove from this list” must not be labeled or implemented as publication removal.
8. **Restore product** removes the suppression record and returns the original product to its existing brand/category placement.

## Original or hard-coded products

Do not delete or rewrite the source product merely because the owner unpublishes it. Give every original product a stable key and store that key in a service-role-only suppression table.

The public catalog, owner Published Products view, health scanner, duplicate checker, and AI catalog should all build from the same filtered catalog:

```ts
const suppressions = new Set(rows.map((row) => row.product_key));
const visibleOriginals = originalProducts.filter(
  (product) => !suppressions.has(product.id),
);
```

Removal should upsert one suppression record after owner confirmation. Restoration should delete only that record. This preserves the product's merchant, category, sort order, and page destination so it returns to the same position if restored.

## Console flow

For both original and database-created products:

```text
Remove from publication
  -> exact product review
  -> short-lived signed confirmation
  -> authenticated server mutation
  -> refresh Published Products and public catalog state
```

Original products use suppression. Console-created products may use an unpublished state instead of deletion. Offer **Restore product** in a separate suppressed-products view. Never require the owner to edit source code for routine catalog management.

## Placement rule

When publishing, place a product inside its merchant/brand section and then near products in the closest matching category. Never append dynamic products after legal disclosures or page footers.

Suppression and restoration must not modify brand sections, category sections, destination mappings, or sorting metadata.

## Safety rule

Every durable approve, publish, unpublish, remove, restore, or ignore operation should follow:

owner request -> exact proposal -> confirmation card -> short-lived signed token -> authenticated server validation -> database write -> audit result

A descriptive AI answer alone must never mutate catalog state.
