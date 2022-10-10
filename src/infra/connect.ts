import { Knex, knex } from 'knex';
import { Logger } from 'pino';
import mongoose, { Mongoose } from 'mongoose';
import { getKnexConfig, getMongooseConfig } from './config';

function connectKnex(database: string, logger: Logger): Knex {
  const extra: Partial<Knex.Config> = {
    pool: {
      afterCreate: (_: Knex, done: () => void) => {
        logger.info(`Connected to ${database} database with knex`);
        done();
      },
    },
  };

  return knex(getKnexConfig(database, extra));
}

async function connectMongoose(
  database: string,
  logger: Logger
): Promise<Mongoose> {
  const { uri, connectionOptions } = getMongooseConfig(database);

  const conn = await mongoose.connect(uri, connectionOptions);

  logger.info(`Connected to ${database} database with mongoose`);

  return conn;
}

interface DataBaseContainer {
  getKnex: (datasource: string) => Knex;
  getMongoose: (datasource: string) => Promise<Mongoose>;
}

export function createContainer(logger: Logger): DataBaseContainer {
  const cacheKnex = new Map<string, Knex>();
  const cacheMongo = new Map<string, Mongoose>();

  return {
    getKnex(datasource): Knex {
      if (!cacheKnex.has(datasource)) {
        cacheKnex.set(datasource, connectKnex(datasource, logger));
      }

      logger.debug(`Connection ${datasource} retrieved from cache [knex]`);

      return cacheKnex.get(datasource) as Knex;
    },
    async getMongoose(datasource): Promise<Mongoose> {
      if (!cacheMongo.has(datasource)) {
        const conn = await connectMongoose(datasource, logger);

        cacheMongo.set(datasource, conn);
      }

      logger.debug(`Connection ${datasource} retrieved from cache [mongoose]`);

      return cacheMongo.get(datasource) as Mongoose;
    },
  };
}
