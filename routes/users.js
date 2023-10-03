import express from "express";
import { User } from "../models/user.js";
import {
  getAllUsers,
  getMyDetails,
  login,
  logout,
  register,
  test,
} from "../controllers/users.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/all", getAllUsers);

router.get("/myself", isAuthenticated, getMyDetails);

router.get("/test", test);

router.post("/new", register);

router.post("/login", login);

router.get("/logout", logout);

export default router;
