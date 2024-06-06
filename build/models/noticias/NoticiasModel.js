"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Noticia_1 = __importDefault(require("./Noticia"));
const Imagen_1 = __importDefault(require("./Imagen"));
class NoticiasModel {
    async getAll({ titulo, input, fecha, limit, offset = 0, orderBy = "orden", orderDirection = "ASC", }) {
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
            const noticia = await Noticia_1.default.findOne({
                where: { id },
                include: [{
                        model: Imagen_1.default,
                        attributes: ['imageUrl'],
                    }],
            });
            if (!noticia)
                throw new Error("Noticia no encontrada");
            return { noticia };
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
}
exports.default = new NoticiasModel();
