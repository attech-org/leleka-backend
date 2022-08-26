import { parser, Metadata } from "html-metadata-parser";

import CustomError from "../models/CustomError.model";

export interface APIOutput {
  title?: string;
  description?: string;
  image?: string;
  siteName?: string;
  hostname?: string;
  url?: string;
}

export const getMetadata = async (url: string): Promise<APIOutput> => {
  const metadata: Metadata = await parser(url);

  const { hostname } = new URL(url);

  const output: APIOutput = {};

  if (!metadata) {
    throw { status: 404, message: "no metadata" } as CustomError;
  }
  const { images, og, meta } = metadata;

  if (og.image) {
    output.image = og.image;
  } else if (images.length > 0) {
    output.image = images[0];
  }

  output.description = og.description || meta.description || "";
  output.title = og.title || meta.title || "";
  output.siteName = og.site_name || "";
  output.url = url;
  output.hostname = hostname;

  return output;
};
