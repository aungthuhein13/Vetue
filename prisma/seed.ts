// prisma/seed.ts
// This script seeds the database with initial product data for Vêtue.
// It uses Prisma to connect to the database and insert products with their details.

import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const products: Prisma.ProductCreateInput[] = [
    {
      slug: 'olive-fleece-hoodie',
      title: 'Olive Fleece Hoodie',
      brand: 'Nike',
      description: 'Soft fleece. Versatile layer.',
      originalPrice: 89,
      salePrice: 38,
      condition: 'LIKE_NEW',
      qty: 1,
      sourceVendor: 'Nordstrom Rack',
      images: { create: [{ url: '/placeholder.png', sortOrder: 0 }] },
    },
    {
      slug: 'camel-wool-overcoat',
      title: 'Camel Wool Overcoat',
      brand: 'COS',
      description: 'Warm, minimal silhouette.',
      originalPrice: 250,
      salePrice: 145,
      condition: 'VERY_GOOD',
      qty: 1,
      sourceVendor: 'Nordstrom Rack',
      images: { create: [{ url: '/placeholder.png', sortOrder: 0 }] },
    },
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: p,
    });
  }
}

main().finally(async () => prisma.$disconnect());
