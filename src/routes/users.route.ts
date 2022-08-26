import express, { Request, Response } from "express";

import {
  createUser,
  deleteUser,
  getUser,
  listUsers,
  updateUser,
} from "../services/user.service";

const usersRoutes = express.Router();

usersRoutes.route("/").get(async (req: Request, res: Response) => {
  try {
    const result = await listUsers();
    if (result) {
      return res.send(result);
    }
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
});

usersRoutes.route("/:id").get(async (req: Request, res: Response) => {
  try {
    const result = await getUser(req.params.id);
    if (result) {
      return res.send(result);
    }
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
});

usersRoutes.route("/").post(async (req: Request, res: Response) => {
  try {
    if (req.body.name) {
      const result = await createUser(req.body);
      return res.send(result);
    }
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
});

usersRoutes.route("/:id").put(async (req: Request, res: Response) => {
  try {
    const result = await updateUser(req.params.id, req.body);
    if (result) {
      return res.json(result);
    }
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
});

usersRoutes.route("/:id").delete(async (req: Request, res: Response) => {
  try {
    if (req.params.id) {
      await deleteUser(req.params.id);
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
});

export default usersRoutes;
