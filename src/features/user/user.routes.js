import express from "express";
import UserController from "./user.controller.js";

const userRouter = express.Router();

userRouter.post("/sign-up", UserController.signUp);

userRouter.post("/sign-in", UserController.signIn);


export default userRouter;
