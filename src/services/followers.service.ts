import { Request } from "express";
import { PaginationParameters } from "mongoose-paginate-v2";

import {
  addOneFollower,
  deleteFollowerById,
  listFollowers,
} from "../repositories/followers.repository";

export const getFollowers = (req: Request) => {
  const [query, options] = new PaginationParameters(req).get();
  return listFollowers(query, options);
};

export const addFollower = (following: string, follower: string) => {
  return addOneFollower(following, follower);
};

export const deleteFollower = (id: string) => {
  return deleteFollowerById(id);
};
