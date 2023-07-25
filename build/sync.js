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
exports.seedInitialData = void 0;
const User_1 = require("./models/User");
const dbinit_1 = require("./utils/dbinit");
const seedInitialData = () => __awaiter(void 0, void 0, void 0, function* () {
    yield User_1.User.bulkCreate([]);
});
exports.seedInitialData = seedInitialData;
const sync = () => __awaiter(void 0, void 0, void 0, function* () {
    (0, dbinit_1.dbinit)();
    // { force: true }
    yield User_1.User.sync({ force: true });
    yield (0, exports.seedInitialData)();
});
sync();
