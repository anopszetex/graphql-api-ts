import './env';

import { createServer, IncomingMessage, ServerResponse } from 'http';
import { postgreStrategy } from './strategies/postgreStrategy';
import { createContainer } from './infra/connect';
import logger from './infra/logger';

import { mongoDBStrategy } from './strategies/mongoDBStrategy';

// import {createContainer} from './infra/connect'
const conn = createContainer(logger);
const datasource = 'dev';
const knex = postgreStrategy(conn.getKnex(datasource));

const PORT = process.env.SERVER_PORT ?? 3940;

async function handler(
  request: IncomingMessage,
  response: ServerResponse
): Promise<void> {
  logger.info('request received');

  await conn.getMongo(datasource);
  await conn.getMongo(datasource);
  await conn.getMongo(datasource);
  await conn.getMongo(datasource).catch((error: Error) => {
    logger.error({ error }, 'error');
  });

  mongoDBStrategy()
    .getUser({
      input: { email: 'teste1@teste.com' },
      columns: {
        is_active: '$is_active',
        email: '$email',
      },
    })
    .then(result => {
      logger.info({ result }, 'users with MONGODB');
      return null;
    })
    .catch((error: Error) => {
      logger.error({ error }, 'error with MONGODB');
    });

  /* knex
    .getUser({ table: 'users', input: { id: 1 }, columns: ['id'] })
    .then(result => {
      logger.info({ result }, 'users');
      return null;
    })
    .catch((error: Error) => {
      logger.error({ error }, 'error');
    }); */

  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end('Hello World');
}

// eslint-disable-next-line @typescript-eslint/no-misused-promises
createServer(handler).listen(PORT, () => {
  logger.info(`🚀 Server running at http://localhost/${PORT}`);
});
