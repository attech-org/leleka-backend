import express from "express";

import { uploadImageInMemory } from "../middlewares/fileUpload.middleware";
import { isAuthorized } from "../middlewares/isAuthorized.middlewares";
import {
  createUser,
  deleteUser,
  getUser,
  listUsers,
  updateUser,
} from "../services/user.service";
import { validation } from "./../middlewares/yup.middlewares";
import {
  getUsers,
  getUserById,
  postUser,
  putUser,
  deleteUserById,
} from "./../validations/user.validation";

const usersRoutes = express.Router();

usersRoutes
  .route("/")
  .get(isAuthorized, validation(getUsers), async (req, res) => {
    const result = await listUsers(req);
    return res.send(result);
  });

usersRoutes
  .route("/:id")
  .get(isAuthorized, validation(getUserById), async (req, res) => {
    if (req.params.id) {
      const result = await getUser(req.params.id);
      return res.send(result);
    }
    return res.sendStatus(500);
  });

usersRoutes
  .route("/")
  .post(isAuthorized, validation(postUser), async (req, res) => {
    if (req.body.name) {
      const result = await createUser(req.body);
      return res.status(201).send(result);
    }
    return res.sendStatus(500);
  });

usersRoutes.route("/:id").put(
  isAuthorized,
  validation(putUser),
  uploadImageInMemory.single("avatar"),

  async (req, res) => {
    const result = await updateUser(req.params.id, req.body, req.file);
    return res.send(result);
  }
);

usersRoutes
  .route("/:id")
  .delete(isAuthorized, validation(deleteUserById), async (req, res) => {
    if (req.params.id) {
      await deleteUser(req.params.id);
      return res.sendStatus(200);
    }
    return res.sendStatus(500);
  });

export default usersRoutes;
