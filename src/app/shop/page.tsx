// app/shop/page.tsx
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/mock-data';

export const metadata = {
  title: 'Shop – Vêtue',
  description: 'Curated premium resale with transparent pricing.',
};

export default function ShopPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      {/* Top bar */}
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Shop</h1>
          <p className="text-sm text-gray-600">
            Curated deals with transparency — original vs sale pricing on every item.
          </p>
        </div>

        {/* Sort & Filter placeholders (logic later) */}
        <div className="flex items-center gap-3">
          <select
            aria-label="Sort products"
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
            defaultValue="new"
          >
            <option value="new">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="discount-desc">Biggest Discount</option>
          </select>

          <button
            type="button"
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-50"
          >
            Filters
          </button>
        </div>
      </div>

      {/* Count */}
      <div className="mb-3 text-sm text-gray-600">
        Showing <span className="font-medium">{products.length}</span> items
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {/* Empty state (if no products) */}
      {products.length === 0 && (
        <div className="mt-10 rounded-xl border border-dashed border-gray-300 p-10 text-center text-gray-600">
          Nothing here yet — check back soon for curated drops.
        </div>
      )}
    </section>
  );
}
