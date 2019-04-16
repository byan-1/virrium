const { Model } = require('objection');

class EmailAuth extends Model {
  static get tableName() {
    return 'emailauth';
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
          from: 'emailauth.uid',
          to: 'users.id'
        }
      }
    };
  }
}

module.exports = EmailAuth;
