import { sign, SignOptions, verify, VerifyOptions } from "jsonwebtoken";

import { User } from "../models/User.model";
import {
  getUserLocalTokens,
  updateUserLocalTokens,
} from "../services/user.service";

const verifyOptions: VerifyOptions = {
  algorithms: ["HS256"],
};
const signOptions: SignOptions = {
  expiresIn: "15m",
  algorithm: "HS256",
};

export const generateJWT = async (user: User) => {
  const payload = { _id: user._id, username: user.username };

  const accessToken = sign(payload, process.env.JWT_SECRET, signOptions);

  let refreshToken = "";

  const findTokenInDatabase = await getUserLocalTokens(user.id);
  if (findTokenInDatabase) {
    try {
      refreshToken = findTokenInDatabase.refreshToken;
      verify(refreshToken, process.env.JWT_SECRET, verifyOptions);
    } catch (error: unknown) {
      //expire
      refreshToken = "";
    }
  }
  if (!refreshToken) {
    refreshToken = sign(payload, process.env.JWT_SECRET, {
      ...signOptions,
      expiresIn: "365d",
    });
  }
  await updateUserLocalTokens(user._id, accessToken, refreshToken);

  return { accessToken, refreshToken };
};

export const verifyJWT = (token: string) => {
  return verify(token, process.env.JWT_SECRET, verifyOptions) as User;
};

export const updateAccessToken = async (refreshToken: string) => {
  const verifyPayload: User = verify(
    refreshToken,
    process.env.JWT_SECRET,
    verifyOptions
  ) as User;
  const findTokenInDatabase = await getUserLocalTokens(verifyPayload._id);
  if (
    verifyPayload._id !== findTokenInDatabase.id ||
    findTokenInDatabase.refreshToken !== refreshToken
  ) {
    throw Error("Invalid refresh token");
  }
  const payload = { _id: verifyPayload._id, username: verifyPayload.username };

  const accessToken = sign(payload, process.env.JWT_SECRET, signOptions);

  await updateUserLocalTokens(verifyPayload._id, accessToken, refreshToken);

  return accessToken;
};
