const EXPLICIT_BAD_LINK =
  /(?:malformed|invalid|incorrect|bad)\s+(?:affiliate\s+|tracking\s+)?(?:link|url)|(?:link|url)\s+(?:is\s+)?(?:malformed|invalid)|unable\s+to\s+(?:process|parse).{0,40}(?:link|url)/i;

export function normalizeAffiliateUrl(value: string) {
  try {
    const url = new URL(value.trim().replaceAll("&amp;", "&"));
    if (!["http:", "https:"].includes(url.protocol) || !url.hostname) return "";
    if (url.username || url.password) return "";
    return url.toString();
  } catch {
    return "";
  }
}

/**
 * Reject only proven-bad links.
 * A timeout or merchant bot block is inconclusive and should not discard a
 * potentially valid commission link.
 */
export async function affiliateLinkIsUsable(value: string) {
  const url = normalizeAffiliateUrl(value);
  if (!url) return false;

  try {
    const response = await fetch(url, {
      redirect: "follow",
      cache: "no-store",
      signal: AbortSignal.timeout(7_000),
      headers: { Accept: "text/html,application/xhtml+xml" },
    });
    if (!normalizeAffiliateUrl(response.url || url)) return false;

    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) {
      return ![400, 404, 410, 422].includes(response.status);
    }

    const body = (await response.text()).slice(0, 120_000);
    return !EXPLICIT_BAD_LINK.test(body);
  } catch {
    return true;
  }
}

export async function discardMalformedCandidates<T extends { affiliateUrl: string }>(items: T[]) {
  const checked = await Promise.all(items.map(async (item) => ({
    item,
    usable: await affiliateLinkIsUsable(item.affiliateUrl),
  })));
  return checked.filter(({ usable }) => usable).map(({ item }) => item);
}
