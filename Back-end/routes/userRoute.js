import express from "express";
import { signUpUser, loginUser } from "../controllers/userController.js";

const userRoute = express.Router();
userRoute.post("/signup", signUpUser);
userRoute.post("/login", loginUser);
export default userRoute