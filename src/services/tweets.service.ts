import { Request } from "express";
import { PaginationParameters } from "mongoose-paginate-v2";

import {
  createOne,
  deleteOne,
  getList,
  getOneById,
  changeStats,
  updateOne,
} from "../repositories/tweet.repository";
import { deleteLikes } from "./likes.service";

export const getAllTweetsOfCurrentUser = (req: Request) => {
  const [query, options] = new PaginationParameters(req).get();
  return getList({ ...query, author: req.user._id }, options);
};

export const getAllTweets = (req: Request) => {
  const [query, options] = new PaginationParameters(req).get();
  return getList(query, options);
};

export const getTweetById = (id: string) => {
  return getOneById(id);
};

export const createTweet = (
  author: string,
  content: string,
  repliedTo?: string
) => {
  return createOne(author, content, repliedTo);
};

export const updateTweet = (
  id: string,
  newData: {
    content?: string;
    author?: string;
    repliedTo?: string;
    stats?: { likes?: number; retweets?: number };
    updatedAt: string;
  }
) => {
  return updateOne(id, newData);
};
export const changeTweetStats = (
  id: string,
  fieldName: string,
  value: number
) => {
  return changeStats(id, fieldName, value);
};

export const deleteTweet = async (id: string, author: string) => {
  const result = await deleteOne(id, author);
  await deleteLikes({ tweet: id });
  return result;
};
