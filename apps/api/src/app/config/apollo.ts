import { Express } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { GlyphResolver } from '../resolvers/GlyphResolver';
import { GlyphqikiResolver } from '../resolvers/GlyphwikiRespolver';
import { InfoResolver } from '../resolvers/InfoResolver';
import { KanjiResolver } from '../resolvers/KanjiResolver';
import { RadicalResolver } from '../resolvers/RadicalResolver';

export const initApolloServer = async (app: Express) => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  const resolvers = [GlyphResolver, GlyphqikiResolver, InfoResolver, KanjiResolver, RadicalResolver] as const;
  const schema = await buildSchema({ resolvers });

  const server = new ApolloServer({
    schema,
    introspection: true,
    playground: true,
  });

  server.applyMiddleware({ app });
};
