import { Knex } from 'knex';
import { filter } from 'lodash';
import { UserPostgre } from './../../strategies/types';

interface ITemp {
  knex: Knex;
}

export async function ping(root: any, args: any, ctx: ITemp): Promise<string> {
  const result = (await ctx.knex('users')) as UserPostgre[];

  const onlyActive = filter(result, item => item.is_active);

  console.log(onlyActive.length);

  return 'pong';
}
