exports.up = async function(knex) {
  await knex.raw(
    `
      CREATE TABLE users(
        id SERIAL PRIMARY KEY
      );
    `
  );

  await knex.raw(
    `
      CREATE TABLE gauth(
        uid integer REFERENCES users (id) PRIMARY KEY,
        googleID varchar(64)
      );
    `
  );

  await knex.raw(
    `
      CREATE TABLE fbauth(
        uid integer REFERENCES users (id) PRIMARY KEY,
        fbID varchar(64)
      );
    `
  );

  await knex.raw(
    `
      CREATE TABLE emailauth(
        uid integer REFERENCES users (id) PRIMARY KEY,
        email varchar(64),
        password varchar(64)
      );
    `
  );
};

exports.down = async function(knex) {
  await knex.schema.dropTable('gauth');
  await knex.schema.dropTable('fbauth');
  await knex.schema.dropTable('emailauth');
  await knex.schema.dropTable('users');
};
