import { model, Schema, Document } from "mongoose";

export interface User extends Document {
  username: string;
  password: string;
  name: string;
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
  email: string;
  profile: {
    firstName: string;
    lastName: string;
    avatar?: string;
    bio?: string;
    phone?: string;
    gender?: string;
  };
}

// define user schema
const UserSchema: Schema = new Schema<User>(
  {
    username: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "Can't be blank"],
      index: {
        unique: true,
        collation: { locale: "en", strength: 1 },
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
      minlength: [8, "Please use minimum of 8 characters"],
    },
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
    email: {
      type: String,
      lowercase: true,
      required: [true, "Can't be blank"],
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please use a valid address"],
      unique: true,
      index: true,
    },
    profile: {
      firstName: String,
      lastName: String,
      avatar: String,
      bio: String,
      phone: String,
      gender: String,
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret._id;
        delete ret.password;
        return ret;
      },
    },
  }
);

export const UserModel = model<User>("User", UserSchema);
