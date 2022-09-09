import express, { Request, Response } from "express";

import { isAuthorized } from "../middlewares/isAuthorized.middlewares";
import { getTagById, getTagsList } from "../services/tags.service";

const tagsRoutes = express.Router();

tagsRoutes.route("/").get(isAuthorized, async (req: Request, res: Response) => {
  const result = await getTagsList(req);
  res.status(200).send(result);
});

tagsRoutes
  .route("/:id")
  .get(isAuthorized, async (req: Request, res: Response) => {
    const result = await getTagById(req.params.id as string);
    res.status(200).send(result);
  });

export default tagsRoutes;
