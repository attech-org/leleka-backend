import { sign, SignOptions, verify, VerifyOptions } from "jsonwebtoken";

import { User } from "../models/User.model";
import { UserToken } from "../models/UserToken.models";
import {
  deleteToken,
  getToken,
  getTokenByUserId,
  saveToken,
} from "../repositories/userToken.repository";
import { updateUser } from "../services/user.service";

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

  const findTokenInDatabase = await getTokenByUserId(String(user._id));
  if (findTokenInDatabase) {
    try {
      refreshToken = findTokenInDatabase.token;
      verify(refreshToken, process.env.JWT_SECRET, verifyOptions);
    } catch (error: unknown) {
      //expire
      await deleteToken(refreshToken);
      refreshToken = "";
    }
  }
  if (!refreshToken) {
    refreshToken = sign(payload, process.env.JWT_SECRET, {
      ...signOptions,
      expiresIn: "365d",
    });
    await saveToken({ userId: user._id, token: refreshToken } as UserToken);
  }
  user.auth = {
    local: {
      accessToken: accessToken,
      refreshToken: refreshToken,
    },
  };
  await updateUser(user._id, user);
  return { accessToken, refreshToken };
};

export const verifyJWT = (token: string) => {
  return verify(token, process.env.JWT_SECRET, verifyOptions) as User;
};

export const updateAccessToken = async (refreshToken: string) => {
  const findTokenInDatabase = await getToken(refreshToken);
  if (!findTokenInDatabase) {
    throw Error("Invalid refresh token");
  }
  const verifyPayload: User = verify(
    refreshToken,
    process.env.JWT_SECRET,
    verifyOptions
  ) as User;
  if (verifyPayload._id !== findTokenInDatabase.userId) {
    throw Error("Invalid refresh token");
  }
  const payload = { _id: verifyPayload._id, username: verifyPayload.username };

  const accessToken = sign(payload, process.env.JWT_SECRET, signOptions);
  return accessToken;
};
