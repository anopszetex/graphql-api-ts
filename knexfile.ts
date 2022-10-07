import './src/env';
import path from 'node:path';
import { getKnexConfig } from './src/infra/config';
import { Knex } from 'knex';

function absolute(dest: string): string {
  return path.join(__dirname, dest);
}

export default (): Knex.Config => {
  const dbname = process.env.KNEX_DB_NAME ?? 'dev';

  const extra = {
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: absolute('knex/migrations'),
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: absolute('knex/seeds'),
    },
  };

  return getKnexConfig(dbname, extra);
};
