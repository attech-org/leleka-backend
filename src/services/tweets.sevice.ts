import {
  createOne,
  deleteOne,
  getAll,
  getOneById,
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
  createOne(authorId, content, repliedTo);
};
export const deleteTweet = async (id: string) => {
  return deleteOne(id);
};

export const getAllTweets = async () => {
  return getAll();
};
export const updateTweet = async (
  id: string,
  newData: {
    content?: string;
    authorId?: string;
    repliedTo?: string;
    updatedAt: string;
  }
) => {
  updateOne(id, {
    content: newData.content,
    authorId: newData.authorId,
    repliedTo: newData.repliedTo,
    updatedAt: newData.updatedAt,
  });
};
