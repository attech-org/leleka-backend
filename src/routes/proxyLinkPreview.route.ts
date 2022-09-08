import express from "express";

import validUrl from "../helpers/validUrl";
import { getMetadata } from "../services/proxyLinkPreview.service";

const proxyLinkPreviewRouter = express.Router();

proxyLinkPreviewRouter
  .route("/")
  .get<object, object, undefined, { url: string }>(async (req, res) => {
    const url = req.query.url || "";
    if (!validUrl(url)) {
      return res.status(400).json({ error: "Invalid URL" });
    }
    const metadata = await getMetadata(url);
    res.send({ metadata: metadata });
  });

export default proxyLinkPreviewRouter;
