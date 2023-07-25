import { User } from '../models/User';
import { UserData } from '../types/UserData';
import bcrypt from 'bcrypt';

export const getByEmail = (email: string) => {
  return User.findOne({
    where: { email },
  });
};

export const registerUser = async({ name, email, password }: UserData) => {
  const hash = await bcrypt.hash(password, 10);

  await User.create({
    name,
    email,
    password: hash,
  });
};

export const googleRegister = async({ name, email, picture, password }: UserData) => {
  const hash = await bcrypt.hash(password, 10);

  await User.create({
    name,
    email,
    password: hash,
    picture,
  });
};
