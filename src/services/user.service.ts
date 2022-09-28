import { Request } from "express";
import { PaginationParameters } from "mongoose-paginate-v2";

import { User } from "../models/User.model";
import {
  getOneFollower,
  listFollowers,
} from "../repositories/followers.repository";
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
  const users = await getList(query, options);
  const userIds = users.docs.map((doc) => doc.id);

  const followingUsers = await listFollowers(
    { follower: req.user._id, following: { $in: userIds } },
    {}
  );

  return users.docs.map((user) => {
    if (followingUsers.docs.find(({ following }) => following === user.id)) {
      return {
        ...user,
        isFollowed: true,
      };
    }
    return user;
  });
};

export const getUser = async (id: string, currentUserId: string) => {
  const searchUser = await getUserById(id);
  const following = await getOneFollower(id, currentUserId);
  if (following) {
    return {
      ...searchUser,
      isFollowed: true,
    };
  }
  return searchUser;
};

export const getUserLocalTokens = async (id: string) => {
  const result = await getUserById(
    id,
    `+auth.local.refreshToken +auth.local.accessToken +auth.twitter.accessToken +auth.twitter.refreshToken`
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
