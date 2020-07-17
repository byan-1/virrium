import { createLogger, transports } from "winston";

// Enable exception handling when you create your logger.
const logger = createLogger({
  exceptionHandlers: [new transports.File({ filename: "exceptions.log" })]
});

export default logger;
