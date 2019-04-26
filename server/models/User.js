const { Model } = require('objection');

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get relationMappings() {
    const GAuth = require('./GAuth');
    const FBAuth = require('./FBAuth');
    const EmailAuth = require('./EmailAuth');
    const QuestionSet = require('./QuestionSet');
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
        modelClass: FBAuth,
        join: {
          from: 'users.id',
          to: 'fbauth.uid'
        }
      },
      eauth: {
        relation: Model.HasOneRelation,
        modelClass: EmailAuth,
        join: {
          from: 'users.id',
          to: 'emailauth.uid'
        }
      },
      questionset: {
        relation: Model.HasManyRelation,
        modelClass: QuestionSet,
        join: {
          from: 'users.id',
          to: 'qsets.uid'
        }
      }
    };
  }
}

module.exports = User;
