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
exports.removeComment = exports.createComment = exports.getComments = void 0;
const comment_1 = require("../services/comment");
const getComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.params;
    try {
        const comments = yield (0, comment_1.findAllByPostId)(Number(postId));
        res.send(comments);
    }
    catch (_a) {
        res.sendStatus(400);
    }
});
exports.getComments = getComments;
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, message, postId } = req.body;
    try {
        const newComment = yield (0, comment_1.create)({ name, email, message, postId });
        res.send(newComment);
    }
    catch (_b) {
        res.sendStatus(400);
    }
});
exports.createComment = createComment;
const removeComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const comment = yield (0, comment_1.remove)(Number(id));
        res.send({ comment });
    }
    catch (_c) {
        res.sendStatus(400);
    }
});
exports.removeComment = removeComment;
