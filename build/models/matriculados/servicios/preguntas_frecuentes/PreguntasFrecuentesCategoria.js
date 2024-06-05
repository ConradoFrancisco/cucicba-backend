"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Database_1 = require("../../../../db/Database");
class PreguntasFrecuentesCategoria extends sequelize_1.Model {
}
PreguntasFrecuentesCategoria.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    titulo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: Database_1.sequelize,
    modelName: "PreguntasFrecuentesCategorias",
    tableName: "preguntas_frecuentes_categorias",
    timestamps: false,
});
exports.default = PreguntasFrecuentesCategoria;
