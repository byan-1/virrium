exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(table) {
      table.increments('id').primary();
      table
        .string('email')
        .unique()
        .notNullable();
      table.string('account_type').notNullable();
      table.string('validation_data').notNullable();
    })
  ]);
};

exports.down = function(knex) {
  return knex.schema.dropTable('validation');
};
