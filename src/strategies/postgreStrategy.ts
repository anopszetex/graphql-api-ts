import { Knex } from 'knex';
import { UserPostgre } from './types';

type GetInput = Partial<Omit<UserPostgre, 'password'>>;

export interface UserContext {
  table: string;
  input: GetInput;
  columns?: string | string[];
}

export interface IPostgreStrategy {
  getUser: (args: UserContext) => Promise<UserPostgre | undefined>;
  getUserList: (args: UserContext) => Promise<UserPostgre[]>;
}

export function postgreStrategy(conn: Knex): IPostgreStrategy {
  return {
    async getUser(args: UserContext): Promise<UserPostgre | undefined> {
      const { table, input, columns = '*' } = args;

      return (await conn(table).where(input).select(columns).first()) as
        | UserPostgre
        | undefined;
    },
    async getUserList(args: UserContext): Promise<UserPostgre[]> {
      const { table, input, columns = '*' } = args;

      return (await conn(table).select(columns).where(input)) as UserPostgre[];
    },
  };
}
