import { Request, Response } from 'express';
import { create, findAll, remove, update } from '../services/post';
import { removeAll } from '../services/comment';

export const getPosts = async(req: Request, res: Response) => {
  try {
    const posts = await findAll();

    res.send(posts);
  } catch {
    res.sendStatus(400);
  }
};

export const createPost = async(req: Request, res: Response) => {
  const { title, body } = req.body;

  try {
    const post = await create({ title, body });

    res.send(post);
  } catch {
    res.sendStatus(400);
  }
};

export const updatePost = async(req: Request, res: Response) => {
  const { id, title, body } = req.body;

  try {
    const post = await update({ id, title, body });

    res.send(post);
  } catch {
    res.sendStatus(400);
  }
};

export const removePost = async(req: Request, res: Response) => {
  const { id } = req.params;

  
  console.log(id);

  try {
    const post = await remove(Number(id));
    const comments = await removeAll(Number(id));

    res.send({ post, comments });
  } catch {
    res.sendStatus(400);
  }
};
