import { Knex } from 'knex';
import { Mongoose } from 'mongoose';

import { UserMongo, UserPostgre } from './../strategies/types';

import {
  postgreStrategy,
  UserContext as PostgreArgs,
} from './../strategies/postgreStrategy';

import {
  mongoDBStrategy,
  UserContext as MongoArgs,
} from './../strategies/mongoDBStrategy';

interface IStrategy<T, U, V> {
  getUser: (args: T) => Promise<U>;
  getUserList: (args: T) => Promise<V>;
}

function createContextStrategy<T, U, V>(
  contextStrategy: IStrategy<T, U, V>
): IStrategy<T, U, V> {
  const strategy = contextStrategy;

  return {
    async getUser(args: T): Promise<U> {
      return await strategy.getUser(args);
    },
    async getUserList(args: T): Promise<V> {
      return await strategy.getUserList(args);
    },
  };
}

interface ILoadDb {
  knex: Knex;
  mongo: Mongoose;
  queryBuilder: {
    postgre: IStrategy<PostgreArgs, UserPostgre | undefined, UserPostgre[]>;
    mongodb: IStrategy<MongoArgs, UserMongo | null, UserMongo[]>;
  };
}

export function loadDb(knex: Knex, mongo: Mongoose): ILoadDb {
  const postgre = createContextStrategy<
    PostgreArgs,
    UserPostgre | undefined,
    UserPostgre[]
  >(postgreStrategy(knex));

  const mongodb = createContextStrategy<
    MongoArgs,
    UserMongo | null,
    UserMongo[]
  >(mongoDBStrategy());

  return { knex, mongo, queryBuilder: { postgre, mongodb } };
}
