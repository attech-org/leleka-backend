import { PaginationParameters } from "mongoose-paginate-v2";

import {
  createOne,
  deleteOne,
  getList,
  getOneById,
  updateOne,
} from "../repositories/tweet.repository";

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
export const deleteTweet = async (id: string) => {
  return deleteOne(id);
};

export const getAllTweets = async (
  paginationParameters: PaginationParameters<never, never>
) => {
  return getList(...paginationParameters.get());
};
export const updateTweet = async (
  id: string,
  newData: {
    content?: string;
    author?: string;
    repliedTo?: string;
    updatedAt: string;
  }
) => {
  return updateOne(id, newData);
};
