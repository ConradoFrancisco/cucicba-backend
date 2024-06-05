"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const PreguntasFrecuentes_1 = __importDefault(require("./PreguntasFrecuentes"));
const PreguntasFrecuentesCategoria_1 = __importDefault(require("./PreguntasFrecuentesCategoria"));
class PreguntasFrecuentesModel {
    async getPreguntas({ limit, offset = 0, estado, category, input, orderBy = "id", // Campo por defecto para ordenar
    orderDirection = "ASC", // Dirección por defecto para ordenar
     }) {
        const where = {};
        if (input) {
            where.pregunta = { [sequelize_1.Op.like]: `%${input}%` };
        }
        if (estado !== undefined)
            where.estado = estado;
        if (category !== undefined)
            where.categoria_id = category;
        try {
            const { rows: data, count: total } = await PreguntasFrecuentes_1.default.findAndCountAll({
                where,
                limit,
                offset,
                order: [[orderBy, orderDirection]],
                include: [{
                        model: PreguntasFrecuentesCategoria_1.default,
                        attributes: ['titulo'],
                    }],
                attributes: [
                    'id',
                    'pregunta',
                    'estado',
                    'respuesta',
                    'categoria_id',
                ],
            });
            const modifiedRows = data.map((row) => {
                var _a;
                return (Object.assign(Object.assign({}, row.toJSON()), { categoria: ((_a = row.PreguntasFrecuentesCategoria) === null || _a === void 0 ? void 0 : _a.titulo) || null }));
            });
            console.log(modifiedRows);
            return { data: modifiedRows, total };
        }
        catch (e) {
            console.error(e);
            throw new Error("Hubo un error con la db");
        }
    }
    async getCategorys() {
        try {
            const data = await PreguntasFrecuentesCategoria_1.default.findAll();
            return data;
        }
        catch (e) {
            console.error("Error al obtener las categorías: ", e);
            throw new Error("Error al obtener las categorías");
        }
    }
    async create({ pregunta, respuesta, categoria, }) {
        try {
            const result = await PreguntasFrecuentes_1.default.create({
                pregunta,
                respuesta,
                categoria_id: categoria,
            });
            return result;
        }
        catch (e) {
            console.error("Error en la db al ingresar la pregunta frecuente: ", e);
            throw new Error("Error en la db al ingresar la pregunta frecuente");
        }
    }
    async update({ id, pregunta, respuesta, categoria, }) {
        try {
            await PreguntasFrecuentes_1.default.update({
                pregunta,
                respuesta,
                categoria_id: categoria,
            }, {
                where: { id },
            });
        }
        catch (e) {
            console.error("Error en la db al actualizar la pregunta frecuente: ", e);
            throw new Error("Error en la db al actualizar la pregunta frecuente");
        }
    }
    async setActive({ id, estado }) {
        try {
            await PreguntasFrecuentes_1.default.update({ estado }, {
                where: { id },
            });
        }
        catch (e) {
            console.error("Error al activar la pregunta frecuente: ", e);
            throw new Error("Error al activar la pregunta frecuente");
        }
    }
    async delete({ id }) {
        try {
            await PreguntasFrecuentes_1.default.destroy({
                where: { id },
            });
        }
        catch (e) {
            console.error("Error al eliminar la pregunta frecuente: ", e);
            throw new Error("Error al eliminar la pregunta frecuente");
        }
    }
}
exports.default = new PreguntasFrecuentesModel();
