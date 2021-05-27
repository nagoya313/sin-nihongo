import * as express from 'express';
import * as path from 'path';
import { initRoutingController } from './config/routing_controller';

export const CLIENT_BUILD_PATH = path.join(__dirname, '../sin-nihongo');

const app = express();
app.use(express.static(CLIENT_BUILD_PATH));

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
