import { FollowerModel } from "../models/Follower.model";

export const listFollowers = (queryParams: object) => {
  const query = {};
  const options = {
    ...queryParams,
  };
  return FollowerModel.paginate(query, options);
};

export const addOneFollower = (ownerId: string, followerId: string) => {
  const result = new FollowerModel({
    followerId: followerId,
    ownerId: ownerId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  return result.save();
};

export const deleteFollowerById = (id: string) => {
  return FollowerModel.deleteOne({ _id: id });
};
