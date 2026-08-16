const imageMetaPatterns = [
  /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i,
  /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i,
  /<meta[^>]+name=["']twitter:image(?::src)?["'][^>]+content=["']([^"']+)["']/i,
  /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image(?::src)?["']/i,
];

export function extractMerchantImage(html: string, pageUrl: string): string | null {
  for (const pattern of imageMetaPatterns) {
    const match = html.match(pattern);
    if (!match?.[1]) continue;
    try {
      const url = new URL(match[1].trim(), pageUrl);
      if (url.protocol === "https:" || url.protocol === "http:") return url.toString();
    } catch {
      // Ignore malformed merchant metadata.
    }
  }
  return null;
}

export async function repairMissingImage(input: {
  currentImage?: string | null;
  merchantPageUrl: string;
  fetchPage: (url: string) => Promise<string>;
}): Promise<string | null> {
  if (input.currentImage) return input.currentImage;
  const html = await input.fetchPage(input.merchantPageUrl);
  return extractMerchantImage(html, input.merchantPageUrl);
}
