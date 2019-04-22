const { Model } = require('objection');
const bcrypt = require('bcrypt');

class EmailAuth extends Model {
  static get tableName() {
    return 'emailauth';
  }

  static get idColumn() {
    return 'uid';
  }

  static async hashPassword(password) {
    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    return hashedPassword;
  }

  async comparePassword(candPassword) {
    const match = bcrypt.compare(candPassword, this.password);
    return match;
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
