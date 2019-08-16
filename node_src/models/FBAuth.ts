const { Model } = require('objection');
import { RelationMappings } from 'objection';

class FBAuth extends Model {
  static get tableName() : string {
    return 'fbauth';
  }

  static get idColumn() : string {
    return 'uid';
  }

  static get relationMappings() : RelationMappings {
    const User = require('./User');

    return {
      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'fbauth.uid',
          to: 'users.id'
        }
      }
    };
  }
}

module.exports = FBAuth;

//Fixes Typescript namespace error
export {};
