import { ObjectId } from "mongodb";

export const idCheck = (id: string) => {
  if (!ObjectId.isValid(id)) {
    throw new Error("Input error: incorrect Id");
  }
};
export const stringCheck = (data: string) => {
  if (data.trim().length === 0) {
    throw new Error("Input error: password must not be empty");
  }
};
