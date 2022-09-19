import { Request } from "express";
import { PaginationParameters } from "mongoose-paginate-v2";

import {
  addOneFollower,
  deleteFollowerById,
  listFollowers,
} from "../repositories/followers.repository";
import { getOneFollower } from "./../repositories/followers.repository";
import { changeUserStats } from "./user.service";

export const getFollowers = (req: Request) => {
  const [query, options] = new PaginationParameters({ query: req.query }).get();
  return listFollowers(query, options);
};

export const addFollower = async (following: string, follower: string) => {
  if (follower === following) {
    throw new Error("You can't subscribe to your self");
  }
  const existingFollower = await getOneFollower(following, follower);
  if (existingFollower) {
    return existingFollower;
  }
  const response = await addOneFollower(following, follower);
  await changeUserStats(following, "followingCount", 1);
  await changeUserStats(follower, "followersCount", 1);
  return response;
};

export const deleteFollower = async (following: string, follower: string) => {
  const response = await deleteFollowerById(following, follower);
  await changeUserStats(following, "followingCount", -1);
  await changeUserStats(follower, "followersCount", -1);
  return response;
};
