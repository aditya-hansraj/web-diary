import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";
import UserType from "../types/user";
import passport from "../config/passport";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    // Check if all fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User already exists with this email." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    } as UserType);
    await newUser.save();

    // res.status(201).json({ message: "User registered successfully" });

    // Log in the newly registered user
    req.login(newUser, (err: Error | null) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Failed to log in after registration" });
      }
      res
        .status(201)
        .json({
          message: "User registered and logged in successfully",
          user: newUser,
        });
    });
  } catch (err: Error | any | null) {
    res.status(500).json({ error: err.message });
  }
};

// Login controller
export const login = (req: Request, res: Response) => {
  passport.authenticate(
    "local",
    (err: Error | null, user: any, info: string | object | false | undefined) => {
      if (err) {
        return res.status(500).json({ error: "Internal server error" });
      }
      if (!user) {
        return res.status(400).json(info);
      }
      req.login(user, (err) => {
        if (err) {
          return res.status(500).json({ error: "Failed to log in" });
        }
        res.status(200).json({ message: "Logged in successfully", user });
      });
    }
  )(req, res);
};