import './env';

import logger from './infra/logger';
import { createServer, IncomingMessage, ServerResponse } from 'http';
import { createContainer } from './infra/connect';

import { loadDb } from './base/contextStrategy';

async function createContext(datasource: string): Promise<void> {
  const database = createContainer(logger);

  //* connect to postgre
  const knex = database.getKnex(datasource);

  //* connect to mongodb
  const mongoose = await database.getMongoose(datasource);

  const { queryBuilder } = loadDb(knex, mongoose);

  queryBuilder.postgre
    .getUser({
      table: 'users',
      input: { id: 1 },
      columns: ['id', 'email'],
    })
    .then(result => {
      logger.info({ result }, 'users');
      return null;
    })
    .catch((error: Error) => {
      logger.error({ error }, 'error');
    });

  queryBuilder.mongodb
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
}

const PORT = process.env.SERVER_PORT ?? 3940;

async function handler(
  _: IncomingMessage,
  response: ServerResponse
): Promise<void> {
  logger.info('request received');

  await createContext('dev');

  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end('Hello World');
}

// eslint-disable-next-line @typescript-eslint/no-misused-promises
createServer(handler).listen(PORT, () => {
  logger.info(`🚀 Server running at http://localhost/${PORT}`);
});
