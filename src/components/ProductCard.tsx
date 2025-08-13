// components/ProductCard.tsx
// This component displays a product card with an image, title, brand, pricing, condition, and vendor information.
// It uses a link to navigate to the product detail page and includes a discount percentage if applicable
// The card also indicates if there is only one item left in stock.

import Link from "next/link";
import type { Product } from "@/lib/mock-data";

function percentOff(orig: number, sale: number) {
  return Math.round(((orig - sale) / orig) * 100);
}

export default function ProductCard({ p }: { p: Product }) {
  const off = percentOff(p.originalPrice, p.salePrice);
  return (
    <Link
      href={`/product/${p.slug}`}
      className="group block rounded-xl border border-gray-200 bg-white p-3 hover:shadow-md transition"
    >
      <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={p.images[0] || "/placeholder.png"}
          alt={p.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500">
            {p.brand}
          </p>
          <h3 className="text-sm font-medium text-gray-900">{p.title}</h3>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-900">
              ${p.salePrice}
            </span>
            <span className="text-xs text-gray-500 line-through">
              ${p.originalPrice}
            </span>
            <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700">
              {off}% OFF
            </span>
          </div>
          <p className="mt-1 text-[11px] text-gray-500">
            {p.condition.replace("_", " ")} · {p.sourceVendor}
          </p>
        </div>
        {p.qty === 1 && (
          <span className="shrink-0 rounded-full bg-rose-50 px-2 py-1 text-[10px] font-semibold text-rose-700">
            Only 1 left
          </span>
        )}
      </div>
    </Link>
  );
}
