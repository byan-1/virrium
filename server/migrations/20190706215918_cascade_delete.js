exports.up = async function(knex) {
  await knex.raw('ALTER TABLE qsets ALTER COLUMN id ON DELETE CASCADE');
  await knex.raw('ALTER TABLE questions ALTER COLUMN id ON DELETE CASCADE');
};

exports.down = function(knex) {};
