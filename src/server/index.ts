import { ApolloServer } from 'apollo-server';
import { Logger } from 'pino';
import hyperid from 'hyperid';

// eslint-disable-next-line node/no-unpublished-import
import { ExpressContext } from 'apollo-server-express';

import { buildResolvers } from './resolvers';
import { buildTypeDefs } from './typedefs';

import { createContainer } from './../infra/connect';
import { loadDb, ILoadDb } from './../base/contextStrategy';

interface IContext {
  context: (ctx: ExpressContext) => Promise<ILoadDb>;
}

function buildContext(parentLogger: Logger): IContext {
  const database = createContainer(parentLogger);

  return {
    async context(ctx: ExpressContext) {
      const req = ctx.req.originalUrl;

      const instance = hyperid();
      const traceId = instance();
      const datasource = 'dev';

      const logger = parentLogger.child({ req, datasource, traceId });

      //* connect to postgre
      const knex = database.getKnex(datasource);

      //* connect to mongodb
      const mongoose = await database.getMongoose(datasource);

      logger.info('context created');

      logger.debug(ctx.req.headers);

      return loadDb(knex, mongoose);
    },
  };
}

interface IBuildServer {
  listen: (port: string | number) => Promise<{ url: string }>;
  stop: () => Promise<void>;
}

export async function buildServer(logger: Logger): Promise<IBuildServer> {
  const [resolvers, typeDefs] = await Promise.all([
    buildResolvers(),
    buildTypeDefs(),
  ]);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    context: buildContext(logger),
  });

  return {
    async listen(port) {
      const { url } = await server.listen(port);

      return { url: `${url}graphql` };
    },
    async stop() {
      return await server.stop();
    },
  };
}
