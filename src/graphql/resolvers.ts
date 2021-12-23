import { resolver as artistResolver } from '../modules/artist/resolver';
import { NonEmptyArray } from 'type-graphql';
import { PrismaClient } from '@prisma/client';

export type ResolverContextType = {
  prisma: PrismaClient;
};

export const resolvers: NonEmptyArray<Function> = [
  ...artistResolver,
] as unknown as NonEmptyArray<Function>;
