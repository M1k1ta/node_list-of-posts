import { Request, Response } from 'express';
import { findUsersByRoom } from "../services/user";

export const getUsers = async(req: Request, res: Response) => {
  const { roomId } = req.params;

  try {
    const users = await findUsersByRoom(Number(roomId));

    res.send(users);
  } catch {
    res.send('Fail');
  }
};