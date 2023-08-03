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
exports.removeAll = exports.remove = exports.create = exports.findAllByPostId = void 0;
const Comment_1 = require("../models/Comment");
const findAllByPostId = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Comment_1.Comment.findAll({
        where: {
            postId,
        }
    });
});
exports.findAllByPostId = findAllByPostId;
const create = ({ name, email, message, postId }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Comment_1.Comment.create({ name, email, message, postId });
});
exports.create = create;
const remove = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Comment_1.Comment.destroy({
        where: {
            id,
        }
    });
});
exports.remove = remove;
const removeAll = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Comment_1.Comment.destroy({
        where: {
            postId,
        }
    });
});
exports.removeAll = removeAll;
