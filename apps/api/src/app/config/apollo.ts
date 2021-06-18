import { Express } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { fieldExtensionsEstimator, getComplexity, simpleEstimator } from 'graphql-query-complexity';
import { ApolloServerLoaderPlugin } from 'type-graphql-dataloader';
import { buildGlaphQLSchema } from './glaphql';

const LIMIT_COMPLEXITY = 1000;

export const initApolloServer = async (app: Express) => {
  const schema = await buildGlaphQLSchema();

  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      const context = { req };
      return context;
    },
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
