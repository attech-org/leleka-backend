import express, { Request, Response } from "express";

import validUrl from "../helpers/validUrl";
import { getMetadata } from "../services/proxyLinkPreview.service";

const proxyLinkPreviewRouter = express.Router();

proxyLinkPreviewRouter.route("/").get(async (req: Request, res: Response) => {
  const url = (req.query.url as string) || "";
  // res.set("Access-Control-Allow-Origin", "*");
  if (!validUrl(url)) {
    return res.status(400).json({ error: "Invalid URL" });
  }
  const metadata = await getMetadata(url);
  res.send({ metadata: metadata });
});

export default proxyLinkPreviewRouter;
