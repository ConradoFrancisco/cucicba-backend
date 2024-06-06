"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Database_1 = require("../../db/Database");
const Imagen_1 = __importDefault(require("./Imagen"));
class Noticia extends sequelize_1.Model {
}
Noticia.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    title: {
        type: new sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    description: {
        type: new sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    cantFotos: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
    },
    body: {
        type: new sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    orden: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    estado: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
    },
}, {
    tableName: 'noticias',
    sequelize: Database_1.sequelize,
    timestamps: false,
});
Noticia.hasMany(Imagen_1.default, { foreignKey: 'noticia_id' });
Imagen_1.default.belongsTo(Noticia, { foreignKey: 'noticia_id' });
exports.default = Noticia;
