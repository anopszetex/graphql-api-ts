/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line node/no-unpublished-require
require('ts-node').register();
// eslint-disable-next-line node/no-unpublished-require, no-unused-expressions, node/no-missing-require
const { getKnexConfig } = require('./src/infra/config');

const path = require('node:path');

function absolute(dest) {
  return path.join(__dirname, dest);
}

module.exports = () => {
  const dbname = process.env.KNEX_DB_NAME ?? 'dev';

  const extra = {
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: absolute('./src/database/knex/migrations'),
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: absolute('./src/database/knex/seeds'),
    },
  };

  return getKnexConfig(dbname, extra);
};
