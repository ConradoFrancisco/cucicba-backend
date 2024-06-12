"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const RevistaCucicba_1 = __importDefault(require("./RevistaCucicba"));
class RevistaCucicbaModel {
    // Obtener todas las revistas con filtros, orden y paginación
    async getAll({ limit, offset = 0, input = "", estado, orderBy = "id", orderDirection = "ASC", }) {
        const where = {};
        if (input) {
            where[sequelize_1.Op.or] = [
                { portada: { [sequelize_1.Op.like]: `%${input}%` } },
                { archivo: { [sequelize_1.Op.like]: `%${input}%` } },
                { descripcion: { [sequelize_1.Op.like]: `%${input}%` } },
            ];
        }
        if (estado !== undefined)
            where.estado = estado;
        try {
            const { rows: data, count: total } = await RevistaCucicba_1.default.findAndCountAll({
                where,
                limit,
                offset,
                order: [[orderBy, orderDirection]],
            });
            return { data, total };
        }
        catch (e) {
            console.error(e);
            throw new Error("Error al obtener las revistas");
        }
    }
    // Crear una nueva revista
    async create({ portada, archivo, descripcion, fecha, }) {
        try {
            const result = await RevistaCucicba_1.default.create({
                portada,
                archivo,
                descripcion,
                fecha,
            });
            return result;
        }
        catch (e) {
            console.error(e);
            throw new Error("Error al crear la revista");
        }
    }
    // Actualizar el estado de una revista
    async setActive({ id, estado }) {
        try {
            await RevistaCucicba_1.default.update({ estado }, {
                where: { id },
            });
        }
        catch (e) {
            console.error(e);
            throw new Error("Error al actualizar el estado de la revista");
        }
    }
    // Eliminar una revista
    async delete({ id }) {
        try {
            await RevistaCucicba_1.default.destroy({
                where: { id },
            });
        }
        catch (e) {
            console.error(e);
            throw new Error("Error al eliminar la revista");
        }
    }
    // Actualizar una revista
    async update({ id, portada, archivo, descripcion, fecha, }) {
        const updateData = {};
        if (portada !== undefined)
            updateData.portada = portada;
        if (archivo !== undefined)
            updateData.archivo = archivo;
        if (descripcion !== undefined)
            updateData.descripcion = descripcion;
        if (fecha !== undefined)
            updateData.fecha = fecha;
        try {
            await RevistaCucicba_1.default.update(updateData, {
                where: { id },
            });
        }
        catch (e) {
            console.error(e);
            throw new Error("Error al actualizar la revista");
        }
    }
}
exports.default = new RevistaCucicbaModel();
