"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Database_1 = require("../../../db/Database");
class Servicio extends sequelize_1.Model {
}
Servicio.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: new sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    url: {
        type: new sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    icon: {
        type: new sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    orden: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    activo: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    tableName: 'services',
    sequelize: Database_1.sequelize,
    timestamps: false,
});
exports.default = Servicio;
