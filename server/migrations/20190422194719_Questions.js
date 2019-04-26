exports.up = async function(knex) {
  await knex.schema.createTable('qsets', table => {
    table.increments('id').primary();
    table
      .integer('uid')
      .references('id')
      .inTable('users');
    table.string('name').notNullable();
    table.specificType('tags', 'text ARRAY');
  });
  await knex.schema.createTable('questions', table => {
    table.increments('id').primary();
    table
      .integer('qset_id')
      .references('id')
      .inTable('qsets');
    table.string('q', 500);
    table.string('a', 3000);
    table.specificType('performance', 'integer ARRAY');
  });
  await knex.raw('alter TABLE emailauth ALTER COLUMN email TYPE varchar(255)');
  await knex.raw(
    'alter TABLE emailauth ALTER COLUMN password TYPE varchar(255)'
  );
};

exports.down = async function(knex) {
  await knex.schema.dropTable('qsets');
  await knex.schema.dropTable('questions');
  await knex.raw('alter TABLE emailauth ALTER COLUMN email TYPE varchar(64)');
  await knex.raw('alter TABLE emailauth ALTER COLUMN email TYPE varchar(64)');
};
