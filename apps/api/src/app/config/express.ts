import * as express from 'express';
import * as passport from 'passport';
import * as path from 'path';
import { initApolloServer } from './apollo';

const CLIENT_BUILD_PATH = path.join(__dirname, '../sin-nihongo');

export const initExpress = async () => {
  const app = express();
  app.use(express.static(CLIENT_BUILD_PATH));
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  app.use(passport.initialize());

  await initApolloServer(app);

  app.get('*', (_request, response) => {
    response.sendFile(path.join(CLIENT_BUILD_PATH, 'index.html'));
  });

  return app;
};
