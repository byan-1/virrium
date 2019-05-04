const { Model } = require('objection');
import { RelationMappings } from 'objection';

class Question extends Model {
  static get tableName() : string {
    return 'questions';
  }

  static get relationMappings() : RelationMappings {
    const QuestionSet = require('./QuestionSet');
    return {
      questionset: {
        relation: Model.BelongsToOneRelation,
        modelClass: QuestionSet,
        join: {
          from: 'questions.qset_id',
          to: 'qsets.id'
        }
      }
    };
  }
}

module.exports = Question;

