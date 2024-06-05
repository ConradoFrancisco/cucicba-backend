import { Op } from 'sequelize';
import { CategoriaBiblioteca, PostBiblioteca } from './CategoriaBiblioteca';


class BibliotecaModel {
    // Método para obtener todas las categorías
    public async getAllCategories() {
        try {
            const data = await CategoriaBiblioteca.findAll();
            return data;
        } catch (e) {
            console.error('Error al obtener las categorías: ', e);
            throw new Error('Error al obtener las categorías');
        }
    }

    // Método para crear una categoría
    public async createCategory({ nombre }: { nombre: string }) {
        try {
            const result = await CategoriaBiblioteca.create({ nombre });
            return result;
        } catch (e) {
            console.error('Error al crear la categoría: ', e);
            throw new Error('Error al crear la categoría');
        }
    }

    // Método para obtener todos los posts
    public async getAll({
        limit,
        offset = 0,
        estado,
        categoria_id,
        input,
        orderBy = 'id',
        orderDirection = 'ASC',
    }: {
        limit?: number;
        offset?: number;
        estado?: number;
        categoria_id?: number;
        input?: string;
        orderBy?: string;
        orderDirection?: 'ASC' | 'DESC';
    }) {
        const where: any = {};
        if (input) {
            where.descripcion = { [Op.like]: `%${input}%` };
        }
        if (estado !== undefined) where.estado = estado;
        if (categoria_id !== undefined) where.categoria_id = categoria_id;

        try {
            const { rows: data, count: total } = await PostBiblioteca.findAndCountAll({
                where,
                limit,
                offset,
                order: [[orderBy, orderDirection]],
                include: [{
                    model: CategoriaBiblioteca,
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

            const modifiedRows = data.map((row: any) => ({
                ...row.toJSON(),
                categoria: row.CategoriaBiblioteca?.nombre || null,
            }));

            return { data: modifiedRows, total };
        } catch (e) {
            console.error('Error al obtener los posts: ', e);
            throw new Error('Error al obtener los posts');
        }
    }

    // Método para crear un post
    public async create({
        categoria_id,
        fecha,
        descripcion,
        estado = 0,
        archivo,
    }: {
        categoria_id: number;
        fecha: Date;
        descripcion: string;
        estado?: number;
        archivo?: string;
    }) {
        try {
            const result = await PostBiblioteca.create({
                categoria_id,
                fecha,
                descripcion,
                estado,
                archivo,
            });
            return result;
        } catch (e) {
            console.error('Error al crear el post: ', e);
            throw new Error('Error al crear el post');
        }
    }

    // Método para actualizar un post
    public async update({
        id,
        categoria_id,
        fecha,
        descripcion,

        archivo,
    }: {
        id: number;
        categoria_id: number;
        fecha: Date;
        descripcion: string;

        archivo?: string;
    }) {
        try {
            await PostBiblioteca.update({
                categoria_id,
                fecha,
                descripcion,
                archivo,
            }, {
                where: { id },
            });
        } catch (e) {
            console.error('Error al actualizar el post: ', e);
            throw new Error('Error al actualizar el post');
        }
    }

    // Método para cambiar el estado de un post
    public async setActive({ id, estado }: { id: number; estado: number }) {
        try {
            await PostBiblioteca.update({ estado }, {
                where: { id },
            });
        } catch (e) {
            console.error('Error al cambiar el estado del post: ', e);
            throw new Error('Error al cambiar el estado del post');
        }
    }

    // Método para eliminar un post
    public async delete({ id }: { id: number }) {
        try {
            await PostBiblioteca.destroy({
                where: { id },
            });
        } catch (e) {
            console.error('Error al eliminar el post: ', e);
            throw new Error('Error al eliminar el post');
        }
    }
}

export default new BibliotecaModel();