import { Request } from "express";
import { PaginationParameters } from "mongoose-paginate-v2";

import { User } from "../models/User.model";
import { listFollowers } from "../repositories/followers.repository";
import {
  changeStatsById,
  create,
  deleteOne,
  getList,
  getUserById,
  updateLocalTokens,
  updateOne,
} from "../repositories/user.repository";

export const listUsers = async (req: Request) => {
  const [query, options] = new PaginationParameters({ query: req.query }).get();
  const currentUserId = req.user._id;
  const list = await getList(query, options);
  const listOfId = list.docs.map((doc) => doc.id);
  const following = await listFollowers(
    { following: currentUserId, follower: { $in: listOfId } },
    {}
  );

  following.docs.forEach((record) => {
    const index = listOfId.findIndex(
      (currentId) => currentId == record.follower
    );
    list.docs[index].isFollowed = true;
  });
  // following.docs.forEach((record) => {
  //   listOfId.forEach((currentId, index) => {
  //     if (currentId == record.follower) {
  //       list.docs[index].isFollowed = true;
  //     }
  //   });
  // });
  return list;
};

export const getUser = (id: string) => {
  return getUserById(id);
};

export const getUserLocalTokens = async (id: string) => {
  const result = await getUserById(
    id,
    "+auth.local.refreshToken +auth.local.accessToken" +
      " +auth.twitter.accessToken +auth.twitter.refreshToken"
  );
  if (result) {
    return {
      id: result.id,
      accessToken: result.auth.local.accessToken,
      refreshToken: result.auth.local.refreshToken,
    };
  }
};

export const createUser = (data: User) => {
  return create(data);
};

export const deleteUser = (id: string) => {
  return deleteOne(id);
};

export const updateUser = (
  id: string,
  data: User,
  file: Express.Multer.File
) => {
  return updateOne(id, data, file);
};

export const updateUserLocalTokens = (
  id: string,
  accessToken: string,
  refreshToken: string
) => updateLocalTokens(id, accessToken, refreshToken);

export const changeUserStats = (
  id: string,
  fieldName: string,
  value: number
) => {
  return changeStatsById(id, fieldName, value);
};
