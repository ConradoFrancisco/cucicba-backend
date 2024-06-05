"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Database_1 = require("../../../db/Database");
class AutoridadPuesto extends sequelize_1.Model {
}
AutoridadPuesto.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: Database_1.sequelize,
    tableName: 'autoridades_puestos',
    timestamps: false
});
exports.default = AutoridadPuesto;
