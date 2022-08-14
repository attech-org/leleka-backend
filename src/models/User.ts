import { model, Schema, Document } from "mongoose";

export interface User extends Document {
  username: string;
  password: string;
  email: string;
  profile: {
    firstName: string;
    lastName: string;
    avatar: string;
    bio: string;
    phone: string;
    gender: string;
  };
}

// define user schema
const UserSchema: Schema = new Schema<User>({
  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "Can't be blank"],
    index: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: [8, "Please use minimum of 8 characters"],
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
});

export const UserModel = model<User>("User", UserSchema);
