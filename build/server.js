"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dbinit_1 = require("./utils/dbinit");
const auth_1 = require("./routers/auth");
const users_1 = require("./routers/users");
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
(0, dbinit_1.dbinit)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/', auth_1.router);
app.use('/users', users_1.router);
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`);
});
