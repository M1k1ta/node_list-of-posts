"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbinit = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const models_1 = require("../models");
require("dotenv/config");
const database = process.env.DATABASE;
const username = process.env.USER;
const password = process.env.PASSWORD;
const host = process.env.HOST;
const dbinit = () => new sequelize_typescript_1.Sequelize(`${database}://${username}:${password}.${host}`, {
    models: models_1.models,
    dialectOptions: {
        ssl: true,
    },
});
exports.dbinit = dbinit;
