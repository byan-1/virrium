const { Model } = require('objection');

class GAuth extends Model {
  static get tableName() {
    return 'gauth';
  }

  static get idColumn() {
    return 'uid';
  }

  static get relationMappings() {
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
