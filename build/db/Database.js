"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbConnection = void 0;
const sequelize_1 = require("sequelize");
exports.DbConnection = new sequelize_1.Sequelize(process.env.DB_NAME || '', process.env.DB_USER || 'root', process.env.DB_PASS || 'root', {
    host: process.env.DB_HOST || 'localhost',
    port: Number.parseInt(process.env.DB_PORT) || 5432,
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
