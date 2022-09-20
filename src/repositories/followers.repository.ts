import { FollowerModel } from "../models/Follower.model";

export const listFollowers = (query: object, options: object) => {
  return FollowerModel.paginate(query, options);
};

export const addOneFollower = (following: string, follower: string) => {
  const result = new FollowerModel({
    follower,
    following,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  return result.save();
};

export const deleteFollowerById = (following: string, follower: string) => {
  return FollowerModel.deleteOne({ following, follower });
};

export const getOneFollower = (following: string, follower: string) => {
  return FollowerModel.findOne({ following, follower });
};
