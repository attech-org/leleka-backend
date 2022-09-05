import { TweetModel } from "../models/Tweet.model";

export const getOneById = (id: string) => {
  return TweetModel.find({ _id: id }).populate("author");
};
export const createOne = async (
  author: string,
  content: string,
  repliedTo?: string
) => {
  const tweetModel = new TweetModel({
    author: author,
    content: content,
    repliedTo: repliedTo,
    createdAt: new Date().toISOString(),
  });
  return tweetModel.save();
};
export const deleteOne = async (id: string) => {
  return TweetModel.deleteOne({ _id: id });
};
export const getList = async (query: object, options: object) => {
  return TweetModel.paginate(query, { ...options, populate: "author" });
};
export const updateOne = async (
  id: string,
  newData: {
    content?: string;
    author?: string;
    repliedTo?: string;
    stats?: { likes?: number; retweets?: number };
    updatedAt: string;
  }
) => {
  return TweetModel.findOneAndUpdate({ _id: id }, newData);
};
export const changeStats = async (
  id: string,
  fieldName: string,
  value: number
) => {
  return TweetModel.updateOne({ _id: id }, { $inc: { [fieldName]: value } });
};
