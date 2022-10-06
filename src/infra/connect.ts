import { Knex, knex } from 'knex';
import { getConfig } from './config';

const connect = (database: string): Knex => {
  const extra = {
    pool: {
      afterCreate: (_: Knex, done: () => void) => {
        console.log('afterCreate');
        done();
      },
    },
  };

  return knex(getConfig(database, extra));
};

interface DataBaseContainer {
  get: (datasource: string) => Knex;
}

export function createContainer(): DataBaseContainer {
  return {
    get(datasource): Knex {
      return connect(datasource);
    },
  };
}
