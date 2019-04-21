const logger = require('../utils/logger');

module.exports = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  let message = 'Unexpected error, please try again later.';
  let status = 500;
  logger.error(err);
  res.status(status).send({ error: message });
};
