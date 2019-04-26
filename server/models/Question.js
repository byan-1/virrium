const { Model } = require('objection');

class Question extends Model {
  static get tableName() {
    return 'questions';
  }

  static get relationMappings() {
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
