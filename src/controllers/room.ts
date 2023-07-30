import { Request, Response } from 'express';
import { addUser, createRoom, findRoomsByUser, removeRoom, removeUser, findRoomById } from "../services/room";
import { sendInvitation } from '../services/mailService';
import { getByEmail } from '../services/auth';

export const getRoomById = async(req: Request, res: Response) => {
  const { email, roomId } = req.body;

  try {
    const room = await findRoomById(email, roomId);

    res.send(room);
  } catch {
    res.send({ errors: { status: 'Fail' }});
  }
}

export const getRooms = async(req: Request, res: Response) => {
  const { email } = req.params;

  try {
    const rooms = await findRoomsByUser(email);

    res.send(rooms);
  } catch {
    res.send({ errors: { status: 'Fail' }});
  }
};

export const creatingRoom = async(req: Request, res: Response) => {
  const { name, autorEmail } = req.body;

  try {
    const room = await createRoom({ name, autorEmail });

    res.send(room);
  } catch {
    res.send({ errors: { status: 'Fail' }});
    return;
  }
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

export const addUserToRoom = async(req: Request, res: Response) => {
  const { email, roomId, userEmail, roomName } = req.body;

  const errors = {
    email: validateEmail(email),
  }

  if (errors.email) {
    res.send({ errors });
    
    return;
  }

  try {
    const status = await addUser({ email, roomId });

    if (status?.status !== undefined) {
      res.send(status);
      return;
    }

    await sendInvitation(email, roomId, userEmail, roomName);

    const user = await getByEmail(email);

    if (user === null) {
      res.send({ status: 'NOT' });
      return;
    }

    res.send(user);
  } catch (e) {
    console.log(e);
    res.send({ status: 'Fail' });
    return;
  }
};

export const removingRoom = async(req: Request, res: Response) => {
  const { roomId } = req.params;

  try {
  await removeRoom(Number(roomId));
  } catch {
    res.send({ errors: { status: 'Fail' }});
  }

  res.send('OK');
}

export const removingUser = async(req: Request, res: Response) => {
  const { email, roomId } = req.body;

  try {
    await removeUser(email, roomId);
  } catch {
    res.send({ errors: { status: 'Fail' }});
    return;
  }

  res.send('Ok');
}
