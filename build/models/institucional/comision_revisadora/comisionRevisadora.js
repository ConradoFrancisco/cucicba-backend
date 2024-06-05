"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComisionRevisadora = void 0;
const sequelize_1 = require("sequelize");
const Database_1 = require("../../../db/Database");
class ComisionRevisadora extends sequelize_1.Model {
}
exports.ComisionRevisadora = ComisionRevisadora;
ComisionRevisadora.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    apellido: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    orden: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    posicion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    estado: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
}, {
    sequelize: Database_1.sequelize,
    modelName: "ComisionRevisadora",
    tableName: "comision_revisadora",
    timestamps: false,
});
