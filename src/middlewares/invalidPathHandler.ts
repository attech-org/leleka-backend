import { Request, Response } from "express";

const invalidPathHandler = (req: Request, response: Response) => {
  response.status(400);
  response.send("invalid path");
};

export default invalidPathHandler;
