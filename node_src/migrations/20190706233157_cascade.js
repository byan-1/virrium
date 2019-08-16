exports.up = async function(knex) {
  await knex.raw(`ALTER TABLE questions
  DROP CONSTRAINT cascade_delete,
  DROP CONSTRAINT questions_qset_id_foreign,
  ADD CONSTRAINT questions_qset_id_foreign
  FOREIGN KEY (qset_id)
  REFERENCES qsets (id)
  ON DELETE CASCADE`);
  await knex.raw(`ALTER TABLE qperformance
  DROP CONSTRAINT cascade_delete,
  DROP CONSTRAINT qperformance_q_id_foreign,
  ADD CONSTRAINT qperformance_q_id_foreign
  FOREIGN KEY (q_id)
  REFERENCES questions (id)
  ON DELETE CASCADE`);
};

exports.down = function(knex) {};
