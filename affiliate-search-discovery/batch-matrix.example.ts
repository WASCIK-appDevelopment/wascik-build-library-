export type BatchRequest = {
  brandId: string;
  categoryId: string;
  limit: number;
};

export function buildBatchMatrix(
  brandIds: string[],
  categoryIds: string[],
  requestedPerPair: number,
  maximumPerPair = 20,
): BatchRequest[] {
  const limit = Math.max(1, Math.min(requestedPerPair, maximumPerPair));
  const brands = [...new Set(brandIds.filter(Boolean))];
  const categories = [...new Set(categoryIds.filter(Boolean))];

  return brands.flatMap((brandId) =>
    categories.map((categoryId) => ({ brandId, categoryId, limit })),
  );
}

export async function runBatchMatrix<T>(
  requests: BatchRequest[],
  fetchBatch: (request: BatchRequest) => Promise<T[]>,
): Promise<Array<BatchRequest & { results: T[] }>> {
  return Promise.all(
    requests.map(async (request) => ({
      ...request,
      results: (await fetchBatch(request)).slice(0, request.limit),
    })),
  );
}
