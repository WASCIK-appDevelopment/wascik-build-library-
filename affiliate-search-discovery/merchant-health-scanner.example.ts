export type HealthState =
  | "healthy"
  | "not_found"
  | "unavailable"
  | "duplicate"
  | "review";

const definitiveUnavailableMarkers = [
  "product not found",
  "item not found",
  "page not found",
  "this product is no longer available",
  "no longer available",
  "product has been discontinued",
  "this item has been discontinued",
];

const stockUnavailableMarkers = [
  "currently unavailable",
  "item unavailable",
  "out of stock",
  "sold out",
];

const trackingDomains = [
  "pxf.io",
  "sjv.io",
  "jdoqocy.com",
  "tkqlhce.com",
  "anrdoezrs.net",
  "dpbolvw.net",
  "kqzyfj.com",
  "evyy.net",
  "prf.hn",
];

function visiblePageText(html: string): string {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/\s+/g, " ")
    .toLowerCase();
}

export function isProductSpecificUrl(url: URL): boolean {
  const path = url.pathname.replace(/\/+$/, "");
  return path.length > 1 && !/^\/(home|shop|products?|catalog)?$/i.test(path);
}

function isTrackingHost(value: string): boolean {
  try {
    const host = new URL(value).hostname.toLowerCase();
    return trackingDomains.some(
      (domain) => host === domain || host.endsWith(`.${domain}`),
    );
  } catch {
    return false;
  }
}

export function productAvailability(html: string): {
  inStock: boolean;
  unavailableMarker: string;
} {
  const schemaMatches = Array.from(
    html.matchAll(
      /["']availability["']\s*:\s*["'](?:https?:\\?\/\\?\/schema\.org\\?\/)?([^"'\\,}\s]+)/gi,
    ),
  );
  const schemaValues = schemaMatches.map((match) =>
    String(match[1] ?? "").replace(/\\/g, "").toLowerCase(),
  );

  const inStock = schemaValues.some((value) =>
    [
      "instock",
      "preorder",
      "presale",
      "limitedavailability",
      "onlineonly",
      "instoreonly",
    ].includes(value),
  );
  const structuredUnavailable =
    schemaValues.find((value) =>
      ["outofstock", "soldout", "discontinued"].includes(value),
    ) ?? "";

  // Stock wording counts only inside a product-availability/status region.
  // Do not flag a product because an unrelated recommendation or hidden
  // variant elsewhere in the HTML says "out of stock."
  const regions = Array.from(
    html.matchAll(
      /<(?:div|span|p|section)[^>]+(?:id|class)=["'][^"']*(?:availability|stock-status|product-status)[^"']*["'][^>]*>([\s\S]{0,4000}?)<\/(?:div|span|p|section)>/gi,
    ),
  );
  const regionText = visiblePageText(
    regions.map((match) => match[1] ?? "").join(" "),
  );
  const regionalMarker =
    stockUnavailableMarkers.find((marker) => regionText.includes(marker)) ?? "";

  return {
    inStock,
    unavailableMarker: structuredUnavailable || regionalMarker,
  };
}

export async function inspectMerchantDestination(
  affiliateUrl: string,
): Promise<{ state: HealthState; finalUrl?: string; reason?: string; html?: string }> {
  try {
    const response = await fetch(affiliateUrl, {
      redirect: "follow",
      cache: "no-store",
      signal: AbortSignal.timeout(12_000),
      headers: {
        "user-agent": "CatalogHealthMonitor/2.0",
        accept: "text/html,application/xhtml+xml",
      },
    });

    const finalUrl = response.url || affiliateUrl;
    const unresolvedTrackingFailure =
      (response.status === 404 || response.status === 410) &&
      isTrackingHost(affiliateUrl) &&
      isTrackingHost(finalUrl);

    // Affiliate trackers may reject server monitoring while still working in a
    // real browser. Do not call that a dead merchant listing.
    if ((response.status === 404 || response.status === 410) && !unresolvedTrackingFailure) {
      return { state: "not_found", finalUrl, reason: `HTTP ${response.status}` };
    }
    if (!response.ok) {
      return { state: "review", finalUrl, reason: `HTTP ${response.status}` };
    }

    const contentType = response.headers.get("content-type") ?? "";
    const html = contentType.includes("text/html")
      ? (await response.text()).slice(0, 1_500_000)
      : "";
    const productSpecific = isProductSpecificUrl(new URL(finalUrl));
    if (!productSpecific || !html) return { state: "healthy", finalUrl, html };

    const pageText = visiblePageText(html);
    const definitiveMarker =
      definitiveUnavailableMarkers.find((marker) => pageText.includes(marker)) ?? "";
    const availability = productAvailability(html);

    // A structured InStock/PreOrder signal overrides stray stock wording.
    const unavailableMarker =
      definitiveMarker ||
      (!availability.inStock ? availability.unavailableMarker : "");

    return unavailableMarker
      ? {
          state: "unavailable",
          finalUrl,
          reason: `Merchant product availability reports "${unavailableMarker}"`,
          html,
        }
      : { state: "healthy", finalUrl, html };
  } catch {
    // Timeouts, bot blocks, and network errors are not proof of unavailability.
    return { state: "review", finalUrl: affiliateUrl, reason: "Monitor could not verify listing" };
  }
}

export function duplicateKey(input: {
  merchant: string;
  title: string;
  destinationUrl?: string;
}): string {
  const normalized = (value: string) =>
    value
      .toLowerCase()
      .replace(/https?:\/\/(www\.)?/g, "")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();

  return [
    normalized(input.merchant),
    normalized(input.title),
    normalized(input.destinationUrl ?? ""),
  ].join("|");
}
