import { LikeModel } from "../models/Like.model";

export const getAll = (query: object, options: object) => {
  return LikeModel.paginate(query, {
    ...options,
    populate: ["user", "tweet"],
  });
};

export const getOne = (
  data: { _id: string } | { user: string; tweet: string }
) => {
  return LikeModel.findOne(data);
};
export const deleteOne = (
  data:
    | {
        _id: string;
      }
    | {
        user: string;
        tweet: string;
      }
) => {
  return LikeModel.deleteOne(data);
};
export const createOne = (tweet: string, user: string) => {
  const likeModel = new LikeModel({
    user,
    tweet,
  });
  return likeModel.save();
};
export const updateOne = (
  id: string,
  newData: { tweet?: string; user?: string }
) => {
  return LikeModel.findOneAndUpdate({ _id: id }, newData);
};
