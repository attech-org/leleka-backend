import * as yup from "yup";

// import { getPaginationSchema } from "./general.validation";

// const tagsSchema = yup.object({
//   tweet: yup.string(),
//   owner: yup.string(),
//   createdAt: yup.string(),
//   updatedAt: yup.string(),
// });

export const getTags = yup.object({
  // query: getPaginationSchema(tagsSchema),
});

export const getTagByID = yup.object({
  params: yup.object({ id: yup.string() }),
});
