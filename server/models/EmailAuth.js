const { Model } = require('objection');

class EmailAuth extends Model {
  static get tableName() {
    return 'emailauth';
  }
  
  static get idColumn() {
    return 'uid';
  }
}

module.exports = EmailAuth;
