import { ILoadDb } from '../../base/contextStrategy';

export interface UserSchemaGraphql {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
}

export type ContextParams = ILoadDb;
