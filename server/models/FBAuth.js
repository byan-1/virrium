const { Model } = require('objection');

class FBAuth extends Model {
  static get tableName() {
    return 'fbauth';
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
          from: 'fbauth.uid',
          to: 'users.id'
        }
      }
    };
  }
}

module.exports = FBAuth;
