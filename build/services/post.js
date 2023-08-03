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
exports.remove = exports.update = exports.create = exports.findAll = void 0;
const Post_1 = require("../models/Post");
const findAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield Post_1.Post.findAll();
});
exports.findAll = findAll;
const create = ({ title, body }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Post_1.Post.create({ title, body });
});
exports.create = create;
const update = ({ id, title, body }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Post_1.Post.update({ title, body }, {
        where: { id }
    });
});
exports.update = update;
const remove = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Post_1.Post.destroy({
        where: {
            id,
        }
    });
});
exports.remove = remove;
