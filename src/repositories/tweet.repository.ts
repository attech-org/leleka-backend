import { TweetModel } from "../models/Tweet.model";

export const getOneById = (id: string) => {
  return TweetModel.find({ _id: id });
};
export const createOne = async (
  authorId: string,
  content: string,
  repliedTo?: string
) => {
  const tweetModel = new TweetModel({
    authorId: authorId,
    content: content,
    repliedTo: repliedTo,
    createdAt: new Date().toISOString(),
  });
  tweetModel.save();
};
export const deleteOne = async (id: string) => {
  return TweetModel.deleteOne({ _id: id });
};
export const getAll = async () => {
  return TweetModel.find();
};
export const updateOne = async (
  id: string,
  newData: {
    content?: string;
    authorId?: string;
    repliedTo?: string;
    updatedAt: string;
  }
) => {

  return TweetModel.updateOne({ _id: id }, mewData);
};
