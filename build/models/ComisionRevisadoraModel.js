"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const comisionRevisadora_1 = require("./institucional/comision_revisadora/comisionRevisadora");
class ComisionRevisadoraModel {
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
            const { rows: data, count: total } = await comisionRevisadora_1.ComisionRevisadora.findAndCountAll({
                where,
                limit,
                offset,
                order: [[orderBy, orderDirection]],
            });
            return { data, total };
        }
        catch (e) {
            console.error(e);
            throw new Error("Error en la db al conseguir los datos de la comisión revisadora");
        }
    }
    async create({ nombre, apellido, orden, posicion, }) {
        try {
            const result = await comisionRevisadora_1.ComisionRevisadora.create({
                nombre,
                apellido,
                orden,
                posicion,
                estado: 1 // Asumiendo que el estado por defecto es activo
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
            await comisionRevisadora_1.ComisionRevisadora.update({ estado }, {
                where: { id }
            });
        }
        catch (e) {
            throw new Error("Error al activar la autoridad");
        }
    }
    async delete({ id }) {
        try {
            await comisionRevisadora_1.ComisionRevisadora.destroy({
                where: { id }
            });
        }
        catch (e) {
            throw new Error("Error al eliminar la autoridad");
        }
    }
    async update({ id, nombre, apellido, orden, posicion }) {
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
            await comisionRevisadora_1.ComisionRevisadora.update(updateData, {
                where: { id }
            });
        }
        catch (e) {
            throw new Error("Error al modificar el área");
        }
    }
}
exports.default = new ComisionRevisadoraModel();
