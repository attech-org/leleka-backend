import mongoose, { Schema, Document } from "mongoose";
import paginate from "mongoose-paginate-v2";

export interface User extends Document {
  username: string;
  password: string;
  name: string;
  location?: string;
  url?: string;
  description?: string;
  verified: boolean;
  followersCount: number;
  friendsCount: number;
  listedCount: number;
  favouritesCount: number;
  statusesCount: number;
  createdAt: string;
  updatedAt?: string;
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
export const UserSchema: Schema = new Schema<User>(
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
    followersCount: {
      type: Number,
      required: false,
      default: 0,
    },
    friendsCount: {
      type: Number,
      required: false,
      default: 0,
    },
    listedCount: {
      type: Number,
      required: false,
      default: 0,
    },
    favouritesCount: {
      type: Number,
      required: false,
      default: 0,
    },
    statusesCount: {
      type: Number,
      required: false,
      default: 0,
    },
    createdAt: {
      type: String,
      required: true,
    },
    updatedAt: {
      type: String,
      required: false,
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
        // delete ret._id;    Need to ask
        delete ret.password;
        return ret;
      },
    },
  }
);

UserSchema.plugin(paginate);

export const UserModel = mongoose.model<User, mongoose.PaginateModel<User>>(
  "Users",
  UserSchema,
  "Users"
);

// export const UserModel = model<User>("User", UserSchema);
