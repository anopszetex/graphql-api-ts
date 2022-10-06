import { IPostgreStrategy } from './../strategies/postgreStrategy';

export function createContextStrategy(
  contextStrategy: IPostgreStrategy
): IPostgreStrategy {
  const strategy = contextStrategy;

  return {
    async getUser(args) {
      return await strategy.getUser(args);
    },
    async getUserList(args) {
      return await strategy.getUserList(args);
    },
  };
}
