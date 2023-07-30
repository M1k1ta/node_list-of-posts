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
exports.removeRoom = exports.removeUser = exports.addUser = exports.createRoom = exports.findRoomsByUser = exports.findRoomById = void 0;
const sequelize_1 = require("sequelize");
const Bridge_1 = require("../models/Bridge");
const Room_1 = require("../models/Room");
const findRoomById = (email, roomId) => __awaiter(void 0, void 0, void 0, function* () {
    const bridge = yield Bridge_1.Bridge.findAll({
        where: {
            [sequelize_1.Op.and]: [
                {
                    email: {
                        [sequelize_1.Op.in]: [email],
                    }
                },
                {
                    roomId: {
                        [sequelize_1.Op.in]: [roomId],
                    }
                },
            ],
        }
    });
    if (bridge.length === 0) {
        return { errors: { status: "Don't have rools" } };
    }
    return yield Room_1.Room.findByPk(roomId);
});
exports.findRoomById = findRoomById;
const findRoomsByUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const bridges = yield Bridge_1.Bridge.findAll({
        where: {
            email: email.slice(1),
        }
    });
    const roomsIds = bridges.map(({ roomId }) => roomId);
    const rooms = yield Room_1.Room.findAll({
        where: {
            id: {
                [sequelize_1.Op.in]: roomsIds,
            },
        },
        order: [
            ['createdAt', 'DESC'],
        ],
    });
    return rooms;
});
exports.findRoomsByUser = findRoomsByUser;
const createRoom = ({ name, autorEmail }) => __awaiter(void 0, void 0, void 0, function* () {
    const room = yield Room_1.Room.create({ name, autorEmail });
    yield Bridge_1.Bridge.create({ email: autorEmail, roomId: room.id });
    return room;
});
exports.createRoom = createRoom;
const addUser = ({ email, roomId }) => __awaiter(void 0, void 0, void 0, function* () {
    const bridge = yield Bridge_1.Bridge.findAll({
        where: {
            [sequelize_1.Op.and]: [
                {
                    email: {
                        [sequelize_1.Op.in]: [email],
                    }
                },
                {
                    roomId: {
                        [sequelize_1.Op.in]: [roomId],
                    }
                },
            ],
        }
    });
    if (bridge.length !== 0) {
        return { status: 'NOT' };
    }
    yield Bridge_1.Bridge.create({ email, roomId });
    yield Room_1.Room.update({ updatedAt: Date.now() }, {
        where: {
            id: roomId,
        },
    });
});
exports.addUser = addUser;
const removeUser = (email, roomId) => __awaiter(void 0, void 0, void 0, function* () {
    yield Bridge_1.Bridge.destroy({
        where: {
            [sequelize_1.Op.and]: [
                {
                    email: {
                        [sequelize_1.Op.in]: [email],
                    }
                },
                {
                    roomId: {
                        [sequelize_1.Op.in]: [roomId],
                    }
                },
            ],
        }
    });
});
exports.removeUser = removeUser;
const removeRoom = (roomId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Room_1.Room.destroy({
            where: {
                id: roomId,
            }
        });
    }
    catch (_a) {
        return { errors: { status: 'Fail' } };
    }
    yield Bridge_1.Bridge.destroy({
        where: {
            roomId,
        }
    });
});
exports.removeRoom = removeRoom;
