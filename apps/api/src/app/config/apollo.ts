import { Express } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { ApolloServerLoaderPlugin } from 'type-graphql-dataloader';
import { getConnection } from 'typeorm';
//import { GlyphResolver } from '../resolvers/GlyphResolver';
//import { GlyphqikiResolver } from '../resolvers/GlyphwikiRespolver';
import { InfoResolver } from '../resolvers/InfoResolver';
//import { KanjiResolver, KanjiConnectionResolver } from '../resolvers/KanjiResolver';
//import { RadicalResolver, RadicalConnectionResolver } from '../resolvers/RadicalResolver';

export const initApolloServer = async (app: Express) => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  const resolvers = [
    InfoResolver,
    /*GlyphResolver,
    GlyphqikiResolver,
    InfoResolver,
    KanjiResolver,
    KanjiConnectionResolver,
    RadicalResolver,
    RadicalConnectionResolver,*/
  ] as const;
  const schema = await buildSchema({ resolvers });

  const server = new ApolloServer({
    schema,
    introspection: true,
    playground: true,
    /*plugins: [
      ApolloServerLoaderPlugin({
        typeormGetConnection: getConnection,
      }),
    ],*/
  });

  server.applyMiddleware({ app });
};
