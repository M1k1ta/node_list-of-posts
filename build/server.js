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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dbinit_1 = require("./utils/dbinit");
const auth_1 = require("./routers/auth");
const users_1 = require("./routers/users");
const room_1 = require("./routers/room");
const Room_1 = require("./models/Room");
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
(0, dbinit_1.dbinit)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/', auth_1.router);
app.use('/users', users_1.router);
app.use('/room', room_1.router);
app.get('/check', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Room_1.Room.findAll();
        res.send({ status: 'Ok' });
    }
    catch (_a) {
        res.send({ status: 'Fail' });
    }
}));
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`);
});
