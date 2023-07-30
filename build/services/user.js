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
exports.findUsersByRoom = void 0;
const sequelize_1 = require("sequelize");
const Bridge_1 = require("../models/Bridge");
const User_1 = require("../models/User");
const findUsersByRoom = (roomId) => __awaiter(void 0, void 0, void 0, function* () {
    const bridges = yield Bridge_1.Bridge.findAll({
        where: {
            roomId,
        }
    });
    const emails = bridges.map(({ email }) => email);
    const users = yield User_1.User.findAll({
        where: {
            email: {
                [sequelize_1.Op.or]: emails,
            }
        },
        order: [
            ['updatedAt', 'DESC'],
        ],
    });
    return users;
});
exports.findUsersByRoom = findUsersByRoom;
