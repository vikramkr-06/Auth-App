import { Request, Response, NextFunction } from 'express';

interface ErrorResponse {
  success: boolean;
  message: string;
  stack?: string;
}

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error('Error Stack:', err.stack);

  const response: ErrorResponse = {
    success: false,
    message: err.message || 'Server Error',
  };

  // Include stack trace in development
  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    response.message = `${field} already exists`;
    res.status(400).json(response);
    return;
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e: any) => e.message);
    response.message = messages.join(', ');
    res.status(400).json(response);
    return;
  }

  // Mongoose cast error
  if (err.name === 'CastError') {
    response.message = 'Invalid resource ID';
    res.status(400).json(response);
    return;
  }

  res.status(err.statusCode || 500).json(response);
};

export const notFound = (req: Request, res: Response, next: NextFunction): void => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};