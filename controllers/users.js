import { User } from "../models/user.js";
import bcrypt from "bcrypt";
export const getAllUsers = async (req, res) => {};

import { sendCookie } from "../utils/features.js";
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 400));
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      return next(new ErrorHandler("Invalid email or password", 400));
    }

    sendCookie(user, res, `weolcome back ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

export const getMyDetails = (req, res) => {
  const id = "myid";

  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const test = () => {};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    console.log(user);

    if (!user) {
      return next(new ErrorHandler("user already exist", 400));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password: hashedPassword });

    sendCookie(user, res, "User registered successfully", 201);
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      user: req.user,
    });
};
