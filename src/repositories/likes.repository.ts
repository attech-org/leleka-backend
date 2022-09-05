import { LikeModel } from "../models/Like.model";

export const getOne = async (
  data: { _id: string } | { userId: string; tweetId: string }
) => {
  return LikeModel.findOne(data);
};
export const deleteOne = async (
  data:
    | {
        _id: string;
      }
    | {
        userId: string;
        tweetId: string;
      }
) => {
  return LikeModel.deleteOne(data);
};
export const createOne = async (tweetId: string, userId: string) => {
  const likeModel = new LikeModel({
    userId,
    tweetId,
  });
  return likeModel.save();
};
export const updateOne = async (
  id: string,
  newData: { tweetId?: string; userId?: string }
) => {
  LikeModel.updateOne({ _id: id }, newData);
};
