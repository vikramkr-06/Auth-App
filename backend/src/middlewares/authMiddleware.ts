import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest, JWTPayload } from '../types';

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // ✅ Get token from cookie
    const token = req.cookies.token;

    console.log('Auth Middleware - Cookies:', req.cookies);
    console.log('Auth Middleware - Token:', token ? 'Present' : 'Missing');

    // Check if token exists
    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Not authorized, no token provided',
      });
      return;
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JWTPayload;

    console.log('Auth Middleware - Decoded:', decoded);

    // Attach user info to request
    req.user = {
      id: decoded.id,
      username: decoded.username,
    };

    next();
  } catch (error: any) {
    console.error('Auth Middleware Error:', error.message);
    
    if (error.name === 'JsonWebTokenError') {
      res.status(401).json({
        success: false,
        message: 'Not authorized, invalid token',
      });
      return;
    }
    
    if (error.name === 'TokenExpiredError') {
      res.status(401).json({
        success: false,
        message: 'Not authorized, token expired',
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: 'Server error during authentication',
    });
  }
};