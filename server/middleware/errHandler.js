const logger = require('../utils/logger');

module.exports = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  let status = 500;
  logger.error(err);
  res.status(status).redirect('/error');
};
