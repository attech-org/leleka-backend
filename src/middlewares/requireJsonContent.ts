import { Request, Response, NextFunction } from "express";

const requireJsonContent = (
  req: Request,
  response: Response,
  next: NextFunction
) => {
  if (req.headers["content-type"] !== "application/json") {
    response.status(400).send("Server requires application/json");
  } else {
    next();
  }
};

export default requireJsonContent;
