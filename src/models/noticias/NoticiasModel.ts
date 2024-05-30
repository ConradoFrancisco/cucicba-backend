import { db } from "../../db/Database";

class NoticiasModel {
    public async getAll({
        titulo = undefined,
        fecha = undefined
    }: {
        titulo?: string;
        fecha?: string
    }) {
        const conn = await db.getConnection();
        try {
            const [data] = await conn.query(`SELECT n.id, i.imageUrl AS imageUrl, DATE_FORMAT(n.date, '%d-%m-%Y') AS date, n.title, n.description, n.cantFotos, n.body, n.orden, n.estado FROM noticias n LEFT JOIN imagenes i ON n.id = i.noticia_id GROUP BY n.id ORDER BY i.id ASC;`)
            const [total] = await conn.query(`SELECT COUNT(*) as total from noticias`)
            return { data, total }
        } catch (e) {
            throw new Error("error en la db al obtener los datos"), e
        } finally {
            conn.release();
        }
    }
    public async create({
        date,
        title,
        description,
        cantFotos = 0,
        body,
        orden,

    }: {
        date: string,
        title: string,
        description: string,
        cantFotos?: number,
        body: string,
        orden: number,
    }
    ) {
        const conn = await db.getConnection();
        try {
            const [result] = await conn.query("INSERT INTO noticias (date,title,description,cantFotos,body,orden) VALUES (?,?,?,?,?,?)", [date, title, description, cantFotos, body, orden])
            if ('insertId' in result) {
                return result.insertId;
            } else {
                throw new Error('Error al obtener el ID insertado');
            }
        } catch (e) {
            throw new Error("error en al db"), e
        } finally {
            conn.release();
        }
    }
    public async createImagesRegister({ id_noticia, filePaths = [] }: { id_noticia: number, filePaths: string[] }) {
        const conn = await db.getConnection()
        if (filePaths.length === 0) {
            throw new Error('No file paths provided');
        }
        // Construir la parte del query de VALUES (?, ?), (?, ?), ...
        let query = 'INSERT INTO imagenes (noticia_id, imageUrl) VALUES ';
        const queryParts: string[] = [];
        const queryValues: any[] = [];

        // Crear las partes del query y los valores
        filePaths.forEach(filePath => {
            queryParts.push('(?, ?)');
            queryValues.push(id_noticia, filePath);
        });
        // Unir las partes del query
        query += queryParts.join(', ');
        // Ejecutar el query
        try {
            await conn.query(query, queryValues);
        } catch (error) {
            console.error('Error al insertar imágenes:', error);
            throw error;
        }finally{
            conn.release();
        }
    }

}
export default new NoticiasModel();