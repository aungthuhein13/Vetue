import { prisma } from '@/lib/prisma';

export const metadata = {
  title: 'Shop – Vêtue',
  description: 'Curated premium resale with transparent pricing.',
};

export default async function ShopPage() {
  const products = await prisma.product.findMany({
    include: { images: { orderBy: { sortOrder: 'asc' }, take: 1 } },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Shop</h1>
          <p className="text-sm text-gray-600">
            Curated deals with transparency — original vs sale pricing on every item.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm">
            <option>Newest</option>
          </select>
          <button className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-50">
            Filters
          </button>
        </div>
      </div>

      <div className="mb-3 text-sm text-gray-600">Showing <span className="font-medium">{products.length}</span> items</div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => {
          const img = p.images[0]?.url ?? '/placeholder.png';
          const off = Math.round(((Number(p.originalPrice) - Number(p.salePrice)) / Number(p.originalPrice)) * 100);
          return (
            <a key={p.id} href={`/product/${p.slug}`} className="group block overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:shadow-md">
              <div className="relative aspect-square w-full bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt={p.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
              </div>
              <div className="space-y-1 p-3">
                <p className="text-[11px] uppercase tracking-wide text-gray-500">{p.brand}</p>
                <h3 className="line-clamp-2 text-sm font-medium text-gray-900">{p.title}</h3>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900">${Number(p.salePrice)}</span>
                  <span className="text-xs text-gray-500 line-through">${Number(p.originalPrice)}</span>
                  <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700">{off}% OFF</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[11px] text-gray-500">{p.condition.replace('_',' ')} · {p.sourceVendor}</p>
                  {p.qty === 1 && <span className="rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-semibold text-rose-700">Only 1 left</span>}
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
