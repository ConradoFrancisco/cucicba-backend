"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
exports.sequelize = new sequelize_1.Sequelize('cucicbadb', 'root', '', {
    host: 'localhost',
    dialect: 'mysql', // Cambia según tu base de datos (mysql, postgres, sqlite, etc.)
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
(async () => {
    try {
        await exports.sequelize.authenticate();
        console.log('Connection has been established successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();
