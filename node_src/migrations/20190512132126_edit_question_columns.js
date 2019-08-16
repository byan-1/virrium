exports.up = async function(knex) {
  await knex.raw('ALTER TABLE questions DROP COLUMN id');
  await knex.raw(
    'ALTER TABLE questions ADD COLUMN id varchar(64) NOT NULL PRIMARY KEY'
  );
  await knex.raw('ALTER TABLE qsets DROP COLUMN tags');
  await knex.raw('ALTER TABLE questions DROP COLUMN performance');
  await knex.raw('ALTER TABLE questions add COLUMN performance integer');
};

exports.down = async function(knex) {};
