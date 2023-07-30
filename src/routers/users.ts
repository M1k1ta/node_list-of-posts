import express from 'express';
import { getUsers } from '../controllers/user';

export const router = express.Router();

router.get('/:roomId', getUsers);
