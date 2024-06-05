"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const TribunalEtica_1 = require("./institucional/tribunal_etica/TribunalEtica");
class TribunalModel {
    async getAll({ limit, offset = 0, input = "", estado, posicion, orden, orderBy = "nombre", // Campo por defecto para ordenar
    orderDirection = "DESC", // Dirección por defecto para ordenar
     }) {
        const where = {};
        if (input) {
            where[sequelize_1.Op.or] = [
                { nombre: { [sequelize_1.Op.like]: `%${input}%` } },
                { apellido: { [sequelize_1.Op.like]: `%${input}%` } }
            ];
        }
        if (estado !== undefined)
            where.estado = estado;
        if (posicion)
            where.posicion = posicion;
        if (orden !== undefined)
            where.orden = orden;
        try {
            const { rows: data, count: total } = await TribunalEtica_1.TribunalEtica.findAndCountAll({
                where,
                limit,
                offset,
                order: [[orderBy, orderDirection]],
            });
            return { data, total };
        }
        catch (e) {
            console.error(e);
            throw new Error("Error en la db al conseguir los datos del tribunal de ética y disciplina");
        }
    }
    async create({ nombre, apellido, orden, posicion, }) {
        try {
            const result = await TribunalEtica_1.TribunalEtica.create({
                nombre,
                apellido,
                orden,
                posicion,
                estado: 1, // Asumiendo que el estado por defecto es activo
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
            await TribunalEtica_1.TribunalEtica.update({ estado }, {
                where: { id },
            });
        }
        catch (e) {
            throw new Error("Error al activar la autoridad");
        }
    }
    async delete({ id }) {
        try {
            await TribunalEtica_1.TribunalEtica.destroy({
                where: { id },
            });
        }
        catch (e) {
            throw new Error("Error al eliminar la autoridad");
        }
    }
    async update({ id, nombre, apellido, orden, posicion, }) {
        const updateData = {};
        if (nombre !== undefined)
            updateData.nombre = nombre;
        if (apellido !== undefined)
            updateData.apellido = apellido;
        if (orden !== undefined)
            updateData.orden = orden;
        if (posicion !== undefined)
            updateData.posicion = posicion;
        try {
            await TribunalEtica_1.TribunalEtica.update(updateData, {
                where: { id },
            });
        }
        catch (e) {
            throw new Error("Error al modificar el área");
        }
    }
}
exports.default = new TribunalModel();
