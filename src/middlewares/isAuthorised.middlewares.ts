import { NextFunction, Response, Request } from "express";

import { verifyJWT } from "../config/jwt";
import CustomError from "../models/CustomError.model";
import { User } from "../models/User.model";

const accessDenied: CustomError = {
  name: "AccessDenied",
  message: "Access denied. No token provided.",
  status: 403,
};

export const isAuthorised = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // try {
  let token =
    req.headers["x-access-token"] ||
    req.headers.authorization ||
    req.body?.accessToken;

  console.warn(token, "token");

  if (!token) {
    throw accessDenied;
  }

  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }

  if (!token || token === "" || token === "undefined") {
    throw accessDenied;
  }

  const user: User = verifyJWT(token);
  console.warn(user);
  if (!user) {
    throw {
      ...accessDenied,
      message: "Access denied. Failed to authenticate token.",
    } as CustomError;
  }

  next();
};
