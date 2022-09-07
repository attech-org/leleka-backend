import { FollowingModel } from "./../models/Following.model";

export const getList = (query: object, options: object) => {
  const result = FollowingModel.paginate(query, {
    ...options,
    populate: ["following", "follower"],
  });
  return result;
};

export const addOne = (follower: string, following: string) => {
  const result = new FollowingModel({
    follower: follower,
    following: following,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  return result.save();
};

export const deleteById = (following: string) => {
  return FollowingModel.findByIdAndDelete(following);
};

export default FollowingModel;
