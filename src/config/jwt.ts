import { sign, SignOptions, verify, VerifyOptions } from "jsonwebtoken";

import { User } from "../models/User";

export const generateJWT = (payload: User) => {
  const signOptions: SignOptions = {
    expiresIn: "8784h",
    algorithm: "HS256",
  };
  return sign(
    {
      id: payload._id,
      username: payload.username,
    },
    process.env.JWT_SECRET,
    signOptions
  );
};

export const verifyJWT = (token: string) => {
  const verifyOptions: VerifyOptions = {
    algorithms: ["HS256"],
  };

  return verify(token, process.env.JWT_SECRET, verifyOptions);
};
