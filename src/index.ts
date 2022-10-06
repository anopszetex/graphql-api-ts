import './env';

import { createServer, IncomingMessage, ServerResponse } from 'http';
import { PostgreStrategy } from './strategies/postgreStrategy';
import logger from './infra/logger';

const PORT = process.env.SERVER_PORT ?? 3940;

const database = PostgreStrategy('dev');

function handler(request: IncomingMessage, response: ServerResponse): void {
  logger.info('request received');

  database
    .getUser({ table: 'users', input: { id: 1 } })
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
  logger.info(`🚀 Server running at http://localhost/${PORT}`);
});
