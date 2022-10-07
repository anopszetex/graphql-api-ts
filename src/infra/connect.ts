import { Knex, knex } from 'knex';
import { getKnexConfig, getMongooseConfig } from './config';
import { Logger } from 'pino';
import mongoose, { Mongoose } from 'mongoose';

function connectKnex(database: string, logger: Logger): Knex {
  const extra: Partial<Knex.Config> = {
    pool: {
      afterCreate: (_: Knex, done: () => void) => {
        logger.info(`Connected to ${database}`);
        done();
      },
    },
  };

  return knex(getKnexConfig(database, extra));
}

async function connectMongo(
  datasource: string,
  logger: Logger
): Promise<Mongoose> {
  const { uri, connectionOptions } = getMongooseConfig(datasource);

  const conn = await mongoose.connect(uri, connectionOptions);

  logger.info(`Connected to ${datasource} database with mongoose`);

  return conn;
}

interface DataBaseContainer {
  getKnex: (datasource: string) => Knex;
  getMongo: (datasource: string) => Promise<Mongoose>;
}

export function createContainer(logger: Logger): DataBaseContainer {
  const cacheKnex = new Map<string, Knex>();
  const cacheMongo = new Map<string, Mongoose>();

  return {
    getKnex(datasource): Knex {
      if (!cacheKnex.has(datasource)) {
        cacheKnex.set(datasource, connectKnex(datasource, logger));
      }

      logger.debug(`Connection ${datasource} retrieved from cache`);

      return cacheKnex.get(datasource) as Knex;
    },
    async getMongo(datasource): Promise<Mongoose> {
      if (!cacheMongo.has(datasource)) {
        const conn = await connectMongo(datasource, logger);

        cacheMongo.set(datasource, conn);
      }

      logger.debug(
        `Connection ${datasource} retrieved from cache with mongoose`
      );

      return cacheMongo.get(datasource) as Mongoose;
    },
  };
}
