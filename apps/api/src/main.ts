import * as express from 'express';
import * as path from 'path';
import { Message } from '@sin-nihongo/api-interfaces';

const CLIENT_BUILD_PATH = path.join(__dirname, '../sin-nihongo');

const app = express();
app.use(express.static(CLIENT_BUILD_PATH));

const greeting: Message = { message: 'Welcome to api!' };

app.get('/api', (req, res) => {
  res.send(greeting);
});

app.get('*', (request, response) => {
  response.sendFile(path.join(CLIENT_BUILD_PATH, 'index.html'));
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api/v1');
});
server.on('error', console.error);
