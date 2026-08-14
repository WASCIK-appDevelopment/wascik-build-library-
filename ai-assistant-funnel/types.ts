export type AssistantPageRole =
  | "service"
  | "store"
  | "merchant"
  | "owner"
  | "general";

export type AssistantPageContext = {
  pathname: string;
  role: AssistantPageRole;
  merchant?: string;
  knowledgeScope: string[];
  requiresDisclosure: boolean;
  preferredActions: string[];
};

export type CatalogItem = {
  id: string | number;
  merchant?: string;
  title: string;
  category: string;
  description: string;
  features: string[];
  url?: string;
  imageUrl?: string;
  tags?: string[];
};

export type Recommendation = {
  item: CatalogItem;
  score: number;
  reason: string;
};

export type AssistantReply = {
  text: string;
  role: AssistantPageRole;
  recommendations?: Recommendation[];
  disclosure?: string;
  actions?: Array<{
    label: string;
    href?: string;
    action?: string;
  }>;
  handoffReady?: boolean;
};
