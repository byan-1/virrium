const keys = require('./config/keys');

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: '127.0.0.1',
      user: keys.user,
      password: keys.password,
      database: 'mindpouch'
    },
    migrations: {
      directory: './migrations'
    }
  }
};
