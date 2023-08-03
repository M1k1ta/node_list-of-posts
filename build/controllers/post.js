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
exports.removePost = exports.updatePost = exports.createPost = exports.getPosts = void 0;
const post_1 = require("../services/post");
const comment_1 = require("../services/comment");
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield (0, post_1.findAll)();
        res.send(posts);
    }
    catch (_a) {
        res.sendStatus(400);
    }
});
exports.getPosts = getPosts;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, body } = req.body;
    try {
        const post = yield (0, post_1.create)({ title, body });
        res.send(post);
    }
    catch (_b) {
        res.sendStatus(400);
    }
});
exports.createPost = createPost;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, title, body } = req.body;
    try {
        const post = yield (0, post_1.update)({ id, title, body });
        res.send(post);
    }
    catch (_c) {
        res.sendStatus(400);
    }
});
exports.updatePost = updatePost;
const removePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(id);
    try {
        const post = yield (0, post_1.remove)(Number(id));
        const comments = yield (0, comment_1.removeAll)(Number(id));
        res.send({ post, comments });
    }
    catch (_d) {
        res.sendStatus(400);
    }
});
exports.removePost = removePost;
