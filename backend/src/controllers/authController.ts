import { Request, Response } from "express";
import User from "../models/User";
import { generateToken, clearToken } from "../utils/generateToken";
import { AuthRequest } from "../types";

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, username, password } = req.body;

    // Validation
    if (!name || !username || !password) {
      res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
      return;
    }

    // Check if username already exists
    const userExists = await User.findOne({ username });

    if (userExists) {
      res.status(400).json({
        success: false,
        message: "Username already exists",
      });
      return;
    }

    // Create user
    const user = await User.create({
      name,
      username,
      password,
    });

    // 🆕 Auto-login: Generate token and set cookie
    generateToken(
      {
        id: user._id.toString(),
        username: user.username,
      },
      res
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
      },
    });
  } catch (error: any) {
    console.error("Register Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error during registration",
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({
        success: false,
        message: "Please provide username and password",
      });
      return;
    }

    const user = await User.findOne({ username }).select("+password");

    if (!user) {
      res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
      return;
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
      return;
    }

    // Generate token and set cookie
    generateToken(
      {
        id: user._id.toString(),
        username: user.username,
      },
      res
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
      },
    });
  } catch (error: any) {
    console.error("Login Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error during login",
    });
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
export const logout = async (
  _req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    clearToken(res);

    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error: any) {
    console.error("Logout Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error during logout",
    });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user?.id).select("-password");

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
      },
    });
  } catch (error: any) {
    console.error("Get Me Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};
