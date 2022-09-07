import { PaginationParameters } from "mongoose-paginate-v2";

import {
  createOne,
  deleteOne,
  getList,
  getOneById,
  changeStats,
  updateOne,
} from "../repositories/tweet.repository";

export const getAllTweets = async (
  paginationParameters: PaginationParameters<never, never>
) => {
  return getList(...paginationParameters.get());
};

export const getTweetById = (id: string) => {
  return getOneById(id);
};

export const createTweet = async (
  author: string,
  content: string,
  repliedTo?: string
) => {
  return createOne(author, content, repliedTo);
};

export const updateTweet = async (
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
export const changeTweetStats = async (
  id: string,
  fieldName: string,
  value: number
) => {
  return changeStats(id, fieldName, value);
};

export const deleteTweet = async (id: string) => {
  return deleteOne(id);
};
