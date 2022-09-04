import {
  addOneFollower,
  deleteFollowerById,
  listFollowers,
} from "../repositories/followers.repository";

export const getFollowers = async (query: object) => {
  const followersList = await listFollowers(query);
  return followersList;
};

export const addFollower = async (ownerId: string, followerId: string) => {
  return addOneFollower(ownerId, followerId);
};

export const deleteFollower = (id: string) => {
  return deleteFollowerById(id);
};
