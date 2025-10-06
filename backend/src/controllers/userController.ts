import { Response } from 'express';
import User from '../models/User';
import { AuthRequest } from '../types';

// @desc    Get all users
// @route   GET /api/users
// @access  Private
export const getAllUsers = async (
  _req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const users = await User.find().select('name username createdAt');

    res.status(200).json({
      success: true,
      count: users.length,
      users: users.map((user) => ({
        id: user._id,
        name: user.name,
        username: user.username,
        createdAt: user.createdAt,
      })),
    });
  } catch (error: any) {
    console.error('Get Users Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error while fetching users',
    });
  }
};