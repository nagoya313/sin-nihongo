import { Express } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema, NonEmptyArray } from 'type-graphql';
import { GlyphqikiResolver } from '../resolvers/GlyphwikiRespolver';
import { InfoResolver } from '../resolvers/InfoResolver';
import { RadicalResolver } from '../resolvers/RadicalResolver';

export const initApolloServer = async (app: Express) => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  const resolvers: NonEmptyArray<Function> = [GlyphqikiResolver, InfoResolver, RadicalResolver];
  const schema = await buildSchema({ resolvers });

  const server = new ApolloServer({
    schema,
    introspection: true,
    playground: true,
  });

  server.applyMiddleware({ app });
};
