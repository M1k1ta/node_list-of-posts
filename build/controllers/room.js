"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removingUser = exports.removingRoom = exports.addUserToRoom = exports.creatingRoom = exports.getRooms = exports.getRoomById = void 0;
const room_1 = require("../services/room");
const mailService_1 = require("../services/mailService");
const auth_1 = require("../services/auth");
const getRoomById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, roomId } = req.body;
    try {
        const room = yield (0, room_1.findRoomById)(email, roomId);
        res.send(room);
    }
    catch (_a) {
        res.send({ errors: { status: 'Fail' } });
    }
});
exports.getRoomById = getRoomById;
const getRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    try {
        const rooms = yield (0, room_1.findRoomsByUser)(email);
        res.send(rooms);
    }
    catch (_b) {
        res.send({ errors: { status: 'Fail' } });
    }
});
exports.getRooms = getRooms;
const creatingRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, autorEmail } = req.body;
    try {
        const room = yield (0, room_1.createRoom)({ name, autorEmail });
        res.send(room);
    }
    catch (_c) {
        res.send({ errors: { status: 'Fail' } });
        return;
    }
});
exports.creatingRoom = creatingRoom;
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        return 'Email is required';
    }
    if (!emailRegex.test(email)) {
        return 'Email is not valid';
    }
    return '';
};
const addUserToRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, roomId, userEmail, roomName } = req.body;
    const errors = {
        email: validateEmail(email),
    };
    if (errors.email) {
        res.send({ errors });
        return;
    }
    try {
        const status = yield (0, room_1.addUser)({ email, roomId });
        if ((status === null || status === void 0 ? void 0 : status.status) !== undefined) {
            res.send(status);
            return;
        }
        yield (0, mailService_1.sendInvitation)(email, roomId, userEmail, roomName);
        const user = yield (0, auth_1.getByEmail)(email);
        if (user === null) {
            res.send({ status: 'NOT' });
            return;
        }
        res.send(user);
    }
    catch (e) {
        console.log(e);
        res.send({ status: 'Fail' });
        return;
    }
});
exports.addUserToRoom = addUserToRoom;
const removingRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { roomId } = req.params;
    try {
        yield (0, room_1.removeRoom)(Number(roomId));
    }
    catch (_d) {
        res.send({ errors: { status: 'Fail' } });
    }
    res.send('OK');
});
exports.removingRoom = removingRoom;
const removingUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, roomId } = req.body;
    try {
        yield (0, room_1.removeUser)(email, roomId);
    }
    catch (_e) {
        res.send({ errors: { status: 'Fail' } });
        return;
    }
    res.send('Ok');
});
exports.removingUser = removingUser;
