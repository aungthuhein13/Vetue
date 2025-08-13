'use client';

import { X, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import { useUIStore } from '@/store/uiStore';
import { useCartStore } from '@/store/cartStore';

export default function CartDrawer() {
  const isOpen = useUIStore((s) => s.isCartOpen);
  const close = useUIStore((s) => s.closeCart);
  const { items, removeFromCart, clearCart } = useCartStore();

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={close}
        aria-hidden
      />

      {/* Panel */}
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-md transform bg-white shadow-xl transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} />
            <h2 className="text-sm font-semibold">Your Cart</h2>
          </div>
          <button onClick={close} aria-label="Close cart" className="rounded p-1 hover:bg-gray-100">
            <X size={18} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="p-6 text-sm text-gray-600">
            Your cart is empty. Continue shopping from the store.
          </div>
        ) : (
          <>
            <div className="max-h-[60vh] overflow-auto p-4">
              <div className="divide-y border rounded-lg">
                {items.map((i) => (
                  <div key={i.id} className="grid grid-cols-[64px_1fr_auto] items-center gap-3 p-3">
                    <div className="relative h-16 w-16 overflow-hidden rounded bg-gray-100">
                      <Image src={i.image} alt={i.title} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">{i.brand}</p>
                      <p className="text-sm font-medium">{i.title}</p>
                      <p className="text-xs text-gray-600">Qty {i.qty}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">${(i.price * i.qty).toFixed(2)}</p>
                      <button
                        onClick={() => removeFromCart(i.id)}
                        className="mt-1 text-xs text-rose-600 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="sticky bottom-0 mt-auto border-t bg-white p-5">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm text-gray-600">Subtotal</p>
                <p className="text-lg font-semibold">${subtotal.toFixed(2)}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={clearCart}
                  className="w-1/3 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold hover:bg-gray-100"
                >
                  Clear
                </button>
                <a
                  href="/cart"
                  className="w-2/3 rounded-lg bg-black px-4 py-2 text-center text-sm font-semibold text-white hover:bg-gray-900"
                  onClick={close}
                >
                  Go to Cart
                </a>
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
