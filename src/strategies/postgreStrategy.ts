import { createContainer } from './../infra/connect';

import { IPostgreStrategy, User, GetInput } from './../domains/utils';

export function PostgreStrategy(datasource: string): IPostgreStrategy {
  const conn = createContainer().get(datasource);

  return {
    async findOne(table: string, options: GetInput): Promise<User[]> {
      return (await conn(table).where(options).first()) as User[];
    },
  };
}
