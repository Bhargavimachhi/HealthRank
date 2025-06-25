import express from "express";
import { signUpUsingMailAndPassword, logInUsingMailAndPassword } from "../controller/authenticationController.js";

const authRouter = express.Router();

authRouter.post("/signup/email-password", signUpUsingMailAndPassword);
authRouter.post("/login/email-password", logInUsingMailAndPassword);

export default authRouter;
