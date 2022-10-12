// eslint-disable-next-line node/no-unpublished-import
import { ExpressContext } from 'apollo-server-express';

import hyperid from 'hyperid';
import { Logger } from 'pino';
import { ILoadDb, loadDb } from '../../base/contextStrategy';
import { createContainer } from '../../infra/connect';

type IContext = (ctx: ExpressContext) => Promise<ILoadDb>;

export function buildContext(parentLogger: Logger): IContext {
  const database = createContainer(parentLogger);

  return async function context(ctx: ExpressContext) {
    const instance = hyperid();
    const traceId = instance();
    const datasource = 'dev';

    const logger = parentLogger.child({
      datasource,
      traceId,
      req: ctx.req.headers.origin,
    });

    //* connect to postgre
    const knex = database.getKnex(datasource);

    //* connect to mongodb
    const mongoose = await database.getMongoose(datasource);

    logger.debug('Context created');

    return loadDb(knex, mongoose);
  };
}
