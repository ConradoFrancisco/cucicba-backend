"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const SancionesTribunal_1 = __importDefault(require("./SancionesTribunal"));
const CategoriaSanciones_1 = __importDefault(require("./CategoriaSanciones"));
class SancionesModel {
    async getAll({ limit, offset = 0, input = "", estado, fecha, categoria, orderBy = "id", // Campo por defecto para ordenar
    orderDirection = "ASC", // Dirección por defecto para ordenar
     }) {
        const where = {};
        if (input) {
            where.descripcion = { [sequelize_1.Op.like]: `%${input}%` };
        }
        if (estado !== undefined)
            where.estado = estado;
        if (categoria !== undefined)
            where.categoria_sancion_id = categoria;
        try {
            const { rows: data, count: total } = await SancionesTribunal_1.default.findAndCountAll({
                where,
                limit,
                offset,
                order: [[orderBy, orderDirection]],
                include: [
                    {
                        model: CategoriaSanciones_1.default,
                        attributes: ["nombre"],
                    },
                ],
                attributes: [
                    "id",
                    "categoria_sancion_id",
                    "fecha",
                    "descripcion",
                    "estado",
                    "pdf",
                ],
            });
            const modifiedRows = data.map((row) => {
                var _a;
                return (Object.assign(Object.assign({}, row.toJSON()), { categoria: ((_a = row.CategoriaSancion) === null || _a === void 0 ? void 0 : _a.nombre) || null }));
            });
            return { data: modifiedRows, total };
        }
        catch (e) {
            console.error(e);
            throw new Error("Hubo un error con la db");
        }
    }
    async create({ categoria, descripcion, fecha, pdf = "", }) {
        try {
            const result = await SancionesTribunal_1.default.create({
                categoria_sancion_id: categoria,
                descripcion,
                fecha,
                pdf,
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
            await SancionesTribunal_1.default.update({ estado }, {
                where: { id },
            });
        }
        catch (e) {
            throw new Error("Error al publicar la sanción");
        }
    }
    async delete({ id }) {
        try {
            await SancionesTribunal_1.default.destroy({
                where: { id },
            });
        }
        catch (e) {
            throw new Error("Error al eliminar la sanción");
        }
    }
    async update({ id, categoria_sancion_id, descripcion, fecha, pdf = "", }) {
        const updateData = { categoria_sancion_id, descripcion, fecha, pdf };
        try {
            await SancionesTribunal_1.default.update(updateData, {
                where: { id },
            });
        }
        catch (e) {
            throw new Error("Error al modificar la sancion");
        }
    }
    async getCategorys() {
        try {
            const data = await CategoriaSanciones_1.default.findAll();
            return data;
        }
        catch (e) {
            throw new Error("Error en la db al obtener las categorías");
        }
    }
}
exports.default = new SancionesModel();
