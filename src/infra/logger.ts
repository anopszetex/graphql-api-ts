import pinoLogger from 'pino';
import { isDevelopment } from './../support';

const logger = pinoLogger({
  name: 'graphql-api-ts',
  messageKey: 'message',
  level: isDevelopment() ? 'debug' : 'info',
  transport: isDevelopment() ? { target: 'pino-pretty' } : undefined,
  formatters: {
    level: label => {
      return { level: label };
    },
  },
  base: {
    appVersion:
      process.env.APP_VERSION === undefined
        ? // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-var-requires
          (require('../../package.json').version as string)
        : process.env.APP_VERSION,
  },
});

export default logger;
