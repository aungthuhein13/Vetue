// components/CartLink.tsx
'use client';

import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useUIStore } from '@/store/uiStore';

export default function CartLink() {
  const count = useCartStore((s) => s.count());
  const open = useUIStore((s) => s.openCart);

  return (
    <button onClick={open} className="relative inline-flex items-center">
      <ShoppingCart size={20} />
      {count > 0 && (
        <span className="absolute -right-2 -top-2 rounded-full bg-rose-600 px-1.5 text-[10px] font-semibold text-white">
          {count}
        </span>
      )}
    </button>
  );
}
