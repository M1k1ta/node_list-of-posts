import { Request, Response } from 'express';
import { User } from '../models/User';
import { getByEmail, googleRegister, registerUser } from '../services/auth';
import 'dotenv/config';
import { generateAccessToken } from '../services/jwtService';
import { v4 as uuidv4 } from 'uuid';

import bcrypt from 'bcrypt';
import { decodeJwtResponse } from '../utils/decodeJwt';
import { UserData } from '../types/UserData';
import { addUser } from '../services/room';
import { Room } from '../models/Room';
import sequelize from 'sequelize';

const validatePassword = (password: string) => {
  if (!password) {
    return 'Password is required';
  }

  if (password.length < 6) {
    return 'At least 6 characters';
  }

  return '';
};

const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    return 'Email is required';
  }

  if (!emailRegex.test(email)) {
    return 'Email is not valid';
  }

  return '';
};

export const register = async(req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const errors = {
    name: '',
    email: validateEmail(email),
    password: validatePassword(password),
  };

  if (!name) {
    errors.name = 'Name is required'
  }

  if (errors.name || errors.email || errors.password) {
    res.send({ errors });

    return;
  }

  try {
    await registerUser({ name, email, password });

    try {
      await addUser({ email, roomId: 1 });
      await Room.update({ updateAt: sequelize.fn('NOW') }, {
        where: {
          id: 1,
        },
      });

    } catch {
      res.sendStatus(400);
      return;
    }
  } catch {
    errors.email = 'Email is already taken';
    res.send({ errors });

    return;
  }

  res.send(createSendingUser({ name, email, password }));
};

export const login = async(req: Request, res: Response) => {
  const { email, password } = req.body;

  const errors = {
    email: '',
    password: '',
  };

  const validEmail = validateEmail(email);
  const validPassword = validatePassword(password);
  const user = await getByEmail(email);

  if (validEmail) {
    errors.email = validEmail;
  } else if (!user) {
    errors.email = 'User with email does not exist';
  }

  if (validPassword) {
    errors.password = validPassword;
  }

  if (errors.email || errors.password) {
    res.send({ errors });
    return;
  }

  if (!user) {
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
      accessToken,
    });
  } catch (e) {
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
    accessToken,
  };
};

export const googleAuth = async (req: Request, res: Response) => {
  const { credential } = req.body;
  const userData = decodeJwtResponse(credential);

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

  try {
    await googleRegister(user);

    try {
      await addUser({ email, roomId: 1 });
    } catch {
      res.sendStatus(400);
      return;
    }

  } catch {
    res.sendStatus(400);
    return;
  }

  res.send(createSendingUser(user));
};
