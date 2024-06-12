"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Database_1 = require("../../../../db/Database");
class RevistaCucicba extends sequelize_1.Model {
}
RevistaCucicba.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    estado: {
        type: sequelize_1.DataTypes.TINYINT,
        defaultValue: 0,
        allowNull: false,
    },
    portada: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    archivo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    fecha: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
}, {
    sequelize: Database_1.sequelize,
    modelName: 'RevistaCucicba',
    tableName: 'revista_cucicba',
    timestamps: false,
});
exports.default = RevistaCucicba;
