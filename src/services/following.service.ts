import {
  getList,
  addOne,
  deleteById,
} from "../repositories/following.repository";

export const getFollowing = async (queryParams: object) => {
  const result = await getList(queryParams);
  return result;
};

export const addFollowing = async (data: Record<string, string>) => {
  const { ownerId, followingId } = data;
  return addOne(ownerId, followingId);
};

export const deleteFollowing = async (id: string) => {
  return deleteById(id);
};
