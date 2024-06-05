"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const InmobiliariasIlegales_1 = require("./inmobiliarias_ilegales/InmobiliariasIlegales");
const Database_1 = require("../../../db/Database");
class InmobiliariasIlegalesPenalModel {
    async getAll({ limit, offset = 0, input = "", estado, fecha, orderBy = "id", // Campo por defecto para ordenar
    orderDirection = "ASC", // Dirección por defecto para ordenar
     }) {
        const where = { causa: 1 };
        if (input) {
            where[sequelize_1.Op.or] = [
                { nombre: { [sequelize_1.Op.like]: `%${input}%` } },
                { direccion: { [sequelize_1.Op.like]: `%${input}%` } }
            ];
        }
        if (estado !== undefined)
            where.estado = estado;
        try {
            const { rows: data, count: total } = await InmobiliariasIlegales_1.InmobiliariasIlegales.findAndCountAll({
                where,
                limit,
                offset,
                order: [[orderBy, orderDirection]],
                attributes: [
                    'id',
                    'nombre',
                    'direccion',
                    [Database_1.sequelize.fn('DATE_FORMAT', Database_1.sequelize.col('fecha'), '%d-%m-%Y'), 'fecha'],
                    [Database_1.sequelize.fn('DATE_FORMAT', Database_1.sequelize.col('fecha'), '%Y-%m-%d'), 'fecha_edit'],
                    'estado',
                ],
            });
            return { data, total };
        }
        catch (e) {
            console.error(e);
            throw new Error("Hubo un error con la db");
        }
    }
    async getAllNoCausa({ limit, offset = 0, input = "", estado, fecha, orderBy = "id", // Campo por defecto para ordenar
    orderDirection = "ASC", // Dirección por defecto para ordenar
     }) {
        const where = { causa: 0 };
        if (input) {
            where[sequelize_1.Op.or] = [
                { nombre: { [sequelize_1.Op.like]: `%${input}%` } },
                { direccion: { [sequelize_1.Op.like]: `%${input}%` } }
            ];
        }
        if (estado !== undefined)
            where.estado = estado;
        try {
            const { rows: data, count: total } = await InmobiliariasIlegales_1.InmobiliariasIlegales.findAndCountAll({
                where,
                limit,
                offset,
                order: [[orderBy, orderDirection]],
                attributes: [
                    'id',
                    'nombre',
                    'direccion',
                    [Database_1.sequelize.fn('DATE_FORMAT', Database_1.sequelize.col('fecha'), '%d-%m-%Y'), 'fecha'],
                    [Database_1.sequelize.fn('DATE_FORMAT', Database_1.sequelize.col('fecha'), '%Y-%m-%d'), 'fecha_edit'],
                    'estado',
                ],
            });
            return { data, total };
        }
        catch (e) {
            console.error(e);
            throw new Error("Hubo un error con la db");
        }
    }
    async create({ nombre, direccion, fecha, causa = 1, }) {
        try {
            const result = await InmobiliariasIlegales_1.InmobiliariasIlegales.create({
                nombre,
                direccion,
                fecha,
                causa,
            });
            return result;
        }
        catch (e) {
            console.error(e);
            throw new Error("Hubo un error con la db");
        }
    }
    async setActive({ id, estado }) {
        try {
            await InmobiliariasIlegales_1.InmobiliariasIlegales.update({ estado }, {
                where: { id },
            });
        }
        catch (e) {
            throw new Error("Error al publicar la inmobiliaria ilegal");
        }
    }
    async delete({ id }) {
        try {
            await InmobiliariasIlegales_1.InmobiliariasIlegales.destroy({
                where: { id },
            });
        }
        catch (e) {
            throw new Error("Error al eliminar la inmobiliaria ilegal");
        }
    }
    async update({ id, nombre, direccion, fecha, causa, }) {
        console.log(causa);
        const updateData = {};
        if (nombre !== undefined)
            updateData.nombre = nombre;
        if (direccion !== undefined)
            updateData.direccion = direccion;
        if (fecha !== undefined)
            updateData.fecha = fecha;
        if (causa !== undefined || causa === 0)
            updateData.causa = causa;
        try {
            await InmobiliariasIlegales_1.InmobiliariasIlegales.update(updateData, {
                where: { id },
            });
        }
        catch (e) {
            throw new Error("Error al modificar el área");
        }
    }
}
exports.default = new InmobiliariasIlegalesPenalModel();
