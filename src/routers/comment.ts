import express from 'express';
import { createComment, getComments, removeComment } from '../controllers/comment';

export const router = express.Router();

router.get('/:postId', getComments);
router.post('/', createComment);
router.delete('/:id', removeComment);
