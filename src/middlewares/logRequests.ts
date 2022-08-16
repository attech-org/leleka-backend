import { NextFunction, Response, Request } from "express";

import Logger from "../config/Logger";

interface RequestLog {
  body?: string;
  query: string;
  headers?: string;
  baseUrl: string;
  originalUrl: string;
  params?: string;
  hostname: string;
  method: string;
}

const logRequest = (req: Request, res: Response, next: NextFunction) => {
  const request: RequestLog = {
    baseUrl: req.baseUrl,
    originalUrl: req.originalUrl,
    hostname: req.hostname,
    method: req.method,
    params: JSON.stringify(req.params),
    query: JSON.stringify(req.query),
  };
  // if request has not big body add body
  // and hide password field in it
  if (req.body) {
    if (JSON.stringify(req.body).length < 200) {
      request.body = req.body?.password
        ? { ...req.body, password: "**********" }
        : req.body;
    } else {
      request.body = "{ hugeBody: true }";
    }
  }

  Logger.http(request);
  next();
};
export default logRequest;
