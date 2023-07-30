"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const room_1 = require("../controllers/room");
exports.router = express_1.default.Router();
exports.router.get('/:email', room_1.getRooms);
exports.router.post('/roomId', room_1.getRoomById);
exports.router.post('/create', room_1.creatingRoom);
exports.router.post('/add-user', room_1.addUserToRoom);
exports.router.post('/remove-user', room_1.removingUser);
exports.router.delete('/:roomId', room_1.removingRoom);
