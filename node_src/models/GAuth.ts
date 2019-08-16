const { Model } = require('objection');
import { RelationMappings } from 'objection';

class GAuth extends Model {
  static get tableName() : string {
    return 'gauth';
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
          from: 'gauth.uid',
          to: 'users.id'
        }
      }
    };
  }
}

module.exports = GAuth;
