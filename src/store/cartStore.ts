// store/cartStore.ts
import { create } from 'zustand';

export type CartItem = {
  id: string; slug: string; title: string; brand: string; price: number; image: string; qty: number;
};

type CartState = {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'qty'>, qty?: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  count: () => number;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addToCart: (item, qty = 1) =>
    set((state) => {
      console.log('[Store] addToCart', item, qty);
      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        return { items: state.items.map((i) => i.id === item.id ? { ...i, qty: i.qty + qty } : i) };
      }
      return { items: [...state.items, { ...item, qty }] };
    }),
  removeFromCart: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
  clearCart: () => set({ items: [] }),
  count: () => get().items.reduce((sum, i) => sum + i.qty, 0),
}));
