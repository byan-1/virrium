exports.up = async function(knex, Promise) {
  await knex.raw('ALTER TABLE questions DROP COLUMN id');
  await knex.raw('ALTER TABLE questions ADD COLUMN id SERIAL PRIMARY KEY');
};

exports.down = function(knex, Promise) {};
