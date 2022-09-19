// import { UserModel } from "src/models/User.model";
import * as yup from "yup";

import { getPaginationSchema } from "./general.validation";

const followersSchema = yup.object({
  following: yup.string(),
  createdAt: yup.string(),
  updatedAt: yup.string(),
});

export const getFollowersList = yup.object({
  query: getPaginationSchema(followersSchema),
});

export const postFollower = yup.object({
  body: followersSchema,
});

export const deleteFollowerById = yup.object({
  params: yup.object({ id: yup.string() }),
});
