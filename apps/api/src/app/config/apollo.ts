import { Express } from 'express';
import { ApolloServer } from 'apollo-server-express';
import * as joiful from 'joiful';
import { buildSchema, registerEnumType } from 'type-graphql';
import { ApolloServerLoaderPlugin } from 'type-graphql-dataloader';
import { OrderDirection } from '@sin-nihongo/graphql-interfaces';

export const initApolloServer = async (app: Express) => {
  const resolvers = ['apps/api/src/app/resolvers/*.ts'] as const;

  registerEnumType(OrderDirection, {
    name: 'OrderDirection',
    description: '並び替え順',
  });

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
