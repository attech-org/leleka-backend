import { PaginationParameters } from "mongoose-paginate-v2";

import {
  getList,
  addOne,
  deleteById,
} from "../repositories/following.repository";

export const getFollowing = (
  queryParams: PaginationParameters<never, never>
) => {
  return getList(...queryParams.get());
};

export const addFollowing = (data: Record<string, string>) => {
  const { ownerId, followingId } = data;
  return addOne(ownerId, followingId);
};

export const deleteFollowing = (id: string) => {
  return deleteById(id);
};
