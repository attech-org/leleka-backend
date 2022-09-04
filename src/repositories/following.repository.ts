import { FollowingModel } from "./../models/Following.model";

export const getList = async (queryParams: object) => {
  const query = {};
  const options = {
    ...queryParams,
  };
  const result = await FollowingModel.paginate(query, options);
  return result;
};

export const addOne = async (ownerId: string, followingId: string) => {
  const result = new FollowingModel({
    ownerId: ownerId,
    followingId: followingId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  return result.save();
};

export const deleteById = async (followingId: string) => {
  return FollowingModel.findByIdAndDelete(followingId);
};

export default FollowingModel;
