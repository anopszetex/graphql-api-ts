import dotenv from 'dotenv';

import { createServer, IncomingMessage, ServerResponse } from 'http';
import { PostgreStrategy } from './strategies/postgreStrategy';

dotenv.config();

const PORT = process.env.SERVER_PORT ?? 3940;

function handler(request: IncomingMessage, response: ServerResponse): void {
  PostgreStrategy('dev')
    .findOne('users', {})
    .then(result => {
      console.log('result', result);
    })
    .catch(error => {
      console.log('error', error);
    });

  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end('Hello World');
}

createServer(handler).listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running at http://localhost/${PORT}`);
});
