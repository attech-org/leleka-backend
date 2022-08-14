import { Response, Request } from "express";
import { IUser, User } from "../models/User";

exports.register = async (req: Request, res: Response, next: any) => {
  const { username, email, password } = req.body;
  try {
    const user: IUser = await User.create({
      username,
      email,
      password,
    });
    res.send(user);
  } catch (error: any) {
    next(error);
  }
};
