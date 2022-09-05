import { PaginationParameters } from "mongoose-paginate-v2";

import {
  createOne,
  deleteOne,
  getList,
  getOneById,
  changeStats,
  updateOne,
} from "../repositories/tweet.repository";

export const getTweetById = (id: string) => {
  return getOneById(id);
};

export const createTweet = async (
  authorId: string,
  content: string,
  repliedTo?: string
) => {
  return createOne(authorId, content, repliedTo);
};
export const deleteTweet = async (id: string) => {
  return deleteOne(id);
};

export const getAllTweets = async (
  data: PaginationParameters<never, never>
) => {
  return getList(...data.get());
};
export const updateTweet = async (
  id: string,
  newData: {
    content?: string;
    authorId?: string;
    repliedTo?: string;
    stats?: { likes?: number; retweets?: number };
    updatedAt: string;
  }
) => {
  return updateOne(id, newData);
};
export const incrementTweetStats = async (
  id: string,
  fieldName: string,
  value: number
) => {
  return changeStats(id, fieldName, value);
};
