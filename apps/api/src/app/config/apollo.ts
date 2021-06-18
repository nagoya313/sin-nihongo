import { Express } from 'express';
import { ApolloServer } from 'apollo-server-express';
import * as joiful from 'joiful';
import { buildSchema, registerEnumType } from 'type-graphql';
import { fieldExtensionsEstimator, getComplexity, simpleEstimator } from 'graphql-query-complexity';
import { ApolloServerLoaderPlugin } from 'type-graphql-dataloader';
import { OrderDirection } from '@sin-nihongo/graphql-interfaces';

const LIMIT_COMPLEXITY = 1000;

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
    plugins: [
      ApolloServerLoaderPlugin(),
      {
        requestDidStart: () => ({
          didResolveOperation({ request, document }) {
            const complexity = getComplexity({
              schema,
              operationName: request.operationName,
              query: document,
              variables: request.variables,
              estimators: [fieldExtensionsEstimator(), simpleEstimator({ defaultComplexity: 1 })],
            });
            if (complexity > LIMIT_COMPLEXITY) {
              throw new Error(
                `Sorry, too complicated query! ${complexity} is over ${LIMIT_COMPLEXITY} that is the max allowed complexity.`
              );
            }
            console.log('Used query complexity points:', complexity);
          },
        }),
      },
    ],
  });

  server.applyMiddleware({ app });
};
