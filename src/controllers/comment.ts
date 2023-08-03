import { Request, Response } from 'express';
import { create, findAllByPostId, remove } from '../services/comment';

export const getComments = async(req: Request, res: Response) => {
  const { postId } = req.params;

  try {
    const comments = await findAllByPostId(Number(postId));

    res.send(comments);
  } catch {
    res.sendStatus(400);
  }
};

export const createComment = async(req: Request, res: Response) => {
  const { name, email, message, postId } = req.body;

  try {
    const newComment = await create({ name, email, message, postId });

    res.send(newComment);
  } catch {
    res.sendStatus(400);
  }
};

export const removeComment = async(req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const comment = await remove(Number(id));

    res.send({ comment });
  } catch {
    res.sendStatus(400);
  }
};