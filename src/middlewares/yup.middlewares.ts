import { NextFunction, Response, Request } from "express";

export const validation =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
    const resource = req.body;

    await schema.validate(resource);
    next();
  };
