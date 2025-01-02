import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Function to generate JWT token
const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '24h' });
};

// Function to check if user exists
const checkExistingUser = async (email: string) => {
  return await User.findOne({ email });
};

// Function to create new user
const createUser = async (userData: { name: string, email: string}) => {
  const user = new User(userData);
  await user.save();
  return user;
};

// Function to find user by email
const findUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};

// Function to format user response
const formatUserResponse = (user: any, token: string) => {
  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  };
};

export const authController = {
  // Register a new user
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email} = req.body;

      // Check if user already exists
      const existingUser = await checkExistingUser(email);
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Create new user
      const user = await createUser({ name, email});

    } catch (error) {
      next(error);
    }
  },
}
