import express from 'express';
import { createPost, getPosts, removePost, updatePost } from '../controllers/post';

export const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);
router.patch('/', updatePost);
router.delete('/:id', removePost);
