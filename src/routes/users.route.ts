import express, { Request, Response } from "express";

import { isAuthorized } from "../middlewares/isAuthorized.middlewares";
import {
  createUser,
  deleteUser,
  getUser,
  listUsers,
  updateUser,
} from "../services/user.service";

const usersRoutes = express.Router();

usersRoutes
  .route("/")
  .get(isAuthorized, async (req: Request, res: Response) => {
    const result = await listUsers(req.query);
    return res.send(result);
  });

usersRoutes
  .route("/:id")
  .get(isAuthorized, async (req: Request, res: Response) => {
    if (req.params.id) {
      const result = await getUser(req.params.id);
      return res.send(result);
    }
    return res.sendStatus(500);
  });

usersRoutes.route("/").post(async (req: Request, res: Response) => {
  if (req.body.name) {
    const result = await createUser(req.body);
    return res.send(result);
  }
  return res.sendStatus(500);
});

usersRoutes
  .route("/:id")
  .put(isAuthorized, async (req: Request, res: Response) => {
    const result = await updateUser(req.params.id, req.body);
    return res.send(result);
  });

usersRoutes
  .route("/:id")
  .delete(isAuthorized, async (req: Request, res: Response) => {
    if (req.params.id) {
      await deleteUser(req.params.id);
      return res.sendStatus(200);
    }
    return res.sendStatus(500);
  });

export default usersRoutes;
