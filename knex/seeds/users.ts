import { Knex } from 'knex';
// eslint-disable-next-line node/no-unpublished-import
import { faker } from '@faker-js/faker';
import argon2 from 'argon2';
import { defaults } from 'lodash';

faker.locale = 'pt_BR';

const basePassword = '12345';
const adminEmail = 'demo@demo.com';

interface UserSeed {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_active: boolean;
  password: string;
}

async function newHash(): Promise<string> {
  return await argon2.hash(basePassword);
}

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

export async function seed(knex: Knex): Promise<void> {
  await knex.raw('ALTER TABLE users DISABLE TRIGGER ALL');

  await knex('users').del();

  await knex.raw('ALTER TABLE users ENABLE TRIGGER ALL');

  const admin = await newUser({ email: adminEmail, is_active: true });

  const userEntries: UserSeed[] = [];

  for (let index = 0; index < 2e3; index++) {
    userEntries.push(await newUser());
  }

  await knex('users').insert([admin, ...userEntries]);
}
