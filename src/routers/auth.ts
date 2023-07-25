import express from 'express';
import { login, register, googleAuth } from '../controllers/auth';
import { catchError } from '../utils/catchError';

export const router = express.Router();

router.post('/registration', catchError(register));
router.post('/login', catchError(login));
router.post('/google-auth', googleAuth)