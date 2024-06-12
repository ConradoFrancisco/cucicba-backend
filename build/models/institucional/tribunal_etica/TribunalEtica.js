"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TribunalEtica = void 0;
const sequelize_1 = require("sequelize");
const Database_1 = require("../../../db/Database");
class TribunalEtica extends sequelize_1.Model {
}
exports.TribunalEtica = TribunalEtica;
TribunalEtica.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El campo nombre no puede estar vacío'
            },
        },
        get() {
            return this.getDataValue('nombre');
        },
        set(value) {
            this.setDataValue('nombre', value.toUpperCase().trim());
        },
    },
    apellido: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El campo apellido no puede estar vacío'
            },
        },
        get() {
            return this.getDataValue('apellido');
        },
        set(value) {
            this.setDataValue('apellido', value.toUpperCase().trim());
        },
    },
    orden: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El campo orden no puede estar vacío'
            },
        },
    },
    posicion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El campo posicion no puede estar vacío'
            },
        },
    },
    estado: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
}, {
    sequelize: Database_1.sequelize,
    modelName: 'TribunalEtica',
    tableName: 'tribunal_etica',
    timestamps: false,
});
