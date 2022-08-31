import { ErrorRequestHandler, Request, Response, NextFunction } from "express";

import Logger from "../config/Logger";
import CustomError from "../models/CustomError.model";

const errorHandler: ErrorRequestHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Logger.error({ message: err.message, status: err.status, stack: err.stack });
  if (err.name === "TokenExpiredError") {
    err.status = 401;
  }
  if (err.name === "JsonWebTokenError") {
    err.status = 400;
  }
  // respond with json
  if (req.accepts("json")) {
    res.status(err.status || 400).json({ error: err.message });
    next(err);
    return;
  }

  // default to plain-text. send()
  res
    .status(err.status || 400)
    .type("txt")
    .send(err.message);
  next(err);
};

export default errorHandler;
