exports.up = async function(knex) {
  await knex.schema.createTable('qperformance', table => {
    table.increments('id').primary();
    table
      .integer('q_id')
      .references('id')
      .inTable('questions');
    table.integer('score');
    table.datetime('date_time', { precision: 6 }).defaultTo(knex.fn.now(6));
  });
  await knex.raw('alter TABLE questions ALTER COLUMN a TYPE varchar(10000)');
  await knex.raw('alter TABLE questions ALTER COLUMN performance TYPE integer');
};

exports.down = async function(knex) {};
