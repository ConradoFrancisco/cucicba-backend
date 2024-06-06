"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Database_1 = require("../../db/Database");
class Imagen extends sequelize_1.Model {
}
Imagen.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    noticia_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    imageUrl: {
        type: new sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
}, {
    tableName: 'imagenes',
    sequelize: Database_1.sequelize,
    timestamps: false,
});
exports.default = Imagen;
