// app/shop/page.tsx
// This file defines the main shop page that displays a grid of product cards
// Each product card shows the product image, title, brand, pricing, condition, and vendor

import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/mock-data";

export default function ShopPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Shop</h1>
          <p className="text-sm text-gray-500">
            Curated deals with transparency — original vs sale pricing on every
            item.
          </p>
        </div>
        <div className="text-sm text-gray-600">
          Showing {products.length} items
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </main>
  );
}
