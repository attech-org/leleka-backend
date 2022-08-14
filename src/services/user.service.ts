import userRepository, { getAdminUser } from "../repositories/user.repository"

export const getUserById = (id: string) => {
  userRepository.findById(id);
}

export const getAdmin = () => {
  getAdminUser();
}