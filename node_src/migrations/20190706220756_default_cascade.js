exports.up = async function(knex, Promise) {
  await knex.raw('ALTER TABLE qperformance ALTER COLUMN score SET DEFAULT 0');
  await knex.raw(`ALTER TABLE questions
    ADD CONSTRAINT cascade_delete
    FOREIGN KEY (qset_id)
    REFERENCES qsets (id)
    ON DELETE CASCADE`);
  await knex.raw(`ALTER TABLE qperformance
    ADD CONSTRAINT cascade_delete
    FOREIGN KEY (q_id)
    REFERENCES questions (id)
    ON DELETE CASCADE`);
};

exports.down = function(knex, Promise) {};