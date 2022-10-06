import { Knex, knex } from 'knex';
import { getConfig } from './config';
import { Logger } from 'pino';

function connect(database: string, logger: Logger): Knex {
  const extra: Partial<Knex.Config> = {
    pool: {
      afterCreate: (_: Knex, done: () => void) => {
        logger.info(`Connected to ${database}`);
        done();
      },
    },
  };

  return knex(getConfig(database, extra));
}

interface DataBaseContainer {
  get: (datasource: string) => Knex;
}

export function createContainer(logger: Logger): DataBaseContainer {
  const cache = new Map<string, Knex>();

  return {
    get(datasource): Knex {
      if (!cache.has(datasource)) {
        cache.set(datasource, connect(datasource, logger));
      }

      logger.debug(`Connection ${datasource} retrieved from cache`);

      return cache.get(datasource) as Knex;
    },
  };
}
