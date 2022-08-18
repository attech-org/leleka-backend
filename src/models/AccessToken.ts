import { model, Schema, Document } from "mongoose";

export interface AccessToken extends Document {
  accessToken: string;
}

// define accessToken schema
const AccessTokenSchema: Schema = new Schema<AccessToken>(
  {
    accessToken: {
      type: String,
      unique: true,
      // required: [true, "Can't be blank"],
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        return ret;
      },
    },
  }
);

export const AccessTokenModel = model<AccessToken>(
  "AccessToken",
  AccessTokenSchema
);
