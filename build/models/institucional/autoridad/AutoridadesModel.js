"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Autoridad_1 = __importDefault(require("./Autoridad"));
const AutoridadPuesto_1 = __importDefault(require("./AutoridadPuesto"));
const sequelize_1 = require("sequelize");
class AutoridadesModel {
    async getAll({ limit, offset, input, estado, orden, puesto_id, orderBy = "orden", orderDirection = "DESC", }) {
        const where = {};
        if (input) {
            where[sequelize_1.Op.or] = [
                { nombre: { [sequelize_1.Op.like]: `%${input}%` } },
                { apellido: { [sequelize_1.Op.like]: `%${input}%` } },
            ];
        }
        if (estado !== undefined || estado === 0) {
            where.estado = estado;
        }
        if (puesto_id !== undefined) {
            where.puesto_id = puesto_id;
        }
        if (orden !== undefined) {
            where.orden = orden;
        }
        const { count, rows } = await Autoridad_1.default.findAndCountAll({
            where,
            include: [
                {
                    model: AutoridadPuesto_1.default,
                    attributes: ["nombre"],
                },
            ],
            order: [[orderBy, orderDirection]],
            limit,
            offset,
            raw: true, // Aquí se indica que se devuelvan los resultados en formato plano
        });
        const modRows = rows.map((row) => {
            const modifiedRow = Object.assign(Object.assign({}, row), { puesto: row['AutoridadPuesto.nombre'] });
            delete modifiedRow['AutoridadPuesto.nombre'];
            return modifiedRow;
        });
        return { data: modRows, total: count };
    }
    async getCargos() {
        return await AutoridadPuesto_1.default.findAll();
    }
    async create({ nombre, apellido, avatar, puesto, orden, }) {
        return await Autoridad_1.default.create({
            nombre,
            apellido,
            avatar,
            puesto_id: puesto,
            orden,
        });
    }
    async setActive({ id, estado }) {
        return await Autoridad_1.default.update({ estado }, { where: { id } });
    }
    async delete({ id }) {
        return await Autoridad_1.default.destroy({ where: { id } });
    }
    async update({ id, nombre, apellido, avatar, puesto_id, orden, }) {
        const fieldsToUpdate = {};
        if (nombre !== undefined)
            fieldsToUpdate.nombre = nombre;
        if (apellido !== undefined)
            fieldsToUpdate.apellido = apellido;
        if (avatar !== undefined)
            fieldsToUpdate.avatar = avatar;
        if (puesto_id !== undefined)
            fieldsToUpdate.puesto_id = puesto_id;
        if (orden !== undefined)
            fieldsToUpdate.orden = orden;
        return await Autoridad_1.default.update(fieldsToUpdate, { where: { id } });
    }
}
exports.default = new AutoridadesModel();
