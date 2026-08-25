import type { ProductLifecycle, ProductManifest, ProductRelease } from "./product-manifest.example";
import { releaseIsSellable } from "./product-manifest.example";

const allowedTransitions: Record<ProductLifecycle, ProductLifecycle[]> = {
  idea: ["content_draft", "retired"],
  content_draft: ["template_ready", "retired"],
  template_ready: ["customer_files_built", "content_draft", "retired"],
  customer_files_built: ["qa_in_progress", "template_ready", "retired"],
  qa_in_progress: ["sellable", "customer_files_built", "retired"],
  sellable: ["published", "qa_in_progress", "retired"],
  published: ["sellable", "retired"],
  retired: ["content_draft"],
};

export type TransitionContext = {
  currentRelease?: ProductRelease;
  ownerConfirmedPublication: boolean;
  checkoutVerified: boolean;
  deliveryVerified: boolean;
};

export function validateLifecycleTransition(
  product: ProductManifest,
  next: ProductLifecycle,
  context: TransitionContext,
): string[] {
  const errors: string[] = [];

  if (!allowedTransitions[product.lifecycle].includes(next)) {
    errors.push(`Transition ${product.lifecycle} -> ${next} is not allowed.`);
  }

  if (next === "sellable") {
    if (!context.currentRelease) {
      errors.push("A current immutable release is required before a product can be sellable.");
    } else if (!releaseIsSellable(context.currentRelease)) {
      errors.push("Every required customer asset must pass QA before the product can be sellable.");
    }
  }

  if (next === "published") {
    if (!context.ownerConfirmedPublication) {
      errors.push("Explicit authenticated owner confirmation is required before publication.");
    }
    if (!context.checkoutVerified) {
      errors.push("Checkout must be verified before publication.");
    }
    if (!context.deliveryVerified) {
      errors.push("Customer delivery must be verified before publication.");
    }
    if (!product.storefront.purchaseEnabled) {
      errors.push("The storefront purchase control must be enabled before publication.");
    }
  }

  return errors;
}

export function transitionProduct(
  product: ProductManifest,
  next: ProductLifecycle,
  context: TransitionContext,
): ProductManifest {
  const errors = validateLifecycleTransition(product, next, context);
  if (errors.length > 0) throw new Error(errors.join(" "));

  return { ...product, lifecycle: next };
}
