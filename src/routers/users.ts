import express from 'express';
import { User } from '../models/User';
import { normalize } from '../controllers/auth';

export const router = express.Router();

router.get('/', async (req, res) => {
  const users = await User.findAll();

  res.send(users.map(user => normalize(user)));
});