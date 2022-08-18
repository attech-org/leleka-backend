import { model, Schema, Document } from "mongoose";

export interface AccessToken extends Document {
  accessToken: string;
}

// define accessToken schema
const AccessTokenSchema: Schema = new Schema<AccessToken>({
  accessToken: {
    type: String,
    unique: true,
    required: [true, "Can't be blank"],
  },
});

export const AccessTokenModel = model<AccessToken>(
  "AccessToken",
  AccessTokenSchema
);
