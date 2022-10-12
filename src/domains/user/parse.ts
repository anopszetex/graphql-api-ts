import { UserSchemaGraphql } from './../types';
import { UserMongo } from './../../strategies/types';

function buildResult(data: UserMongo): UserSchemaGraphql {
  return {
    id: '',
    name: data.username,
    email: data.email,
    isActive: Boolean(data.is_active),
  };
}

export function parseUser(data: UserMongo): UserSchemaGraphql {
  return buildResult(data);
}
