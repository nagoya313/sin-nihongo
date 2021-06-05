import 'reflect-metadata';
import * as express from 'express';
import * as passport from 'passport';
import * as path from 'path';
import * as mongoose from 'mongoose';
import { createConnection } from 'typeorm';
import { dbConfig } from './app/config/db';
import { initPaspport } from './app/config/passport';
import { initRoutingController } from './app/config/routing_controller';

export const CLIENT_BUILD_PATH = path.join(__dirname, '../sin-nihongo');

(async () => {
  try {
    await createConnection(dbConfig());
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await mongoose.connect(process.env.MONGO_URI!, { useNewUrlParser: true, useUnifiedTopology: true });

    initPaspport();

    const app = express();
    app.use(express.static(CLIENT_BUILD_PATH));
    app.use(passport.initialize());

    initRoutingController(app);

    // routing-controllerはマッチしたものを全部呼ぶので'*'だと二重レスポンスになるので
    // /api/v1/から始まるものは除去することを明示する
    // が、いづれなんとかしたい
    app.get(/^(?!\/api\/v1\/).*$/, (request, response) => {
      response.sendFile(path.join(CLIENT_BUILD_PATH, 'index.html'));
    });

    const port = process.env.PORT || 3333;
    const server = app.listen(port, () => {
      console.log('Listening at http://localhost:' + port + '/api/v1');
    });
    server.on('error', console.error);
  } catch (error) {
    console.error(error);
  }
})();
