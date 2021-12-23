import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-micro';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { resolvers } from '../../graphql/resolvers';
import { type Maybe } from '../../utils/types';
import cors from 'micro-cors';
import { GraphQLSchema } from 'graphql';
import { ResolverContextType } from '../../graphql/resolvers';
import prisma from '../../lib/prisma';
import { buildSchema } from 'type-graphql';
import path from 'path';

// ApolloServer specific config
export const config = {
  api: {
    bodyParser: false,
  },
};

let apolloServer: Maybe<ApolloServer>;
let apolloServerHandler: Maybe<NextApiHandler>;

async function ensureApollo() {
  if (!apolloServer) {
    const schema = await buildSchema({
      resolvers,
      validate: false,
      emitSchemaFile:
        process.env.NODE_ENV === 'development'
          ? path.resolve(__dirname, './generated-schema.graphql')
          : false,
    });
    apolloServer = new ApolloServer({
      schema: schema as unknown as GraphQLSchema,
      context: (): ResolverContextType => ({
        prisma,
      }),
    });
  }

  if (!apolloServerHandler) {
    await apolloServer.start();
    apolloServerHandler = apolloServer.createHandler({
      path: '/api/graphql',
    });
  }
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<Maybe<NextApiHandler>> {
  await ensureApollo();

  if (req.method === 'OPTIONS') {
    return res.end();
  }

  if (typeof apolloServerHandler !== 'function') {
    throw new Error('Unable to initialize Apollo server');
  }

  return apolloServerHandler(req, res);
}

// @ts-ignore
export default cors()(handler);
