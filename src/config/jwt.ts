import { sign, SignOptions, verify, VerifyOptions } from "jsonwebtoken";

import { User } from "../models/User.model";
import { getUserTokens, updateUser } from "../services/user.service";

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

  const findTokenInDatabase = await getUserTokens(user.username);
  if (findTokenInDatabase) {
    try {
      refreshToken = findTokenInDatabase.auth.local.refreshToken;
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

  await updateUser(user._id, {
    auth: {
      local: {
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    },
  } as User);
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
  const findTokenInDatabase = await getUserTokens(verifyPayload.username);
  if (
    verifyPayload._id !== findTokenInDatabase._id ||
    findTokenInDatabase.auth.local.refreshToken !== refreshToken
  ) {
    throw Error("Invalid refresh token");
  }
  const payload = { _id: verifyPayload._id, username: verifyPayload.username };

  const accessToken = sign(payload, process.env.JWT_SECRET, signOptions);
  await updateUser(verifyPayload._id, {
    auth: {
      local: {
        accessToken: accessToken,
      },
    },
  } as User);
  return accessToken;
};
