import 'reflect-metadata';
import * as path from 'path';
import * as mongoose from 'mongoose';
import { createConnection } from 'typeorm';
import { dbConfig } from './app/config/db';
import { initExpress } from './app/config/express';
import { initPaspport } from './app/config/passport';

export const CLIENT_BUILD_PATH = path.join(__dirname, '../sin-nihongo');

(async () => {
  try {
    await createConnection(dbConfig()).catch((error) => {
      console.error(error);
    });

    await mongoose
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      .connect(process.env.MONGO_URI!, { useNewUrlParser: true, useUnifiedTopology: true })
      .catch((error) => {
        console.error(error);
      });

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
