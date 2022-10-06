import './env';

import { createServer, IncomingMessage, ServerResponse } from 'http';
import { PostgreStrategy } from './strategies/postgreStrategy';
import { createContainer } from './infra/connect';
import logger from './infra/logger';

const conn = createContainer(logger);

conn.get('dev');
conn.get('dev');
conn.get('dev');
conn.get('dev');
conn.get('dev');
conn.get('dev');

const knex = PostgreStrategy(conn.get('dev'));

const PORT = process.env.SERVER_PORT ?? 3940;
function handler(request: IncomingMessage, response: ServerResponse): void {
  logger.info('request received');

  knex
    .getUser({ table: 'users', input: { id: 1 }, columns: ['id'] })
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
