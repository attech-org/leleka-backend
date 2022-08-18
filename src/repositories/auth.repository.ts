import { AccessToken, AccessTokenModel } from "src/models/AccessToken";

export const addAccessToken = async (access_token: AccessToken) => {
  try {
    if (access_token) {
      const result = await new AccessTokenModel(access_token).save();
      return result;
    }
  } catch (err: unknown) {
    console.error(err);
  }
};

export default AccessTokenModel;
