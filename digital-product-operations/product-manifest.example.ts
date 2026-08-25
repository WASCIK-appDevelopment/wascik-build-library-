export type ProductLifecycle =
  | "idea"
  | "content_draft"
  | "template_ready"
  | "customer_files_built"
  | "qa_in_progress"
  | "sellable"
  | "published"
  | "retired";

export type AssetKind =
  | "cover"
  | "fillable_pdf"
  | "editable_document"
  | "quick_start"
  | "license"
  | "preview"
  | "customer_zip";

export type AssetQaStatus = "pending" | "passed" | "failed" | "replaced";

export type ReleaseAsset = {
  id: string;
  kind: AssetKind;
  fileName: string;
  mimeType: string;
  byteSize: number;
  checksumSha256: string;
  qaStatus: AssetQaStatus;
};

export type ProductRelease = {
  id: string;
  productId: string;
  version: string;
  createdAt: string;
  immutable: true;
  assets: ReleaseAsset[];
  pageCount?: number;
  interactiveFieldCount?: number;
  notes?: string;
};

export type ProductManifest = {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  lifecycle: ProductLifecycle;
  templateId?: string;
  currentReleaseId?: string;
  storefront: {
    visible: boolean;
    purchaseEnabled: boolean;
    regularPriceCents?: number;
    launchPriceCents?: number;
    currency: string;
    checkoutReference?: string;
  };
};

export type BundleItem = {
  productId: string;
  releaseId: string;
  displayOrder: number;
};

export type BundleManifest = {
  id: string;
  slug: string;
  title: string;
  lifecycle: ProductLifecycle;
  items: BundleItem[];
  regularPriceCents?: number;
  launchPriceCents?: number;
  currency: string;
};

export const requiredCustomerAssetKinds: AssetKind[] = [
  "cover",
  "fillable_pdf",
  "quick_start",
  "license",
  "customer_zip",
];

export function missingRequiredAssets(release: ProductRelease): AssetKind[] {
  const passedKinds = new Set(
    release.assets
      .filter((asset) => asset.qaStatus === "passed")
      .map((asset) => asset.kind),
  );

  return requiredCustomerAssetKinds.filter((kind) => !passedKinds.has(kind));
}

export function releaseIsSellable(release: ProductRelease): boolean {
  return missingRequiredAssets(release).length === 0;
}

export function bundleIsSellable(
  bundle: BundleManifest,
  releases: Map<string, ProductRelease>,
): boolean {
  if (bundle.items.length === 0) return false;

  return bundle.items.every((item) => {
    const release = releases.get(item.releaseId);
    return Boolean(
      release
      && release.productId === item.productId
      && releaseIsSellable(release),
    );
  });
}
