const { Model } = require('objection');

class QuestionSet extends Model {
  static get tableName() {
    return 'qsets';
  }
  static get relationMappings() {
    const User = require('./User');
    const Question = require('./Question');
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'qsets.uid',
          to: 'users.id'
        }
      },
      question: {
        relation: Model.HasManyRelation,
        modelClass: Question,
        join: {
          from: 'qsets.id',
          to: 'questions.qset_id'
        }
      }
    };
  }
}

module.exports = QuestionSet;
