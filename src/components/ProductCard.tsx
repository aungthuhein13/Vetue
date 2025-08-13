// components/ProductCard.tsx
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/mock-data";

function percentOff(original: number, sale: number) {
  return Math.round(((original - sale) / original) * 100);
}

export default function ProductCard({ product }: { product: Product }) {
  const off = percentOff(product.originalPrice, product.salePrice);
  const soldOut = product.qty <= 0;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:shadow-md"
      aria-label={`${product.brand} ${product.title}`}
    >
      {/* Image */}
      <div className="relative aspect-square w-full bg-gray-100">
        <Image
          src={product.images?.[0] || "/placeholder.png"}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 300px"
          priority={false}
        />

        {/* Sold out overlay */}
        {soldOut && (
          <div className="absolute inset-0 grid place-items-center bg-black/40">
            <span className="rounded-md bg-white px-2.5 py-1 text-xs font-semibold text-gray-900">
              SOLD OUT
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-1 p-3">
        <p className="text-[11px] uppercase tracking-wide text-gray-500">
          {product.brand}
        </p>
        <h3 className="line-clamp-2 text-sm font-medium text-gray-900">
          {product.title}
        </h3>

        {/* Pricing */}
        <div className="mt-1 flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-900">
            ${product.salePrice}
          </span>
          <span className="text-xs text-gray-500 line-through">
            ${product.originalPrice}
          </span>
          <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700">
            {off}% OFF
          </span>
        </div>

        {/* Meta */}
        <div className="flex items-center justify-between">
          <p className="text-[11px] text-gray-500">
            {product.condition.replace("_", " ")} · {product.sourceVendor}
          </p>

          {/* Urgency badge */}
          {product.qty === 1 && !soldOut && (
            <span className="rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-semibold text-rose-700">
              Only 1 left
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
