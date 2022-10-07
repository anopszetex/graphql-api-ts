import './env';

import { createServer, IncomingMessage, ServerResponse } from 'http';
import { postgreStrategy } from './strategies/postgreStrategy';
import { createContainer } from './infra/connect';
import logger from './infra/logger';

// import {createContainer} from './infra/connect'
const conn = createContainer(logger);
const datasource = 'dev';
const knex = postgreStrategy(conn.getKnex(datasource));

const PORT = process.env.SERVER_PORT ?? 3940;

function handler(request: IncomingMessage, response: ServerResponse): void {
  logger.info('request received');

  conn.getMongo(datasource);

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
