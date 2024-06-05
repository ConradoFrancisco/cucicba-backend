"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Database_1 = require("../../../../db/Database");
const CategoriaSanciones_1 = __importDefault(require("./CategoriaSanciones"));
class SancionesTribunal extends sequelize_1.Model {
}
SancionesTribunal.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    categoria_sancion_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    fecha: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    estado: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    pdf: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize: Database_1.sequelize,
    modelName: 'SancionesTribunal',
    tableName: 'sanciones_tribunal',
    timestamps: false,
});
SancionesTribunal.belongsTo(CategoriaSanciones_1.default, {
    foreignKey: 'categoria_sancion_id',
});
exports.default = SancionesTribunal;
