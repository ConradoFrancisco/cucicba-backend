"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Database_1 = require("../../../db/Database");
const AutoridadPuesto_1 = __importDefault(require("./AutoridadPuesto"));
class Autoridad extends sequelize_1.Model {
}
Autoridad.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
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
    avatar: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: {
                msg: 'El campo avatar no puede estar vacío'
            },
        },
        get() {
            return this.getDataValue('avatar');
        },
        set(value) {
            this.setDataValue('avatar', value.trim());
        }
    },
    estado: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    orden: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        validate: {
            isNumeric: {
                msg: 'el campo orden debe ser un numero'
            },
            notEmpty: {
                msg: 'El campo orden no puede estar vacío'
            },
        },
    },
    puesto_id: {
        type: sequelize_1.DataTypes.INTEGER,
        validate: {
            isNumeric: {
                msg: 'el campo orden debe ser un numero'
            },
            notEmpty: {
                msg: 'El campo puesto no puede estar vacío'
            },
        },
        references: {
            model: AutoridadPuesto_1.default,
            key: 'id'
        }
    }
}, {
    sequelize: Database_1.sequelize,
    tableName: 'autoridades',
    timestamps: false
});
Autoridad.belongsTo(AutoridadPuesto_1.default, { foreignKey: 'puesto_id' });
exports.default = Autoridad;
