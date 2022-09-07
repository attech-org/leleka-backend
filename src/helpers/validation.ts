import * as yup from "yup";
import Lazy from "yup/lib/Lazy";
import { OptionalObjectSchema } from "yup/lib/object";
import { AnyObject } from "yup/lib/types";

export type AnyYupSchema =
  | OptionalObjectSchema<AnyObject>
  | Lazy<OptionalObjectSchema<AnyObject>>;

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

export const userIdSchema = yup.object({
  userId: yup.string().required(),
});

export const tweetIdSchema = yup.object({
  tweetId: yup.string().required(),
});

export const likesQuerySchema = yup.lazy((values) => {
  if (values.userId) {
    return userIdSchema;
  } else if (values.tweetId) {
    return tweetIdSchema;
  } else {
    return yup.object({
      userId: yup.string().required("tweetId or userId are required"),
      tweetId: yup.string().required("tweetId or userId are required"),
    });
  }
});
