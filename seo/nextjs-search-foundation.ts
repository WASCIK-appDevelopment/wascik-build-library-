import type { Metadata, MetadataRoute } from "next";

export type SearchFoundationConfig = {
  siteName: string;
  siteUrl: string;
  description: string;
  locale?: string;
};

export function createRootMetadata(
  config: SearchFoundationConfig,
): Metadata {
  return {
    metadataBase: new URL(config.siteUrl),
    title: {
      default: config.siteName,
      template: `%s | ${config.siteName}`,
    },
    description: config.description,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      url: "/",
      siteName: config.siteName,
      title: config.siteName,
      description: config.description,
      locale: config.locale ?? "en_US",
    },
    twitter: {
      card: "summary",
      title: config.siteName,
      description: config.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export function createRobots(
  siteUrl: string,
): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}

export type SitemapEntry = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

export function createSitemap(
  siteUrl: string,
  entries: SitemapEntry[],
): MetadataRoute.Sitemap {
  return entries.map(({ path, changeFrequency, priority }) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
