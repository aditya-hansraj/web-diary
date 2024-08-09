import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";
import UserType  from "../types/user"
import passport from "../config/passport";
import ApiResponseType, { response } from "../types/response";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    // Check if all fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({ ...response, error: "All fields are required." });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ ...response, error: "User already exists with this email." });
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
          .json({ ...response, error: "Failed to log in after registration" });
      }
      res.status(201)
        .json({
          ...response, 
          success: true,
          data: {
            message: "User registered and logged in successfully",
            user: newUser,
          }
        });
    });
  } catch (err: Error | any | null) {
    res.status(500).json({ ...response, error: err.message });
  }
};

export const login = (req: Request, res: Response) => {
  passport.authenticate(
    "local",
    (err: Error | null, user: any, info: string | object | false | undefined) => {
      if (err) {
        return res.status(500).json({ ...response, error: "Internal server error" });
      }
      if (!user) {
        return res.status(400).json({
          ...response,
          success: true,
          data: info
        });
      }
      req.login(user, (err) => {
        if (err) {
          return res.status(500).json({...response, error: "Failed to log in" });
        }
        res.status(200).json({
          ...response,
          success: true,
          data: {
            message: "Logged in successfully", user 
          }
        });
      });
    }
  )(req, res);
};

export const logout = (req: Request, res: Response) => {
  req.logout((err: any) => {
    if (err) {
      return res.status(500).json({...response, error: 'Logout failed' });
    }
    req.session.destroy((err: any) => {
      if (err) {
        return res.status(500).json({...response, error: 'Session destruction failed' });
      }
      res.status(200).json({
        ...response,
        success: true,
        data: { message: 'Logged out successfully' }
      });
    });
  })
};

export const getUser = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({...response, error: 'User not authenticated' });
    }
    // Cast req.user to UserType if using TypeScript
    const user = req.user as UserType;

    res.json({
      ...response,
      success: true,
      data: {user}
    });
  } catch (err) {
    res.status(500).json({...response, error: 'Internal server error' });
  }
}