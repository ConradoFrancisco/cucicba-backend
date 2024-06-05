"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Database_1 = require("../../../../db/Database");
class CategoriaSancion extends sequelize_1.Model {
}
CategoriaSancion.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: Database_1.sequelize,
    modelName: 'CategoriaSancion',
    tableName: 'categoria_sanciones',
    timestamps: false,
});
exports.default = CategoriaSancion;
