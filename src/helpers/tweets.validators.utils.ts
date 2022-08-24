import { ObjectId } from "mongodb";

export const idValidator = (id: string) => {
  if (!ObjectId.isValid(id)) {
    throw new Error(`Input error: incorrect id`);
  }
};
export const stringValidator = (data: string, fieldName: string) => {
  if (data.trim().length === 0) {
    throw new Error(`Input error: ${fieldName} must not be empty`);
  }
};
