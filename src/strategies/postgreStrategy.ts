import { Knex } from 'knex';

export interface User {
  id: number;
  email: string;
  username: string;
  isActive: boolean;
  firstName: string;
  lastName: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

type GetInput = Partial<Omit<User, 'password'>>;

export interface UserContext {
  table: string;
  input: GetInput;
  columns?: string | string[];
}

export interface IPostgreStrategy {
  getUser: (args: UserContext) => Promise<User>;
  getUserList: (args: UserContext) => Promise<User[]>;
}

export function postgreStrategy(conn: Knex): IPostgreStrategy {
  return {
    async getUser(args: UserContext): Promise<User> {
      const { table, input, columns = '*' } = args;

      return (await conn(table).where(input).select(columns).first()) as User;
    },
    async getUserList(args: UserContext): Promise<User[]> {
      const { table, input, columns = '*' } = args;

      return (await conn(table).select(columns).where(input)) as User[];
    },
  };
}
