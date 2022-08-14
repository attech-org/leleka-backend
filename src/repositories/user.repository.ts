import { UserModel } from '../models/User';

export const getAdminUser = () => {
  return UserModel.find({
    username: 'admin'
  })
}

export default UserModel;
