// import { UserModel } from "src/models/User.model";
import * as yup from "yup";

// import { getPaginationSchema } from "./general.validation";

const userSchema = yup.object({
  username: yup.string(),
  name: yup.string(),
  location: yup.string(),
  url: yup.string(),
  description: yup.string(),
  verified: yup.boolean(),
  createdAt: yup.string(),
  updatedAt: yup.string(),
  email: yup
    .string()
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please use a valid address"),
  stats: yup.object({
    listedCount: yup.number(),
    favouritesCount: yup.number(),
    statusesCount: yup.number(),
    followersCount: yup.number(),
    followingCount: yup.number(),
  }),
  profile: yup.object({
    firstName: yup.string(),
    lastName: yup.string(),
    avatar: yup.mixed(),
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
  // query: getPaginationSchema(userSchema),
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

export const deleteUserById = yup.object({
  params: yup.object({ id: yup.string() }),
});
