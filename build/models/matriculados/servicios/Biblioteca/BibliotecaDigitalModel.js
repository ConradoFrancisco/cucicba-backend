"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const CategoriaBiblioteca_1 = require("./CategoriaBiblioteca");
class BibliotecaModel {
    // Método para obtener todas las categorías
    async getAllCategories() {
        try {
            const data = await CategoriaBiblioteca_1.CategoriaBiblioteca.findAll();
            return data;
        }
        catch (e) {
            console.error('Error al obtener las categorías: ', e);
            throw new Error('Error al obtener las categorías');
        }
    }
    // Método para crear una categoría
    async createCategory({ nombre }) {
        try {
            const result = await CategoriaBiblioteca_1.CategoriaBiblioteca.create({ nombre });
            return result;
        }
        catch (e) {
            console.error('Error al crear la categoría: ', e);
            throw new Error('Error al crear la categoría');
        }
    }
    // Método para obtener todos los posts
    async getAll({ limit, offset = 0, estado, categoria_id, input, orderBy = 'id', orderDirection = 'ASC', }) {
        const where = {};
        if (input) {
            where.descripcion = { [sequelize_1.Op.like]: `%${input}%` };
        }
        if (estado !== undefined)
            where.estado = estado;
        if (categoria_id !== undefined)
            where.categoria_id = categoria_id;
        try {
            const { rows: data, count: total } = await CategoriaBiblioteca_1.PostBiblioteca.findAndCountAll({
                where,
                limit,
                offset,
                order: [[orderBy, orderDirection]],
                include: [{
                        model: CategoriaBiblioteca_1.CategoriaBiblioteca,
                        attributes: ['nombre'],
                    }],
                attributes: [
                    'id',
                    'categoria_id',
                    'fecha',
                    'descripcion',
                    'estado',
                    'archivo',
                ],
            });
            const modifiedRows = data.map((row) => {
                var _a;
                return (Object.assign(Object.assign({}, row.toJSON()), { categoria: ((_a = row.CategoriaBiblioteca) === null || _a === void 0 ? void 0 : _a.nombre) || null }));
            });
            return { data: modifiedRows, total };
        }
        catch (e) {
            console.error('Error al obtener los posts: ', e);
            throw new Error('Error al obtener los posts');
        }
    }
    // Método para crear un post
    async create({ categoria_id, fecha, descripcion, estado = 0, archivo, }) {
        try {
            const result = await CategoriaBiblioteca_1.PostBiblioteca.create({
                categoria_id,
                fecha,
                descripcion,
                estado,
                archivo,
            });
            return result;
        }
        catch (e) {
            console.error('Error al crear el post: ', e);
            throw new Error('Error al crear el post');
        }
    }
    // Método para actualizar un post
    async update({ id, categoria_id, fecha, descripcion, archivo, }) {
        try {
            await CategoriaBiblioteca_1.PostBiblioteca.update({
                categoria_id,
                fecha,
                descripcion,
                archivo,
            }, {
                where: { id },
            });
        }
        catch (e) {
            console.error('Error al actualizar el post: ', e);
            throw new Error('Error al actualizar el post');
        }
    }
    // Método para cambiar el estado de un post
    async setActive({ id, estado }) {
        try {
            await CategoriaBiblioteca_1.PostBiblioteca.update({ estado }, {
                where: { id },
            });
        }
        catch (e) {
            console.error('Error al cambiar el estado del post: ', e);
            throw new Error('Error al cambiar el estado del post');
        }
    }
    // Método para eliminar un post
    async delete({ id }) {
        try {
            await CategoriaBiblioteca_1.PostBiblioteca.destroy({
                where: { id },
            });
        }
        catch (e) {
            console.error('Error al eliminar el post: ', e);
            throw new Error('Error al eliminar el post');
        }
    }
}
exports.default = new BibliotecaModel();
