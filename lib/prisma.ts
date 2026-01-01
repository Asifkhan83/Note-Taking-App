// Prisma client setup
// Note: Prisma client will be available after running `npx prisma generate`
// For development without Prisma engines, use the mock database in lib/mock-db.ts

let prisma: any = null;

try {
  // Try to import PrismaClient if it's been generated
  const { PrismaClient } = require('@prisma/client');

  const globalForPrisma = globalThis as unknown as {
    prisma: any | undefined
  }

  prisma = globalForPrisma.prisma ?? new PrismaClient({
    log: ['query'],
  })

  if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
} catch (error) {
  // PrismaClient not generated yet, will use mock database
  console.log('Prisma client not available, using mock database');
}

export { prisma }
