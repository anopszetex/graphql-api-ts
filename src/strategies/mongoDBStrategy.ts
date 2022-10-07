import { UserMongo } from './types';

import UserSchema from './schema/User';

type GetInput = Partial<Omit<UserMongo, 'password'>>;

interface ExtendGetInput extends Omit<GetInput, 'is_active'> {
  is_active: string;
}

export interface UserContext {
  input: GetInput;
  columns?: string | string[] | ExtendGetInput;
}

export interface IMongoDBStrategy {
  getUser: (args: UserContext) => Promise<UserMongo | null>;
  getUserList: (args: UserContext) => Promise<UserMongo[]>;
}

export function mongoDBStrategy(): IMongoDBStrategy {
  return {
    async getUser(args: UserContext): Promise<UserMongo | null> {
      const { input, columns = {} } = args;

      return await UserSchema.findOne(input).select(columns).limit(1);
    },
    async getUserList(args: UserContext): Promise<UserMongo[]> {
      const { input, columns = {} } = args;

      return await UserSchema.find(input).select(columns);
    },
  };
}
