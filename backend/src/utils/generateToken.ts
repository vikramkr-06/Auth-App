import jwt, { SignOptions } from 'jsonwebtoken';
import { Response } from 'express';

interface TokenPayload {
  id: string;
  username: string;
}

export const generateToken = (payload: TokenPayload, res: Response): string => {
  const jwtSecret = process.env.JWT_SECRET;
  
  if (!jwtSecret) {
    throw new Error('JWT_SECRET environment variable is not defined');
  }

  const token = jwt.sign(payload, jwtSecret, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  } as SignOptions);

  const cookieExpire = parseInt(process.env.COOKIE_EXPIRE || '7', 10);

  const options = {
    expires: new Date(Date.now() + cookieExpire * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
    sameSite: 'none' as const,
    path: '/',
  };

  res.cookie('token', token, options);

  return token;
};

export const clearToken = (res: Response): void => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
    secure: true,
    sameSite: 'none' as const,
    path: '/',
  });
};