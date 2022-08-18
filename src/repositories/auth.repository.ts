import { AccessToken, AccessTokenModel } from "../models/AccessToken";

export const addAccessToken = async (access_token: AccessToken) => {
  try {
    if (access_token) {
      const dbAccessToken = new AccessTokenModel({ accessToken: access_token });
      const result = await dbAccessToken.save();
      return result;
    }
  } catch (err: unknown) {
    throw new Error("There is err");
  }
};

export default AccessTokenModel;
