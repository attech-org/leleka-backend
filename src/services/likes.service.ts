import { PaginationParameters } from "mongoose-paginate-v2";

import {
  createOne,
  getOne,
  deleteOne,
  updateOne,
  listLikes,
} from "../repositories/likes.repository";
import { changeTweetStats } from "./tweets.service";

export const getLikes = async (data: PaginationParameters<never, never>) => {
  const likesList = await listLikes(...data.get());
  return likesList;
};

export const changeLike = async (tweet: string, user: string) => {
  const deleted = await deleteOne({ user, tweet });
  if (deleted.deletedCount) {
    await changeTweetStats(tweet, "stats.likes", -1);
  } else {
    await changeTweetStats(tweet, "stats.likes", 1);
    await createOne(tweet, user);
  }
};

export const getLikeById = (id: string) => {
  return getOne({ _id: id });
};
export const updateLike = async (
  id: string,
  newData: { tweet?: string; user?: string }
) => {
  return updateOne(id, newData);
};
