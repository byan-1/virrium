const { Model } = require('objection');
import { RelationMappings } from 'objection';

class QuestionSet extends Model {
  static get tableName(): string {
    return 'qsets';
  }
  static get relationMappings(): RelationMappings {
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

//Fixes Typescript namespace error
export {};
