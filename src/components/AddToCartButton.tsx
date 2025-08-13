// components/AddToCartButton.tsx
'use client';

import { useCartStore } from '@/store/cartStore';
import { useUIStore } from '@/store/uiStore';

interface Product {
  id: string;
  slug: string;
  title: string;
  brand: string;
  salePrice: number;
  image: string;
}

export default function AddToCartButton({ product, disabled }: { product: Product; disabled: boolean }) {
  const addToCart = useCartStore((s) => s.addToCart);
  const openCart = useUIStore((s) => s.openCart);

  return (
    <button
      disabled={disabled}
      onClick={() => {
        if (disabled) return;
        addToCart(
          {
            id: product.id,
            slug: product.slug,
            title: product.title,
            brand: product.brand,
            price: product.salePrice,
            image: product.image,
          },
          1
        );
        openCart(); // <— slide the drawer in
      }}
      className="rounded-lg bg-black px-5 py-3 text-sm font-semibold text-white hover:bg-gray-900 disabled:cursor-not-allowed disabled:bg-gray-300"
    >
      {disabled ? 'Sold Out' : 'Add to Cart'}
    </button>
  );
}
