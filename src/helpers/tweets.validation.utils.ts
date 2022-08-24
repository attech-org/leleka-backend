import { ObjectId } from "mongodb";

export const idValidator = (id: string) => {
  if (!ObjectId.isValid(id)) {
    throw new Error("Input error: incorrect Id");
  }
};
export const stringValidator = (data: string) => {
  if (data.trim().length === 0) {
    throw new Error("Input error: password must not be empty");
  }
};
