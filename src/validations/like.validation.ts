import * as yup from "yup";

// import { getPaginationSchema } from "./general.validation";

const likeSchema = yup.object({
  user: yup.string(),
  tweet: yup.string(),
});

export const getLikesList = yup.object({
  // query: getPaginationSchema(likeSchema),
});

export const getLikeByID = yup.object({
  params: yup.object({ id: yup.string() }),
});

export const postLike = yup.object({
  body: likeSchema,
  user: yup.object({ _id: yup.string() }),
});

export const putLike = yup.object({
  params: yup.object({ id: yup.string() }),
  body: likeSchema,
  user: yup.object({ _id: yup.string() }),
});
