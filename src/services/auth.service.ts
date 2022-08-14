import { Response, Request } from "express";

export const register = async (req: Request, res: Response, next: any) => {
  const { username, email, password } = req.body;
  try {
    // process input data
    // call repository method
    // res.send(user);
    console.log({ username, email, password });
    res.send(200);
  } catch (error: any) {
    next(error);
  }
};
