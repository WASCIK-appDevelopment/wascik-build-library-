import type { AssistantPageContext, AssistantPageRole } from "./types";

export type PageRule = {
  test: (pathname: string) => boolean;
  role: AssistantPageRole;
  merchant?: string;
  knowledgeScope: string[];
  requiresDisclosure?: boolean;
  preferredActions?: string[];
};

export function createPageContextResolver(rules: PageRule[]) {
  return function resolvePageContext(pathname = "/"): AssistantPageContext {
    const cleanPath = pathname.split("?")[0] || "/";
    const match = rules.find((rule) => rule.test(cleanPath));

    if (!match) {
      return {
        pathname: cleanPath,
        role: "general",
        knowledgeScope: ["site-navigation", "approved-general-knowledge"],
        requiresDisclosure: false,
        preferredActions: ["navigate", "contact"],
      };
    }

    return {
      pathname: cleanPath,
      role: match.role,
      merchant: match.merchant,
      knowledgeScope: match.knowledgeScope,
      requiresDisclosure: match.requiresDisclosure ?? false,
      preferredActions: match.preferredActions ?? [],
    };
  };
}

export const examplePageRules: PageRule[] = [
  {
    test: (path) => path === "/" || path.startsWith("/services"),
    role: "service",
    knowledgeScope: ["company-services", "pricing", "process", "lead-qualification"],
    preferredActions: ["start-project", "contact", "book-consultation"],
  },
  {
    test: (path) => path === "/shop" || path === "/affiliate-services",
    role: "store",
    knowledgeScope: ["multi-brand-catalog", "shopping-guidance"],
    requiresDisclosure: true,
    preferredActions: ["recommend-product", "browse-category"],
  },
  {
    test: (path) => path.startsWith("/shop/merchant-a"),
    role: "merchant",
    merchant: "Merchant A",
    knowledgeScope: ["merchant-a-catalog", "merchant-a-page-content"],
    requiresDisclosure: true,
    preferredActions: ["recommend-product", "open-merchant-link"],
  },
  {
    test: (path) => path.startsWith("/owner-ai-studio"),
    role: "owner",
    knowledgeScope: ["private-brand-context", "content-generation", "campaign-planning"],
    preferredActions: ["generate-content", "save-draft"],
  },
];
