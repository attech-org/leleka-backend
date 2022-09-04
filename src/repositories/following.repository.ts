import { FollowingModel } from "./../models/Following.model";

export const getList = (query: object, options: object) => {
  const result = FollowingModel.paginate(query, options);
  return result;
};

export const addOne = (ownerId: string, followingId: string) => {
  const result = new FollowingModel({
    ownerId: ownerId,
    followingId: followingId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  return result.save();
};

export const deleteById = (followingId: string) => {
  return FollowingModel.findByIdAndDelete(followingId);
};

export default FollowingModel;
