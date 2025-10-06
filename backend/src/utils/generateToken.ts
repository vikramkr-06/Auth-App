import jwt from 'jsonwebtoken';
import { Response } from 'express';

interface TokenPayload {
  id: string;
  username: string;
}

export const generateToken = (payload: TokenPayload, res: Response): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  
  const token = jwt.sign(payload, secret, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  } as any);

  // Calculate cookie expiration
  const cookieExpire = parseInt(process.env.COOKIE_EXPIRE || '7', 10);

  // Set cookie options
  const options = {
    expires: new Date(Date.now() + cookieExpire * 24 * 60 * 60 * 1000), // Convert days to milliseconds
    httpOnly: true, // Prevent XSS attacks
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    sameSite: process.env.NODE_ENV === 'production' ? ('strict' as const) : ('lax' as const),
  };

  // Set cookie
  res.cookie('token', token, options);

  return token;
};

export const clearToken = (res: Response): void => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
  });
};