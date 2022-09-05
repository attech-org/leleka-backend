import {
  createOne,
  getOne,
  deleteOne,
  updateOne,
} from "../repositories/likes.repository";
import { changeTweetStats } from "./tweets.service";

export const changeLike = async (tweetId: string, userId: string) => {
  const deleted = await deleteOne({ userId, tweetId });
  if (deleted.deletedCount) {
    await changeTweetStats(tweetId, "stats.likes", -1);
  } else {
    await changeTweetStats(tweetId, "stats.likes", 1);
    await createOne(tweetId, userId);
  }
};

export const getLikeById = async (id: string) => {
  return getOne({ _id: id });
};
export const updateLike = async (
  id: string,
  newData: { tweetId?: string; userId?: string }
) => {
  return updateOne(id, newData);
};
