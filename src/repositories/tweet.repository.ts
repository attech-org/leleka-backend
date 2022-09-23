import { FilterQuery, PaginateOptions } from "mongoose";

import { Tweet, TweetModel } from "../models/Tweet.model";

export const getList = (
  query: FilterQuery<Tweet>,
  options: PaginateOptions
) => {
  return TweetModel.paginate(query, {
    ...options,
    populate: [
      { path: "author" },
      { path: "repliedTo", populate: { path: "author" } },
    ],
  });
};

export const getOneById = (id: string) => {
  return TweetModel.findById(id).populate([
    { path: "author" },
    { path: "repliedTo", populate: { path: "author" } },
  ]);
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
  return (await tweetModel.save()).populate([
    { path: "author" },
    { path: "repliedTo", populate: { path: "author" } },
  ]);
};

export const updateOne = (
  id: string,
  newData: {
    content?: string;
    author?: string;
    repliedTo?: string;
    stats?: { likes?: number; retweets?: number };
    updatedAt: string;
  }
) => {
  return TweetModel.findOneAndUpdate({ _id: id }, newData, {
    new: true,
  }).populate([
    { path: "author" },
    { path: "repliedTo", populate: { path: "author" } },
  ]);
};

export const changeStats = (id: string, fieldName: string, value: number) => {
  return TweetModel.updateOne({ _id: id }, { $inc: { [fieldName]: value } });
};

export const deleteOne = (id: string, author: string) => {
  return TweetModel.deleteOne({ _id: id, author: author });
};
