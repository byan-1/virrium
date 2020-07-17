import { NextFunction, Request } from "express-serve-static-core";
import { Response } from "express";
import logger from "../services/logger";

module.exports = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (res.headersSent) {
    return next(err);
  }
  let status = 500;
  logger.error(err);
  res.status(status).redirect("/error");
};
