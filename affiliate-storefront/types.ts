export type AffiliateLink = {
  href: string;
  label: string;
  disclosure?: string;
};

export type ProductCardData = {
  id: string;
  merchant: string;
  category: string;
  title: string;
  description: string;
  features: string[];
  image: string;
  imageAlt: string;
  price?: string;
  badge?: string;
  affiliate: AffiliateLink;
};

export type MerchantLink = {
  name: string;
  href: string;
  accentClassName?: string;
};

export type EventCardData = {
  id: string;
  performer: string;
  eventName: string;
  dateLabel: string;
  timeLabel?: string;
  venue: string;
  location: string;
  image: string;
  imageAlt: string;
  genre?: string;
  affiliate: AffiliateLink;
};
