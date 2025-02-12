import { Request, Response, NextFunction, RequestHandler } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import { generateToken } from "../middleware/jwt";

export const register: RequestHandler = async (req, res, next) => {
  try {
    const { user_name, password } = req.body;

    if (!user_name || !password) {
       res.status(422).json({ error: "Missing Request Body" });
       return
    }

    const existingUser = await User.findOne({ user_name });
    if (existingUser) {
       res.status(400).json({ error: "User already exists" });
       return
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      user_name,
      password: hashedPassword,
    });
    await user.save();

    const token = await generateToken(user._id.toString());

    res.status(201).json({
      message: "User Created",
      user: user.user_name,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login: RequestHandler = async (req, res, next) => {
  try {
    const { user_name, password } = req.body;

    if (!user_name || !password) {
       res.status(422).json({ error: "Missing Request Body" });
       return;
    }

    const user = await User.findOne({ user_name });
    if (!user) {
       res.status(401).json({ error: "Invalid credentials" });
       return
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
       res.status(401).json({ error: "Invalid credentials" });
       return;
    }


    const token = await generateToken(user._id.toString());

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
