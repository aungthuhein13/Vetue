// lib/prisma.ts
// This file exports a singleton PrismaClient instance for database access.
// It ensures that the PrismaClient is reused in development to avoid exhausting database connections.

import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['warn', 'error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
