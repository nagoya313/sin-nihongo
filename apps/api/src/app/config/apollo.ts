import { Express } from 'express';
import { ApolloServer } from 'apollo-server-express';
import * as joiful from 'joiful';
import { buildSchema } from 'type-graphql';
import { ApolloServerLoaderPlugin } from 'type-graphql-dataloader';

export const initApolloServer = async (app: Express) => {
  const resolvers = ['apps/api/src/app/resolvers/*.ts'] as const;
  const schema = await buildSchema({
    resolvers,
    validate: (argValue: Record<string, unknown> | null | undefined) => {
      const { error } = joiful.validate(argValue);
      if (error) {
        throw error;
      }
    },
  });

  const server = new ApolloServer({
    schema,
    introspection: true,
    playground: true,
    plugins: [ApolloServerLoaderPlugin()],
  });

  server.applyMiddleware({ app });
};
