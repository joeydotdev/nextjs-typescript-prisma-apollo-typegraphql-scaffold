This is a [Next.js 12](https://nextjs.org/) scaffold that includes TypeScript, Apollo GraphQL, Prisma, and TypeGraphQL setup. This backend stack allows for you to write your one schema that will:

- codegen interactions with your database (Prisma)
- codegen to create GraphQL resolvers around your Prisma models (optional)
- host a GraphQL server for you that is optimized for serverless hosting (Vercel & Apollo Server)

## Getting Started

First, install the development server:

```bash
yarn
```

Then generate your Prisma/TypeGraphQL types & resolvers:

```bash
yarn generate
```

Then to boot up the server:

```bash
yarn dev
```

Open [http://localhost:3000/graphql](http://localhost:3000/graphql) in your browser to see the result.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Prisma Documentation](https://www.prisma.io/) - type-first ORM
- [Apollo Server Documentation](https://www.apollographql.com/docs/apollo-server/getting-started/) - graphql server
- [TypeGraphQL Documentation](https://prisma.typegraphql.com/) - create resolvers (optionally from your prisma schema) & autogen generate GraphQL schema
