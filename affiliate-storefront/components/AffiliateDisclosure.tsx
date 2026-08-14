type Props = {
  merchantName?: string;
  resaleMarketplace?: boolean;
  className?: string;
};

export function AffiliateDisclosure({
  merchantName = "the merchant",
  resaleMarketplace = false,
  className = "",
}: Props) {
  return (
    <section className={className} aria-labelledby="affiliate-disclosure-title">
      <h2 id="affiliate-disclosure-title">Affiliate disclosure</h2>
      <p>
        We may earn a commission from qualifying purchases made through links
        on this page, at no additional cost to you. Prices, availability,
        specifications, and promotions may change. Review {merchantName}&apos;s
        current listing and purchase terms before ordering.
      </p>
      {resaleMarketplace ? (
        <p>
          This ticket provider is a resale marketplace, not the venue or box
          office. Ticket prices may be above or below face value, and event
          schedules, performers, seats, fees, and availability may change.
        </p>
      ) : null}
    </section>
  );
}
