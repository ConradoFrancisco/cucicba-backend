"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Infractor_1 = __importDefault(require("./Infractor"));
class InfractoresModel {
    async getAll({ limit, offset = 0, estado, input, orderBy = 'id', orderDirection = 'ASC', }) {
        const where = {};
        if (input) {
            where.nombre = { [sequelize_1.Op.like]: `%${input}%` };
        }
        if (estado !== undefined)
            where.estado = estado;
        try {
            const { rows: data, count: total } = await Infractor_1.default.findAndCountAll({
                where,
                limit,
                offset,
                order: [[orderBy, orderDirection]],
                attributes: ['id', 'nombre', 'direccion', 'fecha', 'estado'],
            });
            return { data, total };
        }
        catch (e) {
            console.error(e);
            throw new Error('Hubo un error con la db');
        }
    }
    async create({ nombre, direccion, fecha, }) {
        try {
            const result = await Infractor_1.default.create({
                nombre,
                direccion,
                fecha: new Date(fecha),
            });
            return result;
        }
        catch (e) {
            console.error('Error en la db al ingresar el infractor: ', e);
            throw new Error('Error en la db al ingresar el infractor');
        }
    }
    async update({ id, nombre, direccion, fecha, }) {
        try {
            await Infractor_1.default.update({
                nombre,
                direccion,
                fecha: new Date(fecha),
            }, {
                where: { id },
            });
        }
        catch (e) {
            console.error('Error en la db al actualizar el infractor: ', e);
            throw new Error('Error en la db al actualizar el infractor');
        }
    }
    async setActive({ id, estado }) {
        try {
            await Infractor_1.default.update({ estado }, {
                where: { id },
            });
        }
        catch (e) {
            console.error('Error al cambiar el estado del infractor: ', e);
            throw new Error('Error al cambiar el estado del infractor');
        }
    }
    async delete({ id }) {
        try {
            await Infractor_1.default.destroy({
                where: { id },
            });
        }
        catch (e) {
            console.error('Error al eliminar el infractor: ', e);
            throw new Error('Error al eliminar el infractor');
        }
    }
}
exports.default = new InfractoresModel();
