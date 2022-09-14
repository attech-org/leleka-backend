import * as yup from "yup";

export const getPaginationSchema = (querySchema: yup.AnyObjectSchema) =>
  yup.object({
    limit: yup.number(),
    page: yup.number(),
    sort: yup.string(),
    query: querySchema,
  });
