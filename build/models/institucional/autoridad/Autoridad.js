"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Database_1 = require("../../../db/Database");
const AutoridadPuesto_1 = __importDefault(require("./AutoridadPuesto"));
class Autoridad extends sequelize_1.Model {
}
Autoridad.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    apellido: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    avatar: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    estado: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    orden: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    puesto_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: AutoridadPuesto_1.default,
            key: 'id'
        }
    }
}, {
    sequelize: Database_1.sequelize,
    tableName: 'autoridades',
    timestamps: false
});
Autoridad.belongsTo(AutoridadPuesto_1.default, { foreignKey: 'puesto_id' });
exports.default = Autoridad;
