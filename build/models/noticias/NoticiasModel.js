"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Noticia_1 = __importDefault(require("./Noticia"));
const Imagen_1 = __importDefault(require("./Imagen"));
const Database_1 = require("../../db/Database");
class NoticiasModel {
    async getAll({ titulo, input, fecha, limit, offset = 0, orderBy = "orden", orderDirection = "ASC", estado = undefined }) {
        const where = {};
        if (input) {
            where.title = { [sequelize_1.Op.like]: `%${input}%` };
        }
        if (titulo) {
            where.title = { [sequelize_1.Op.like]: `%${titulo}%` };
        }
        if (fecha) {
            where.date = { [sequelize_1.Op.eq]: new Date(fecha) };
        }
        if (estado || estado === 0) {
            where.estado = { [sequelize_1.Op.eq]: estado };
        }
        try {
            // Consulta para obtener los datos
            const data = await Noticia_1.default.findAll({
                where,
                limit,
                offset,
                order: [[orderBy, orderDirection]],
                include: [{
                        model: Imagen_1.default,
                        attributes: ['imageUrl'],
                    }],
            });
            // Consulta para obtener el total
            const total = await Noticia_1.default.count({
                where,
            });
            return { data, total };
        }
        catch (e) {
            console.error(e);
            throw new Error("Hubo un error con la db");
        }
    }
    async deleteImage({ id }) {
        try {
            await Imagen_1.default.destroy({
                where: { id },
            });
        }
        catch (e) {
            console.error("Error al eliminar la imagen:", e);
            throw new Error("Error al eliminar la imagen");
        }
    }
    async create({ date, title, description, cantFotos = 0, body, orden, }) {
        try {
            const noticia = await Noticia_1.default.create({
                date,
                title,
                description,
                cantFotos,
                body,
                orden,
            });
            return noticia.id;
        }
        catch (e) {
            console.error("Error en la db al crear la noticia: ", e);
            throw new Error("Error en la db al crear la noticia");
        }
    }
    async updatear({ id, date, title, description, cantFotos, body, orden, filePaths = [], }) {
        const transaction = await Database_1.sequelize.transaction();
        try {
            // Actualizar el registro de la noticia
            const noticia = await Noticia_1.default.update({
                date,
                title,
                description,
                cantFotos,
                body,
                orden,
            }, {
                where: { id },
                transaction,
            });
            // Actualizar imágenes si se proporcionan nuevos filePaths
            if (filePaths.length > 0) {
                // Eliminar imágenes antiguas
                await Imagen_1.default.destroy({
                    where: { noticia_id: id },
                    transaction,
                });
                // Insertar nuevas imágenes
                const images = filePaths.map((filePath) => ({
                    noticia_id: id,
                    imageUrl: filePath,
                }));
                await Imagen_1.default.bulkCreate(images, { transaction });
            }
            await transaction.commit();
            return noticia;
        }
        catch (e) {
            await transaction.rollback();
            console.error("Error al actualizar la noticia y sus imágenes:", e);
            throw new Error("Error al actualizar la noticia y sus imágenes");
        }
    }
    async createImagesRegister({ id_noticia, filePaths = [], }) {
        if (filePaths.length === 0) {
            throw new Error("No file paths provided");
        }
        const images = filePaths.map(filePath => ({
            noticia_id: id_noticia,
            imageUrl: filePath,
        }));
        try {
            await Imagen_1.default.bulkCreate(images);
        }
        catch (error) {
            console.error("Error al insertar imágenes:", error);
            throw error;
        }
    }
    async getById({ id }) {
        try {
            // Consulta para obtener la noticia actual
            const noticia = await Noticia_1.default.findOne({
                where: { id },
                include: [{
                        model: Imagen_1.default,
                        attributes: ['imageUrl'],
                    }],
            });
            if (!noticia)
                throw new Error("Noticia no encontrada");
            // Consulta para obtener el ID de la siguiente noticia
            const siguienteNoticia = await Noticia_1.default.findOne({
                where: {
                    id: { [sequelize_1.Op.gt]: id },
                },
                order: [['id', 'ASC']],
                attributes: ['id'],
            });
            const siguienteId = siguienteNoticia ? siguienteNoticia.id : null;
            // Consulta para obtener el ID de la noticia anterior
            const anteriorNoticia = await Noticia_1.default.findOne({
                where: {
                    id: { [sequelize_1.Op.lt]: id },
                },
                order: [['id', 'DESC']],
                attributes: ['id'],
            });
            const anteriorId = anteriorNoticia ? anteriorNoticia.id : null;
            return { noticia, siguienteId, anteriorId };
        }
        catch (e) {
            console.error("Error en la db al obtener la noticia: ", e);
            throw new Error("Error en la db al obtener la noticia");
        }
    }
    async setActive({ id, estado }) {
        try {
            await Noticia_1.default.update({ estado }, {
                where: { id },
            });
        }
        catch (e) {
            console.error("Error al cambiar el estado de la noticia: ", e);
            throw new Error("Error al cambiar el estado de la noticia");
        }
    }
    async delete({ id }) {
        const transaction = await Database_1.sequelize.transaction();
        try {
            // Eliminar imágenes relacionadas
            await Imagen_1.default.destroy({
                where: { noticia_id: id },
                transaction,
            });
            // Eliminar la noticia
            await Noticia_1.default.destroy({
                where: { id },
                transaction,
            });
            await transaction.commit();
        }
        catch (e) {
            await transaction.rollback();
            console.error("Error al eliminar la noticia y sus imágenes:", e);
            throw new Error("Error al eliminar la noticia y sus imágenes");
        }
    }
}
exports.default = new NoticiasModel();
