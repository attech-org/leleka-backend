import * as yup from "yup";

const loginSchema = yup.object({
  username: yup.string().required("Username can't be blank"),
  password: yup
    .string()
    .required("Password can't be blank")
    .min(8, "Please use minimum of 8 characters for password"),
});

export const loginUser = yup.object({
  body: loginSchema,
});
