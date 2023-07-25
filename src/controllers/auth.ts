import { NextFunction, Request, Response } from 'express';
import { User } from '../models/User';
import { getByEmail, googleRegister, registerUser } from '../services/auth';
import 'dotenv/config';
import { generateAccessToken } from '../services/jwtService';
import { v4 as uuidv4 } from 'uuid';

import bcrypt from 'bcrypt';
import { decodeJwtResponse } from '../utils/decodeJwt';
import { UserData } from '../types/UserData';

const validatePassword = (password: string) => {
  if (!password) {
    return 'Password is required';
  }

  if (password.length < 6) {
    return 'At least 6 characters';
  }
};

const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    return 'Email is required';
  }

  if (!emailRegex.test(email)) {
    return 'Email is not valid';
  }
};

export const register = async(req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const errors = {
    email: validateEmail(email),
    password: validatePassword(password),
  };

  if (errors.email || errors.password) {
    res.send({ errors });

    return;
  }

  console.log(name, email, password);

  try {
    await registerUser({ name, email, password });
  } catch {
    errors.email = 'Email is already taken';
    res.send({ errors });

    return;
  }
  console.log(name, email, password);

  res.send(createSendingUser({ name, email, password }));
};

export const login = async(req: Request, res: Response) => {
  const { email, password } = req.body;

  const errors = {
    email: '',
    password: '',
  };

  const user = await getByEmail(email);

  if (!user) {
    errors.email = 'User with email does not exist';
    res.send({ errors });

    return;
  }

  try {
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      errors.password = 'Password is wrong';
      res.send({ errors });
      return;
    }

    const accessToken = generateAccessToken(normalize(user));

    res.send({
      user,
      accessToken,
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
};

export const normalize = ({
  name,
  email,
  picture,
  password,
}: UserData | User) => {
  return {
    name,
    email,
    picture,
    password,
  };
};

const createSendingUser = (existingUser: UserData | User) => {
  const userData = normalize(existingUser);
  const accessToken = generateAccessToken(userData);

  return {
    user: userData,
    accessToken,
  };
};

export const googleAuth = async (req: Request, res: Response) => {
  const { credential } = req.body;
  const userData = decodeJwtResponse(credential);

  console.log(userData);

  const existingUser = await getByEmail(userData.email);

  if (existingUser) {
    res.send(createSendingUser(existingUser));
    return;
  }

  const {
    name,
    email,
    picture,
  } = userData;

  const password = uuidv4();

  const user: UserData = {
    name,
    email,
    picture,
    password,
  };

  await googleRegister(user);

  res.send(createSendingUser(user));

};
