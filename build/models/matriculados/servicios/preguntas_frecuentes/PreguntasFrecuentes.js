"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Database_1 = require("../../../../db/Database");
const PreguntasFrecuentesCategoria_1 = __importDefault(require("./PreguntasFrecuentesCategoria"));
class PreguntasFrecuentes extends sequelize_1.Model {
}
PreguntasFrecuentes.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    pregunta: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    respuesta: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    estado: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    categoria_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: PreguntasFrecuentesCategoria_1.default,
            key: 'id',
        },
    },
}, {
    sequelize: Database_1.sequelize,
    modelName: 'PreguntasFrecuentes',
    tableName: 'preguntas_frecuentes',
    timestamps: false,
});
PreguntasFrecuentes.belongsTo(PreguntasFrecuentesCategoria_1.default, {
    foreignKey: 'categoria_id',
});
exports.default = PreguntasFrecuentes;
