import Image from "next/image";
import type { ProductCardData } from "../types";

export function ProductCard({ product }: { product: ProductCardData }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border bg-white shadow-sm">
      <div className="relative aspect-[4/3] bg-slate-50">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-contain p-4"
        />
        {product.badge ? (
          <span className="absolute left-4 top-4 rounded-full bg-slate-950 px-3 py-1 text-xs font-bold text-white">
            {product.badge}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-bold uppercase tracking-widest text-sky-700">
          {product.merchant} · {product.category}
        </p>
        <h3 className="mt-3 text-2xl font-black">{product.title}</h3>
        {product.price ? <p className="mt-2 text-lg font-bold">{product.price}</p> : null}
        <p className="mt-4 leading-7 text-slate-600">{product.description}</p>

        <ul className="mt-5 grid gap-2 text-sm text-slate-700">
          {product.features.map((feature) => (
            <li key={feature} className="flex gap-2">
              <span aria-hidden="true">✓</span><span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-6">
          <a
            href={product.affiliate.href}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-sky-600 px-5 py-3 text-center font-black text-white"
          >
            {product.affiliate.label}
          </a>
          <p className="mt-3 text-center text-xs text-slate-500">
            {product.affiliate.disclosure ?? "Affiliate link · Pricing and availability may change."}
          </p>
        </div>
      </div>
    </article>
  );
}
