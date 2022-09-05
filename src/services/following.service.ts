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
  const { follower, following } = data;
  return addOne(follower, following);
};

export const deleteFollowing = (id: string) => {
  return deleteById(id);
};
