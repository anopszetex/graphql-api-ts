// eslint-disable-next-line node/no-unpublished-import
import { ExpressContext } from 'apollo-server-express';

import { get } from 'lodash';
import { Logger } from 'pino';
import compress from 'graphql-query-compress';
import hyperid from 'hyperid';

import { loadDb } from '../../base/contextStrategy';
import { createContainer } from '../../infra/connect';
import { ContextParams } from '../../domains/types';

type IContext = (ctx: ExpressContext) => Promise<ContextParams>;

function debugRequest(logger: Logger, req: ExpressContext['req']): void {
  const raw = get(req, ['body', 'query'], 'empty-query') as string;

  const query = compress(raw);

  logger.debug(`New request: ${req.headers.host ?? ''} ${query}`);
}

export function buildContext(parentLogger: Logger): IContext {
  const database = createContainer(parentLogger);

  return async function context(ctx: ExpressContext) {
    const instance = hyperid();
    const traceId = instance();
    const datasource = 'dev';

    const logger = parentLogger.child({
      datasource,
      traceId,
      origin: ctx.req.headers.origin,
    });

    debugRequest(logger, ctx.req);

    //* connect to postgre
    const knex = database.getKnex(datasource);

    //* connect to mongodb
    const mongoose = await database.getMongoose(datasource);

    logger.debug('Context created');

    return { ...loadDb(knex, mongoose), logger };
  };
}
