import { PaginationParameters } from "mongoose-paginate-v2";

import {
  addOneFollower,
  deleteFollowerById,
  listFollowers,
} from "../repositories/followers.repository";

export const getFollowers = async (
  query: PaginationParameters<never, never>
) => {
  const followersList = await listFollowers(...query.get());
  return followersList;
};

export const addFollower = (following: string, follower: string) => {
  return addOneFollower(following, follower);
};

export const deleteFollower = (id: string) => {
  return deleteFollowerById(id);
};
