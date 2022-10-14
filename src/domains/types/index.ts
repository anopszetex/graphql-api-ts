import { Logger } from 'pino';
import { ILoadDb } from '../../base/contextStrategy';

export interface UserSchemaGraphql {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
}

export interface ContextParams extends ILoadDb {
  logger: Logger;
}
