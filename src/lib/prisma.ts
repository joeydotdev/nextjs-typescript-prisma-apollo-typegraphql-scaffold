import { PrismaClient } from '@prisma/client';
import { type Maybe } from '../utils/types';

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
// https://pris.ly/d/help/next-js-best-practices

const globalObj: typeof globalThis & { prisma?: PrismaClient } = global;

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!globalObj.prisma) {
    globalObj.prisma = new PrismaClient();
  }
  prisma = globalObj.prisma;
}

export default prisma;
