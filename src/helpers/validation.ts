import * as yup from "yup";
import { OptionalObjectSchema } from "yup/lib/object";
import { AnyObject } from "yup/lib/types";

export type AnyYupSchema = OptionalObjectSchema<AnyObject>;

export const loginSchema = yup.object({
  username: yup.string().required("Username can't be blank"),
  password: yup
    .string()
    .required("Password can't be blank")
    .min(8, "Please use minimum of 8 characters for password"),
});

export const registerSchema = loginSchema.concat(
  yup.object({
    email: yup
      .string()
      .required("Email can't be blank")
      .email("Please use a valid email address"),
  })
);

export const followersSchema = yup.object({
  follower: yup.string().required("followerId can't be blank"),
  following: yup.string().required("ownerId can't be blank"),
});

export const likesQuerySchema = yup.object({
  userId: yup.string(),
  tweetId: yup.string(),
});
