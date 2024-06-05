"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const area_1 = __importDefault(require("./area")); // Asegúrate de ajustar la ruta
const sequelize_1 = require("sequelize");
class AreasModel {
    async getAll({ limit, offset = 0, input, estado, orden, orderBy = 'id', orderDirection = 'ASC' }) {
        const where = {};
        if (input) {
            where.title = { [sequelize_1.Op.like]: `%${input}%` };
        }
        if (estado !== undefined) {
            where.estado = estado;
        }
        if (orden !== undefined) {
            where.orden = orden;
        }
        console.log('hola');
        const { count, rows } = await area_1.default.findAndCountAll({
            where,
            order: [[orderBy, orderDirection]],
            limit,
            offset
        });
        return { data: rows, total: count };
    }
    async create({ title, orden }) {
        return await area_1.default.create({ title, orden });
    }
    async setActive({ id, estado }) {
        return await area_1.default.update({ estado }, { where: { id } });
    }
    async update({ id, title, orden }) {
        return await area_1.default.update({ title, orden }, { where: { id } });
    }
    async delete({ id }) {
        return await area_1.default.destroy({ where: { id } });
    }
    async getAreasNames() {
        return await area_1.default.findAll({
            attributes: ['id', 'title']
        });
    }
}
exports.default = new AreasModel();
