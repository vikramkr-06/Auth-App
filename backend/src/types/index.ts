import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { Types } from 'mongoose';

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface AuthRequest extends Request {
  user?: {
    id: string;
    username: string;
  };
}

export interface JWTPayload extends JwtPayload {
  id: string;
  username: string;
}