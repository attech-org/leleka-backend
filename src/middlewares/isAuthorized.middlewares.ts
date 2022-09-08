import { NextFunction, Response, Request } from "express";

import { verifyJWT } from "../config/jwt";
import CustomError from "../models/CustomError.model";
import { User } from "../models/User.model";

const accessDenied: CustomError = {
  name: "AccessDenied",
  message: "Access denied. No token provided.",
  status: 401,
};

export const isAuthorized = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;

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

  if (!user) {
    throw {
      ...accessDenied,
      message: "Access denied. Failed to authenticate token.",
    } as CustomError;
  }
  req.user = user;
  next();
};
