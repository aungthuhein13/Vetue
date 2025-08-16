// app/cart/page.tsx
'use client';
import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';
import { useState } from 'react';

export default function CartPage() {
  const { items, removeFromCart, clearCart } = useCartStore();
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const [loading, setLoading] = useState(false);

  async function startCheckout() {
    try {
      setLoading(true);
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({ title: i.title, price: i.price, qty: i.qty })),
        }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else alert('Checkout failed.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Your Cart</h1>

      {items.length === 0 ? (
        <p className="mt-4 text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="mt-6 divide-y rounded-xl border">
            {items.map((i) => (
              <div key={i.id} className="grid grid-cols-[80px_1fr_auto] items-center gap-4 p-4">
                <div className="relative h-20 w-20 overflow-hidden rounded bg-gray-100">
                  <Image src={i.image} alt={i.title} fill className="object-cover" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{i.brand}</p>
                  <p className="font-medium">{i.title}</p>
                  <p className="text-sm text-gray-700">Qty {i.qty}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${(i.price * i.qty).toFixed(2)}</p>
                  <button
                    onClick={() => removeFromCart(i.id)}
                    className="mt-2 text-sm text-rose-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={clearCart}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold hover:bg-gray-100"
            >
              Clear Cart
            </button>
            <div className="text-right">
              <p className="text-sm text-gray-600">Subtotal</p>
              <p className="text-xl font-bold">${total.toFixed(2)}</p>
              <button
                onClick={startCheckout}
                disabled={loading}
                className="mt-3 rounded-lg bg-black px-5 py-3 text-sm font-semibold text-white hover:bg-gray-900 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                {loading ? 'Redirecting…' : 'Checkout'}
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
