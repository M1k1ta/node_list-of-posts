"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const catchError_1 = require("../utils/catchError");
exports.router = express_1.default.Router();
exports.router.post('/registration', (0, catchError_1.catchError)(auth_1.register));
exports.router.post('/login', (0, catchError_1.catchError)(auth_1.login));
exports.router.post('/google-auth', auth_1.googleAuth);
