import * as express from 'express';
import * as passport from 'passport';
import * as path from 'path';
import { initRoutingController } from './routing_controller';

const CLIENT_BUILD_PATH = path.join(__dirname, '../sin-nihongo');

export const initExpress = () => {
  const app = express();
  app.use(express.static(CLIENT_BUILD_PATH));
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  app.use(passport.initialize());

  initRoutingController(app);

  // routing-controllerはマッチしたものを全部呼ぶので'*'だと二重レスポンスになるので
  // /api/v1/から始まるものは除去することを明示する
  // が、いづれなんとかしたい
  app.get(/^(?!\/api\/v1\/).*$/, (request, response) => {
    response.sendFile(path.join(CLIENT_BUILD_PATH, 'index.html'));
  });

  return app;
};
