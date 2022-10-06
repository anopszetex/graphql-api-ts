// import './env';

import { createServer, IncomingMessage, ServerResponse } from 'http';
import { PostgreStrategy } from './strategies/postgreStrategy';
import logger from './infra/logger';

const PORT = process.env.SERVER_PORT ?? 3940;

function handler(request: IncomingMessage, response: ServerResponse): void {
  const database = PostgreStrategy('dev');

  logger.info('request received');

  database
    .findOne('users', {})
    .then(result => {
      logger.info({ result }, 'users');
      return null;
    })
    .catch((error: Error) => {
      logger.error({ error }, 'error');
    });

  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end('Hello World');
}

createServer(handler).listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running at http://localhost/${PORT}`);
});
