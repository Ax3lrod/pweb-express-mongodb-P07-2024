import { Request, Response, RequestHandler } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { ApiResponse } from "../types/responseTypes";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Register function
export const register: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    // Check if all required fields are provided
    if (!username || !email || !password) {
      res.status(400).json({
        status: "failed",
        message: "Username, email, and password are required",
        data: {},
      });
      return;
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      res.status(400).json({
        status: "failed",
        message: "Username or email already exists",
        data: {},
      });
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const response: ApiResponse = {
      status: "success",
      message: "User registered successfully",
      data: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    };
    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Registration failed",
      data: {},
    });
  }
};

// Login function
export const login: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({
      $or: [{ username }, { email: username }],
    });
    if (!user) {
      res.status(400).json({
        status: "failed",
        message: "Invalid credentials",
        data: {},
      });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({
        status: "failed",
        message: "Invalid credentials",
        data: {},
      });
      return;
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    const response: ApiResponse = {
      status: "success",
      message: "Login successful",
      data: {
        user: { id: user._id, username: user.username, email: user.email },
        token,
      },
    };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Login failed",
      data: {},
    });
  }
};
