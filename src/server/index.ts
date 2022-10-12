import { ApolloServer } from 'apollo-server';
import { Logger } from 'pino';

import { buildResolvers } from './resolvers';
import { buildTypeDefs } from './typedefs';
import { buildContext } from './context';

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
