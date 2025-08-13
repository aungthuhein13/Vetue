// lib/mock-data.ts
export type Product = {
  id: string;
  slug: string;
  title: string;
  brand: string;
  images: string[];
  originalPrice: number;
  salePrice: number;
  condition: "NEW" | "LIKE_NEW" | "VERY_GOOD" | "GOOD";
  qty: number;
  sourceVendor: string;
};

export const products: Product[] = [
  {
    id: "p1",
    slug: "olive-hoodie",
    title: "Olive Fleece Hoodie",
    brand: "Nike",
    images: ["/placeholder/hoodie-olive.jpg"],
    originalPrice: 89,
    salePrice: 38,
    condition: "LIKE_NEW",
    qty: 1,
    sourceVendor: "Nordstrom Rack",
  },
  {
    id: "p2",
    slug: "black-denim-jacket",
    title: "Black Denim Jacket",
    brand: "Levi’s",
    images: ["/placeholder/denim-black.jpg"],
    originalPrice: 129,
    salePrice: 59,
    condition: "VERY_GOOD",
    qty: 1,
    sourceVendor: "Marshalls",
  },
];
