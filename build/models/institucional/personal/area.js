"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Database_1 = require("../../../db/Database");
const Area = Database_1.sequelize.define('Area', {
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        get() {
            return this.getDataValue('title');
        },
        set(value) {
            this.setDataValue('title', value.toUpperCase().trim());
        },
        validate: {
            notEmpty: {
                msg: 'El campo title no puede estar vacío'
            },
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
    estado: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}, {
    tableName: 'areas',
    timestamps: false // Ajusta si tu tabla tiene timestamps
});
exports.default = Area;
