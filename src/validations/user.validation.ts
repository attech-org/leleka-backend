// import { UserModel } from "src/models/User.model";
import * as yup from "yup";

import { getPaginationSchema } from "./general.validation";

const userSchema = yup.object({
  username: yup.string(),
  password: yup.string().min(8, "Please use minimum of 8 characters"),
  name: yup.string().required(),
  location: yup.string(),
  url: yup.string(),
  description: yup.string(),
  verified: yup.boolean(),
  followersCount: yup.number(),
  friendsCount: yup.number(),
  listedCount: yup.number(),
  favouritesCount: yup.number(),
  statusesCount: yup.number(),
  createdAt: yup.string(),
  updatedAt: yup.string(),
  email: yup
    .string()
    .required()
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please use a valid address"),
  profile: yup.object({
    firstName: yup.string(),
    lastName: yup.string(),
    avatar: yup.string(),
    banner: yup.string(),
    bio: yup.string(),
    birthDate: yup.string(),
    phone: yup.string(),
    gender: yup.string(),
  }),
  auth: yup.object({
    local: yup.object({
      accessToken: yup.string(),
      refreshToken: yup.string(),
    }),
  }),
  twitter: yup.object({
    accessToken: yup.string(),
    refreshToken: yup.string(),
  }),
});

export const getUsers = yup.object({
  query: getPaginationSchema(userSchema),
});

export const getUserById = yup.object({
  params: yup.object({ id: yup.string() }),
});

export const postUser = yup.object({
  body: userSchema,
});

export const putUser = yup.object({
  params: yup.object({ id: yup.string() }),
  body: userSchema,
});

export const deleteUser = yup.object({
  params: yup.object({ id: yup.string() }),
});
