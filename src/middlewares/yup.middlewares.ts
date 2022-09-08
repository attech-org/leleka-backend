import { NextFunction, Response, Request } from "express";

import { AnyYupSchema } from "../helpers/validation";

export const validation =
  (schema: AnyYupSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const resource = req;

    await schema.validate(resource);
    next();
  };
