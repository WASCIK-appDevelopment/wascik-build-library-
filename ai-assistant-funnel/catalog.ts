import type { CatalogItem } from "./types";

export type CatalogAdapter<T> = (source: T) => CatalogItem[];

export function normalizeCatalog<T>(sources: T[], adapter: CatalogAdapter<T>): CatalogItem[] {
  return sources.flatMap(adapter);
}

export function filterCatalog(items: CatalogItem[], merchant?: string) {
  if (!merchant) return items;
  const target = merchant.trim().toLowerCase();
  return items.filter((item) => item.merchant?.toLowerCase() === target);
}

export function createStoreLevelItem(input: {
  id: string;
  merchant: string;
  title: string;
  description: string;
  url: string;
  tags?: string[];
}): CatalogItem {
  return {
    id: input.id,
    merchant: input.merchant,
    title: input.title,
    category: "Storefront",
    description: input.description,
    features: input.tags ?? [],
    url: input.url,
    tags: input.tags,
  };
}
