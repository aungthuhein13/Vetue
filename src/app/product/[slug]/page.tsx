import { notFound } from 'next/navigation';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import AddToCartButton from '@/components/AddToCartButton';

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = await prisma.product.findUnique({ where: { slug } });
  if (!p) return { title: 'Product not found – Vêtue' };
  return { title: `${p.title} – Vêtue`, description: `${p.brand} ${p.title}` };
}

export default async function ProductDetail(props: { params: Promise<Params> }) {
  const { slug } = await props.params;
  const p = await prisma.product.findUnique({
    where: { slug },
    include: { images: { orderBy: { sortOrder: 'asc' } } },
  });
  if (!p) return notFound();

  const main = p.images[0]?.url ?? '/placeholder.png';
  const off = Math.round(((Number(p.originalPrice) - Number(p.salePrice)) / Number(p.originalPrice)) * 100);
  const soldOut = p.qty <= 0;

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-3">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
            <Image src={main} alt={p.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            {soldOut && (
              <div className="absolute inset-0 grid place-items-center bg-black/40">
                <span className="rounded-md bg-white px-2.5 py-1 text-xs font-semibold text-gray-900">SOLD OUT</span>
              </div>
            )}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500">{p.brand}</p>
          <h1 className="mb-2 text-2xl font-semibold">{p.title}</h1>
          <div className="mb-2 flex items-center gap-2">
            <span className="text-2xl font-bold">${Number(p.salePrice)}</span>
            <span className="text-sm text-gray-500 line-through">${Number(p.originalPrice)}</span>
            <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[11px] font-semibold text-emerald-700">{off}% OFF</span>
          </div>
          <div className="space-y-1 text-sm text-gray-700">
            <p>Condition: <span className="font-medium">{p.condition.replace('_',' ')}</span></p>
            <p>Source: <span className="font-medium">{p.sourceVendor}</span></p>
            <p>Availability: <span className="font-medium">{soldOut ? 'Sold out' : p.qty === 1 ? 'Only 1 left' : `${p.qty} in stock`}</span></p>
          </div>

          <div className="mt-5 flex gap-3">
            <AddToCartButton
              product={{ id: p.id, slug: p.slug, title: p.title, brand: p.brand, salePrice: Number(p.salePrice), image: main }}
              disabled={soldOut}
            />
            <a href="/shop" className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-100">
              Continue Shopping
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
