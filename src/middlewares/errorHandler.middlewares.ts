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

  // respond with json
  if (req.accepts("json")) {
    res.status(err.status || 500).json({ message: err.message });
    next(err);
    return;
  }

  // default to plain-text. send()
  res
    .status(err.status || 500)
    .type("txt")
    .send(err.message);
  next(err);
};

export default errorHandler;
