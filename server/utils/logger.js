const { createLogger, transports } = require('winston');

// Enable exception handling when you create your logger.
const logger = createLogger({
  exceptionHandlers: [
    new transports.File({ filename: __dirname + 'exceptions.log' })
  ]
});

module.exports = logger;
