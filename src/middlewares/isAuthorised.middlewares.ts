import { NextFunction, Response, Request } from "express";

import { verifyJWT } from "../config/jwt";
import { User } from "../models/User.model";

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
    throw new Error("No token provided.");
  }

  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }

  if (!token || token === "" || token === "undefined") {
    throw new Error("No token provided.");
  }

  const user: User = verifyJWT(token);
  console.warn(user);
  if (!user) {
    throw new Error("Failed to authenticate token. ");
  }

  next();
  // } catch (e: unknown) {
  //   if (String(e).includes("Token used too late")) {
  //     res.status(401).send("TokenExpired");
  //   } else {
  //     res.status(401).send(e);
  //   }
  // }
};
