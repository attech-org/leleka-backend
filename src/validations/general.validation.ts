import * as yup from "yup";
import { AnyObject, OptionalObjectSchema } from "yup/lib/object";

export type AnyYupSchema = OptionalObjectSchema<AnyObject>;

export const getPaginationSchema = (querySchema: yup.AnyObjectSchema) =>
  yup.object({
    limit: yup.number(),
    page: yup.number(),
    sort: yup.string(),
    query: querySchema,
  });
