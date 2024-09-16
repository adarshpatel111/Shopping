import express from "express";
import { signUpUser, loginUser, refresh, logout } from "../controllers/userController.js";

const userRoute = express.Router();
userRoute.post("/login", loginUser);
userRoute.post("/signup", signUpUser);
userRoute.post("/logout", logout);
userRoute.get("/refresh", refresh);
export default userRoute