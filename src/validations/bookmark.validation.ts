import * as yup from "yup";

import { getPaginationSchema } from "./general.validation";

const bookmarkSchema = yup.object({
  tweet: yup.string(),
  owner: yup.string(),
  createdAt: yup.string(),
  updatedAt: yup.string(),
});

export const getBookmark = yup.object({
  query: getPaginationSchema(bookmarkSchema),
});

export const postBookmark = yup.object({
  body: bookmarkSchema,
  user: yup.object({ _id: yup.string() }),
});

export const deleteBookmark = yup.object({
  params: yup.object({ id: yup.string() }),
});
