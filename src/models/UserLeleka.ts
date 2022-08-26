import { model, Schema, Document } from "mongoose";

export interface UserLeleka extends Document {
  name: string;
  // screen_name: string;
  location: string;
  url: string;
  description: string;
  verified: boolean;
  followers_count: number;
  friends_count: number;
  listed_count: number;
  favourites_count: number;
  statuses_count: number;
  created_at: Date;
}

const UserLelekaSchema: Schema = new Schema<UserLeleka>({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: false,
    default: "",
  },
  url: {
    type: String,
    required: false,
    default: "",
  },
  description: {
    type: String,
    required: false,
    default: "",
  },
  verified: {
    type: Boolean,
    required: false,
    default: false,
  },
  followers_count: {
    type: Number,
    required: false,
    default: 0,
  },
  friends_count: {
    type: Number,
    required: false,
    default: 0,
  },
  listed_count: {
    type: Number,
    required: false,
    default: 0,
  },
  favourites_count: {
    type: Number,
    required: false,
    default: 0,
  },
  statuses_count: {
    type: Number,
    required: false,
    default: 0,
  },
  created_at: {
    type: Date,
    required: true,
  },
});

export const UserLelekaModel = model<UserLeleka>(
  "UserLeleka",
  UserLelekaSchema
);
