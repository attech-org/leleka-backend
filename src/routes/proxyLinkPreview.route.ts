import axios from "axios";
import express from "express";

import validUrl from "../helpers/validUrl";
import { getMetadata } from "../services/proxyLinkPreview.service";

const proxyLinkPreviewRouter = express.Router();

const checkAccessToImage = async (url: string) => {
  try {
    const response = await axios({
      method: "get",
      url: url,
      responseType: "stream",
    });
    if ((response.status = 200)) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};

proxyLinkPreviewRouter
  .route("/")
  .get<object, object, undefined, { url: string }>(async (req, res) => {
    const url = req.query.url || "";
    if (!validUrl(url)) {
      return res.status(400).json({ error: "Invalid URL" });
    }
    const metadata = await getMetadata(url);
    if (metadata.image && !(await checkAccessToImage(metadata.image))) {
      metadata.image = "";
    }
    res.send({ metadata: metadata });
  });

export default proxyLinkPreviewRouter;
