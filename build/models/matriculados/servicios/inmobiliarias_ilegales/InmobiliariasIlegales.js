"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InmobiliariasIlegales = void 0;
const sequelize_1 = require("sequelize");
const Database_1 = require("../../../../db/Database");
class InmobiliariasIlegales extends sequelize_1.Model {
}
exports.InmobiliariasIlegales = InmobiliariasIlegales;
InmobiliariasIlegales.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    direccion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    fecha: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    causa: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    estado: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
}, {
    sequelize: Database_1.sequelize,
    modelName: 'InmobiliariasIlegales',
    tableName: 'InmobiliariasIlegales',
    timestamps: false,
});
