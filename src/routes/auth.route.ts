import express from "express";
import { register } from "../services/auth.service";

const authRouter = express.Router();

authRouter.route("/register").post(register);

export default authRouter;
