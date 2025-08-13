// app/product/[slug]/page.tsx
// This file defines the product detail page that displays detailed information about a specific product
// It includes the product image, title, brand, pricing, condition, source vendor, and an "Add to Cart" button
// If the product is not found, it returns a 404 not found response

import { notFound } from "next/navigation";
import { products } from "@/lib/mock-data";

type Props = { params: { slug: string } };

export default function ProductDetail({ params }: Props) {
  const p = products.find((x) => x.slug === params.slug);
  if (!p) return notFound();

  const off = Math.round(
    ((p.originalPrice - p.salePrice) / p.originalPrice) * 100,
  );

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-3">
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.images[0] || "/placeholder.png"}
              alt={p.title}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500">
            {p.brand}
          </p>
          <h1 className="mb-2 text-2xl font-semibold">{p.title}</h1>
          <div className="mb-1 flex items-center gap-2">
            <span className="text-xl font-bold">${p.salePrice}</span>
            <span className="text-sm text-gray-500 line-through">
              ${p.originalPrice}
            </span>
            <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[11px] font-semibold text-emerald-700">
              {off}% OFF
            </span>
          </div>

          <p className="text-sm text-gray-600">
            Condition:{" "}
            <span className="font-medium">{p.condition.replace("_", " ")}</span>
          </p>
          <p className="text-sm text-gray-600">
            Source: <span className="font-medium">{p.sourceVendor}</span>
          </p>

          <div className="mt-4">
            <button className="rounded-lg bg-black px-5 py-3 text-sm font-semibold text-white hover:bg-gray-900">
              Add to Cart
            </button>
          </div>

          <div className="mt-6 space-y-1 text-sm text-gray-700">
            <p className="font-medium">Why we picked this item</p>
            <p>
              Premium quality, strong value versus MSRP, and versatile styling.
              Curated to make discount fashion feel premium and transparent.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
