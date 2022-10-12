import { Knex } from 'knex';
import { defaults } from 'lodash';
import argon2 from 'argon2';

// eslint-disable-next-line node/no-unpublished-import
import { faker } from '@faker-js/faker';
import { UserPostgre } from './../../../strategies/types';

faker.locale = 'pt_BR';

const BASE_PASSWORD = '12345';
const ADMIN_EMAIL = 'demo@demo.com';

async function newHash(): Promise<string> {
  return await argon2.hash(BASE_PASSWORD);
}

type UserSeed = Omit<UserPostgre, 'id' | 'created_at' | 'updated_at'>;

async function newUser(def = {}): Promise<UserSeed> {
  const password = await newHash();

  return defaults({}, def, {
    username: faker.internet.userName(),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    is_active: faker.datatype.boolean(),
    password,
  });
}

function* gen(): Generator<Promise<UserSeed>> {
  for (let index = 0; index < 1000; index++) {
    yield newUser();
  }
}

export async function seed(knex: Knex): Promise<void> {
  await knex.raw('ALTER TABLE users DISABLE TRIGGER ALL');

  await knex('users').del();

  await knex.raw('ALTER TABLE users ENABLE TRIGGER ALL');

  const admin = await newUser({ email: ADMIN_EMAIL, is_active: true });

  const userEntries: UserSeed[] = [];

  for await (const user of gen()) {
    userEntries.push(user);
  }

  await knex('users').insert([admin, ...userEntries]);
}
