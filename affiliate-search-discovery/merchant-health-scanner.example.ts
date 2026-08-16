export type HealthState =
  | "healthy"
  | "not_found"
  | "unavailable"
  | "duplicate"
  | "review";

const unavailableSignals = [
  /out of stock/i,
  /sold out/i,
  /discontinued/i,
  /no longer available/i,
];

export function isProductSpecificUrl(url: URL): boolean {
  const path = url.pathname.replace(/\/+$/, "");
  return path.length > 1 && !/^\/(home|shop|products?|catalog)?$/i.test(path);
}

export async function inspectMerchantDestination(
  affiliateUrl: string,
): Promise<{ state: HealthState; finalUrl?: string; reason?: string; html?: string }> {
  const response = await fetch(affiliateUrl, {
    redirect: "follow",
    cache: "no-store",
    signal: AbortSignal.timeout(12_000),
    headers: { "user-agent": "CatalogHealthMonitor/1.0" },
  });

  const finalUrl = response.url || affiliateUrl;
  if (response.status === 404 || response.status === 410) {
    return { state: "not_found", finalUrl, reason: `HTTP ${response.status}` };
  }
  if (!response.ok) {
    return { state: "review", finalUrl, reason: `HTTP ${response.status}` };
  }

  const html = await response.text();
  const productSpecific = isProductSpecificUrl(new URL(finalUrl));
  if (productSpecific && unavailableSignals.some((signal) => signal.test(html))) {
    return { state: "unavailable", finalUrl, reason: "Merchant page reports unavailable", html };
  }

  return { state: "healthy", finalUrl, html };
}

export function duplicateKey(input: {
  merchant: string;
  title: string;
  destinationUrl?: string;
}): string {
  const normalized = (value: string) =>
    value.toLowerCase().replace(/https?:\/\/(www\.)?/g, "").replace(/[^a-z0-9]+/g, " ").trim();
  return [normalized(input.merchant), normalized(input.title), normalized(input.destinationUrl ?? "")].join("|");
}
