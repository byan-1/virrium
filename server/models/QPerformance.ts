const { Model } = require('objection');
import { RelationMappings } from 'objection';

class QPerformance extends Model {
  static get tableName(): string {
    return 'qperformance';
  }

  static get relationMappings(): RelationMappings {
    const Question = require('./Question');
    return {
      questions: {
        relation: Model.BelongsToOneRelation,
        modelClass: Question,
        join: {
          from: 'qperformance.q_id',
          to: 'questions.id'
        }
      }
    };
  }

  static async getLatest(n: number) {
    const knex = QPerformance.knex();
    const latest = await knex.raw(`
      SELECT score
      FROM
      (
        SELECT *
        FROM qperformance
        ORDER BY date_time DESC
        LIMIT ${n}
      ) T1
      ORDER BY date_time`);
    return latest.rows;
  }
}

module.exports = QPerformance;
