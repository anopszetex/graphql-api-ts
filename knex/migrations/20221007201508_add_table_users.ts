import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable('users', function (table) {
    table.increments('id').primary().unsigned();
    table.string('username', 100).nullable();
    table.string('first_name', 100).nullable();
    table.string('last_name', 100).nullable();
    table.string('password', 225).nullable();
    table.boolean('is_active').defaultTo(true);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable('users');
}
