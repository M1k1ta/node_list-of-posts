import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { UserData } from '../types/UserData';

export const generateAccessToken = (user: UserData) => {
  return jwt.sign(user, `${process.env.JWT_ACCESS_SECRET}`);
};

export const validateAccessToken = (token: string) => {
  try {
    return jwt.verify(token, `${process.env.JWT_ACCESS_SECRET}`);
  } catch {
    return null;
  }
};