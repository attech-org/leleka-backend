// import { UserModel } from "src/models/User.model";
import * as yup from "yup";

import { getPaginationSchema } from "./general.validation";

const followersSchema = yup.object({
  follower: yup.string().required("followerId can't be blank"),
  following: yup.string().required("ownerId can't be blank"),
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
