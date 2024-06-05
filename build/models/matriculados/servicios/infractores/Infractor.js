"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Database_1 = require("../../../../db/Database"); // Ajusta esta ruta según tu estructura de proyecto
class Infractor extends sequelize_1.Model {
}
Infractor.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    direccion: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    fecha: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    estado: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
    },
}, {
    tableName: 'infractores',
    sequelize: Database_1.sequelize, // passing the `sequelize` instance is required
    timestamps: false,
});
exports.default = Infractor;
