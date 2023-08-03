"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbinit = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const models_1 = require("../models");
require("dotenv/config");
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`;
const dbinit = () => new sequelize_typescript_1.Sequelize(URL, {
    models: models_1.models,
    dialectOptions: {
        ssl: true,
    },
});
exports.dbinit = dbinit;
