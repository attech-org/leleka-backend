import { Request, Response, NextFunction } from "express";

import { verifyJWT } from "../config/jwt";
import { User } from "../models/User";
// const isAuthorized = (req, res, next) => {
// check if Authorization header exist ? continue : return 401
// check if Authorization header not expired ? continue : refresh token
// ---- refresh token:
// ---- get refreshToken from DB
// ---- post reuqest to Twitter API with "refreshToken" and "twitter_client_id", "twitter_client_secret" from .env
// ---- in response you'll have new authToken and refreshAuthToken
// ---- save new tokens to DB
// ---- continue
// call next if no errors
// }
export const isAuthorised = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
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
  } catch (e: unknown) {
    if (String(e).includes("Token used too late")) {
      res.status(401).send("TokenExpired");
    } else {
      res.status(401).send(e);
    }
  }
};
