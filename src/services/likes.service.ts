import { Request } from "express";
import { PaginationParameters } from "mongoose-paginate-v2";

import {
  createOne,
  getOne,
  deleteOne,
  updateOne,
  getAll,
  deleteMany,
} from "../repositories/likes.repository";
import { changeTweetStats } from "./tweets.service";

export const getLikes = (req: Request) => {
  const [query, options] = new PaginationParameters({ query: req.query }).get();
  return getAll(query, options);
};

export const changeLike = async (tweet: string, user: string) => {
  const deleted = await deleteOne({ user, tweet });
  if (deleted.deletedCount) {
    await changeTweetStats(tweet, "stats.likes", -1);
  } else {
    await changeTweetStats(tweet, "stats.likes", 1);
    const res = await createOne(tweet, user);
    return res;
  }
};

export const getLikeById = (id: string) => {
  return getOne({ _id: id });
};
export const updateLike = (
  id: string,
  newData: { tweet?: string; user?: string }
) => {
  return updateOne(id, newData);
};
export const deleteLikes = (data: { tweet?: string; user?: string }) => {
  return deleteMany(data);
};
