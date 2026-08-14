import Link from "next/link";
import type { MerchantLink } from "../types";

export function MerchantNavigation({ merchants }: { merchants: MerchantLink[] }) {
  return (
    <nav aria-label="Affiliate merchants" className="flex flex-wrap gap-3">
      {merchants.map((merchant) => (
        <Link
          key={merchant.name}
          href={merchant.href}
          className={merchant.accentClassName ?? "rounded-full border px-4 py-2 text-sm font-black"}
        >
          {merchant.name} →
        </Link>
      ))}
    </nav>
  );
}
