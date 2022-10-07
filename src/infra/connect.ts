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

interface DataBaseContainer {
  getKnex: (datasource: string) => Knex;
  getMongo: (datasource: string) => Promise<Mongoose>;
}

export function createContainer(logger: Logger): DataBaseContainer {
  const cache = new Map<string, Knex>();

  return {
    getKnex(datasource): Knex {
      if (!cache.has(datasource)) {
        cache.set(datasource, connectKnex(datasource, logger));
      }

      logger.debug(`Connection ${datasource} retrieved from cache`);

      return cache.get(datasource) as Knex;
    },
    async getMongo(datasource): Promise<Mongoose> {
      const conn = await mongoose.connect(getMongooseConfig(), {
        dbName: 'sdadsadsasad',
        minPoolSize: 0,
        maxPoolSize: 5,
        maxIdleTimeMS: 60000,
      });

      logger.info(`Connected to ${datasource} database with mongoose`);

      return conn;
    },
  };
}
