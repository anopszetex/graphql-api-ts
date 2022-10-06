import { Knex } from 'knex';
import { defaultsDeep } from 'lodash';

const config = Object.freeze({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST_POSTGRES ?? '127.0.0.1',
    port: process.env.DB_PORT_POSTGRES ?? '5432',
    user: process.env.DB_USER_POSTGRES ?? 'root',
    password: process.env.DB_PASS_POSTGRES ?? 'root',
    database: process.env.DB_NAME_POSTGRES ?? 'dev',
  },
  pool: { min: 0, max: 5, idleTimeoutMillis: 60000 },
});

export function getConfig(database: string, extra = {}): Knex.Config {
  return defaultsDeep(
    { connection: { database } },
    extra,
    config
  ) as Knex.Config;
}
