export type SearchTarget = {
  brandId: string | null;
  categoryId: string;
  requestedCount: number;
};

export type ProviderProduct = {
  id: string;
  brand: string;
  title: string;
  category: string;
  description: string;
  destinationUrl: string;
  imageUrl: string;
  price?: string;
  source: string;
};

export type ProductProvider = {
  search(input: {
    brandId: string | null;
    categoryId: string;
    limit: number;
    excludeIds: Set<string>;
    location?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<ProviderProduct[]>;
};

export function buildSearchTargets(
  brandIds: string[],
  categoryIds: string[],
  requestedCount: number,
  maximum = 20,
): SearchTarget[] {
  const safeCount = Math.max(1, Math.min(maximum, requestedCount));
  return categoryIds.flatMap((categoryId) =>
    brandIds.length
      ? brandIds.map((brandId) => ({ brandId, categoryId, requestedCount: safeCount }))
      : [{ brandId: null, categoryId, requestedCount: safeCount }],
  );
}

function hasUsableImage(product: ProviderProduct) {
  return /^https?:\/\//i.test(product.imageUrl);
}

export async function searchBatches(
  provider: ProductProvider,
  targets: SearchTarget[],
  excludeIds: Set<string>,
) {
  return Promise.all(
    targets.map(async (target) => {
      const items = await provider.search({
        brandId: target.brandId,
        categoryId: target.categoryId,
        limit: target.requestedCount,
        excludeIds,
      });

      const unique = new Map<string, ProviderProduct>();
      for (const item of items) {
        if (excludeIds.has(item.id) || !hasUsableImage(item)) continue;
        unique.set(item.id, item);
        if (unique.size >= target.requestedCount) break;
      }

      return { ...target, items: [...unique.values()] };
    }),
  );
}
