import express from 'express';
import { addUserToRoom, creatingRoom, getRooms, removingRoom, removingUser, getRoomById } from '../controllers/room';

export const router = express.Router();

router.get('/:email', getRooms);
router.post('/roomId', getRoomById);
router.post('/create', creatingRoom);
router.post('/add-user', addUserToRoom);
router.post('/remove-user', removingUser);
router.delete('/:roomId', removingRoom);
