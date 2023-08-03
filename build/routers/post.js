"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const post_1 = require("../controllers/post");
exports.router = express_1.default.Router();
exports.router.get('/', post_1.getPosts);
exports.router.post('/', post_1.createPost);
exports.router.patch('/', post_1.updatePost);
exports.router.delete('/:id', post_1.removePost);
