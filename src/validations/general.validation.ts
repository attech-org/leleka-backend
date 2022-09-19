import * as yup from "yup";
import { AnyObject, OptionalObjectSchema } from "yup/lib/object";

export type AnyYupSchema = OptionalObjectSchema<AnyObject>;

export const getPaginationSchema = (querySchema: yup.AnyObjectSchema) => {
  const modifiedQuerySchema: Record<string, yup.AnyObjectSchema> = {};
  for (const [key, fieldSchema] of Object.entries<yup.AnyObjectSchema>(
    querySchema.fields
  )) {
    if (["string", "number", "date", "boolean"].includes(fieldSchema.type)) {
      modifiedQuerySchema[key] = yup.object();
    } else {
      modifiedQuerySchema[key] = fieldSchema;
    }
  }

  return yup.object({
    limit: yup.number(),
    page: yup.number(),
    sort: yup.string(),
    query: yup.object(modifiedQuerySchema),
  });
};
