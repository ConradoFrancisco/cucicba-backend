"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Database_1 = require("../../../db/Database");
const area_1 = __importDefault(require("./area"));
const Personal = Database_1.sequelize.define('Personal', {
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
        }
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
    telefono: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    cargo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    estado: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    area: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El campo area no puede estar vacío'
            },
        },
        references: {
            model: area_1.default,
            key: 'id'
        }
    }
}, {
    tableName: 'personal',
    timestamps: false
});
Personal.belongsTo(area_1.default, { foreignKey: 'area' });
area_1.default.hasMany(Personal, { foreignKey: 'area' });
exports.default = Personal;
