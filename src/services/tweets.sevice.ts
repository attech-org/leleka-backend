import { ObjectId } from "mongodb";

import {
  idValidator,
  stringValidator,
} from "../helpers/tweets.validators.utils";
import {
  createOne,
  deleteOne,
  getAll,
  getOneById,
  updateOne,
} from "../repositories/tweet.repository";

export const getTweetById = (id: string) => {
  idValidator(id);
  return getOneById(new ObjectId(id));
};

export const createTweet = async (
  authorId: string,
  content: string,
  repliedTo?: string
) => {
  idValidator(authorId);
  idValidator(repliedTo);
  stringValidator(content, "content");
  createOne(new ObjectId(authorId), content, new ObjectId(repliedTo));
};
export const deleteTweet = async (id: string) => {
  idValidator(id);
  return deleteOne(new ObjectId(id));
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
    updatedAt: Date;
  }
) => {
  idValidator(id);
  if (newData.content) {
    stringValidator(newData.content, "content");
  }
  if (newData.authorId) {
    idValidator(newData.authorId);
  }
  if (newData.repliedTo) {
    idValidator(newData.repliedTo);
  }
  updateOne(new ObjectId(id), {
    content: newData.content,
    authorId: new ObjectId(newData.authorId),
    repliedTo: new ObjectId(newData.repliedTo),
    updatedAt: newData.updatedAt,
  });
};
