import type { CatalogItem, Recommendation } from "./types";

export type IntentMap = Record<string, string[]>;

const defaultIntentMap: IntentMap = {
  security: ["security", "camera", "doorbell", "lock", "entry", "motion"],
  creator: ["creator", "podcast", "stream", "audio", "video", "record"],
  travel: ["travel", "gps", "navigation", "translator", "portable"],
  recovery: ["recovery", "massage", "muscle", "joint", "heat", "vibration"],
  gaming: ["gaming", "game", "lag", "ping", "latency", "server"],
  outdoor: ["outdoor", "hunting", "optic", "watch", "pool", "patio"],
};

function normalize(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, " ").trim();
}

function getTerms(query: string, intentMap: IntentMap) {
  const normalized = normalize(query);
  const base = normalized.split(" ").filter((term) => term.length > 2);
  const expanded = new Set(base);

  for (const [intent, words] of Object.entries(intentMap)) {
    if (base.includes(intent) || words.some((word) => normalized.includes(word))) {
      words.forEach((word) => expanded.add(word));
    }
  }

  return [...expanded];
}

export function recommendCatalogItems(options: {
  query: string;
  items: CatalogItem[];
  limit?: number;
  intentMap?: IntentMap;
}): Recommendation[] {
  const { query, items, limit = 3, intentMap = defaultIntentMap } = options;
  const terms = getTerms(query, intentMap);

  const ranked = items.map((item) => {
    const title = normalize(item.title);
    const category = normalize(item.category);
    const description = normalize(item.description);
    const features = normalize(item.features.join(" "));
    const tags = normalize((item.tags ?? []).join(" "));

    let score = 0;
    for (const term of terms) {
      if (title.includes(term)) score += 5;
      if (category.includes(term)) score += 4;
      if (features.includes(term)) score += 3;
      if (tags.includes(term)) score += 3;
      if (description.includes(term)) score += 2;
    }

    const matchedFeature = item.features.find((feature) =>
      terms.some((term) => normalize(feature).includes(term))
    );

    return {
      item,
      score,
      reason: matchedFeature ?? item.category,
    };
  });

  const matches = ranked.filter((result) => result.score > 0).sort((a, b) => b.score - a.score);
  return matches.slice(0, Math.max(1, Math.min(limit, 5)));
}
