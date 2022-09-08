import { FilterQuery, PaginateOptions } from "mongoose";

import { Tweet, TweetModel } from "../models/Tweet.model";

export const getList = async (
  query: FilterQuery<Tweet>,
  options: PaginateOptions
) => {
  return TweetModel.paginate(query, { ...options, populate: "author" });
};

export const getOneById = (id: string) => {
  return TweetModel.find({ _id: id }).populate("author");
};

export const createOne = async (
  author: string,
  content: string,
  repliedTo?: string
) => {
  const date = new Date().toISOString();
  const tweetModel = new TweetModel({
    author: author,
    content: content,
    repliedTo: repliedTo,
    createdAt: date,
    updatedAt: date,
  });
  return (await tweetModel.save()).populate("author");
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
  return TweetModel.findOneAndUpdate({ _id: id }, newData).populate("author");
};

export const changeStats = async (
  id: string,
  fieldName: string,
  value: number
) => {
  return TweetModel.updateOne({ _id: id }, { $inc: { [fieldName]: value } });
};

export const deleteOne = async (id: string) => {
  return TweetModel.deleteOne({ _id: id });
};
