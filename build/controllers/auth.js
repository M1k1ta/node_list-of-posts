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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleAuth = exports.normalize = exports.login = exports.register = void 0;
const auth_1 = require("../services/auth");
require("dotenv/config");
const jwtService_1 = require("../services/jwtService");
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const decodeJwt_1 = require("../utils/decodeJwt");
const room_1 = require("../services/room");
const Room_1 = require("../models/Room");
const sequelize_1 = __importDefault(require("sequelize"));
const validatePassword = (password) => {
    if (!password) {
        return 'Password is required';
    }
    if (password.length < 6) {
        return 'At least 6 characters';
    }
    return '';
};
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
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const errors = {
        name: '',
        email: validateEmail(email),
        password: validatePassword(password),
    };
    if (!name) {
        errors.name = 'Name is required';
    }
    if (errors.name || errors.email || errors.password) {
        res.send({ errors });
        return;
    }
    try {
        yield (0, auth_1.registerUser)({ name, email, password });
        try {
            yield (0, room_1.addUser)({ email, roomId: 1 });
            yield Room_1.Room.update({ updateAt: sequelize_1.default.fn('NOW') }, {
                where: {
                    id: 1,
                },
            });
        }
        catch (_a) {
            res.sendStatus(400);
            return;
        }
    }
    catch (_b) {
        errors.email = 'Email is already taken';
        res.send({ errors });
        return;
    }
    res.send(createSendingUser({ name, email, password }));
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const errors = {
        email: '',
        password: '',
    };
    const validEmail = validateEmail(email);
    const validPassword = validatePassword(password);
    const user = yield (0, auth_1.getByEmail)(email);
    if (validEmail) {
        errors.email = validEmail;
    }
    else if (!user) {
        errors.email = 'User with email does not exist';
    }
    if (validPassword) {
        errors.password = validPassword;
    }
    if (errors.email || errors.password) {
        res.send({ errors });
        return;
    }
    if (!user) {
        return;
    }
    try {
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            errors.password = 'Password is wrong';
            res.send({ errors });
            return;
        }
        const accessToken = (0, jwtService_1.generateAccessToken)((0, exports.normalize)(user));
        res.send({
            accessToken,
        });
    }
    catch (e) {
        console.log(e);
    }
});
exports.login = login;
const normalize = ({ name, email, picture, password, }) => {
    return {
        name,
        email,
        picture,
        password,
    };
};
exports.normalize = normalize;
const createSendingUser = (existingUser) => {
    const userData = (0, exports.normalize)(existingUser);
    const accessToken = (0, jwtService_1.generateAccessToken)(userData);
    return {
        accessToken,
    };
};
const googleAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { credential } = req.body;
    const userData = (0, decodeJwt_1.decodeJwtResponse)(credential);
    const existingUser = yield (0, auth_1.getByEmail)(userData.email);
    if (existingUser) {
        res.send(createSendingUser(existingUser));
        return;
    }
    const { name, email, picture, } = userData;
    const password = (0, uuid_1.v4)();
    const user = {
        name,
        email,
        picture,
        password,
    };
    try {
        yield (0, auth_1.googleRegister)(user);
        try {
            yield (0, room_1.addUser)({ email, roomId: 1 });
        }
        catch (_c) {
            res.sendStatus(400);
            return;
        }
    }
    catch (_d) {
        res.sendStatus(400);
        return;
    }
    res.send(createSendingUser(user));
});
exports.googleAuth = googleAuth;
