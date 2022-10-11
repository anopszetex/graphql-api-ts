import './env';
import logger from './infra/logger';
import { buildServer } from './server/index';

const PORT = process.env.SERVER_PORT ?? 3940;

buildServer(logger)
  .then(async server => {
    return await server.listen(PORT);
  })
  .then(({ url }) => {
    logger.info(`🚀 Server ready at ${url}`);
    return null;
  })
  .catch((err: Error) => {
    logger.error(
      { errorData: err },
      `❌ Ocurred an error in server start ${err.message}`
    );
  });
