"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComisionRevisadora = void 0;
const sequelize_1 = require("sequelize");
const Database_1 = require("../../../db/Database");
class ComisionRevisadora extends sequelize_1.Model {
}
exports.ComisionRevisadora = ComisionRevisadora;
ComisionRevisadora.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        get() {
            return this.getDataValue('nombre');
        },
        set(value) {
            this.setDataValue('nombre', value.toUpperCase().trim());
        },
        validate: {
            notEmpty: {
                msg: 'El campo nombre no puede estar vacío'
            },
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
        }
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
                msg: 'El campo posición no puede estar vacío'
            },
        },
    },
    estado: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
}, {
    sequelize: Database_1.sequelize,
    modelName: "ComisionRevisadora",
    tableName: "comision_revisadora",
    timestamps: false,
});
