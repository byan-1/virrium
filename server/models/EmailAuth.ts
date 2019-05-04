const { Model } = require('objection');
const bcrypt = require('bcrypt');
import { RelationMappings } from 'objection';

class EmailAuth extends Model {
  static get tableName(): string {
    return 'emailauth';
  }

  static get idColumn(): string {
    return 'uid';
  }

  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    return hashedPassword;
  }

  async comparePassword(candPassword: string): Promise<boolean> {
    const match = bcrypt.compare(candPassword, this.password);
    return match;
  }

  static get relationMappings(): RelationMappings {
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