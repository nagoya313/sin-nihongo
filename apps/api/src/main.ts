import 'reflect-metadata';
import path from 'path';
import { createConnections } from 'typeorm';
import { initExpress } from './app/config/express';
import dbConfig from './app/config/ormconfig';
import { initPaspport } from './app/config/passport';

export const CLIENT_BUILD_PATH = path.join(__dirname, '../sin-nihongo');

(async () => {
  try {
    await createConnections(dbConfig);

    initPaspport();

    const app = await initExpress();

    const port = process.env.PORT || 3333;
    const server = app.listen(port, () => {
      console.log('Listening at http://localhost:' + port + '/api/v1');
    });
    server.on('error', console.error);
  } catch (error) {
    console.error(error);
  }
})();
