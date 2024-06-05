"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Database_1 = require("../../../db/Database");
const Area = Database_1.sequelize.define('Area', {
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    orden: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    estado: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}, {
    tableName: 'areas', // Ajusta el nombre de la tabla si es necesario
    timestamps: false // Ajusta si tu tabla tiene timestamps
});
exports.default = Area;
