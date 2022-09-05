import { FollowerModel } from "../models/Follower.model";

export const listFollowers = (query: object, options: object) => {
  return FollowerModel.paginate(query, options);
};

export const addOneFollower = (following: string, follower: string) => {
  const result = new FollowerModel({
    follower: follower,
    following: following,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  return result.save();
};

export const deleteFollowerById = (id: string) => {
  return FollowerModel.deleteOne({ _id: id });
};
