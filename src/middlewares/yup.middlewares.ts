import { NextFunction, Response, Request } from "express";
import { AnyYupSchema } from "src/validations/general.validation";

export const validation =
  (schema: AnyYupSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req);
      return next();
    } catch (error) {
      return res.status(400).json({ error });
    }
  };
