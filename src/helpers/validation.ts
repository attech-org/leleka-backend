import * as yup from "yup";

export const loginSchema = yup.object({
  username: yup.string().required("Username can't be blank"),
  password: yup
    .string()
    .required("Password can't be blank")
    .min(8, "Please use minimum of 8 characters for password"),
});

export const registerSchema = yup.object({
  username: yup.string().required("Username can't be blank"),
  password: yup
    .string()
    .required("Password can't be blank")
    .min(8, "Please use minimum of 8 characters for password"),
  email: yup
    .string()
    .required("Email can't be blank")
    .email("Please use a valid email address"),
});
