import * as yup from "yup";

const registerSchema = yup.object({
  username: yup.string().required("Username can't be blank"),
  password: yup
    .string()
    .required("Password can't be blank")
    .min(8, "Please use minimum of 8 characters for password"),
  email: yup
    .string()
    .required("Email can't be blank")
    .email()
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please use a valid address"),
});

export const registerUser = yup.object({
  body: registerSchema,
});
