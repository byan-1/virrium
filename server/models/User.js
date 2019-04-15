const { Model } = require('objection');

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get relationMappings() {
    const GAuth = require('./GAuth');
    const FBauth = require('./FBAuth');
    return {
      googleauth: {
        relation: Model.HasOneRelation,
        modelClass: GAuth,
        join: {
          from: 'users.id',
          to: 'gauth.uid'
        }
      },
      facebookauth: {
        relation: Model.HasOneRelation,
        modelClass: FBauth,
        join: {
          from: 'users.id',
          to: 'fbauth.uid'
        }
      }
    };
  }
}

module.exports = User;
