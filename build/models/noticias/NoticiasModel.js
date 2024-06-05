"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = require("../../db/Database");
class NoticiasModel {
    async getAll({ titulo = undefined, input = undefined, fecha = undefined, limit = undefined, offset = 0, orderBy = "orden", // Campo por defecto para ordenar
    orderDirection = "ASC", // Dirección por defecto para ordenar
     }) {
        console.log(input, "input");
        console.log(limit, "limit");
        let query = `SELECT n.id, i.imageUrl AS imageUrl, DATE_FORMAT(n.date, '%d-%m-%Y') AS date, n.title, n.description, n.cantFotos, n.body, n.orden, n.estado FROM noticias n LEFT JOIN imagenes i ON n.id = i.noticia_id `;
        let queryParams = [];
        let queryCount = `SELECT COUNT(*) as total from noticias`;
        let queryParamsCount = [];
        let whereClauses = [];
        if (input) {
            whereClauses.push(`title LIKE ?`);
            const searchPattern = `%${input}%`;
            queryParams.push(searchPattern);
            queryParamsCount.push(searchPattern);
        }
        if (whereClauses.length > 0) {
            const whereString = whereClauses.join(" AND ");
            query += ` WHERE ${whereString}`;
            queryCount += ` WHERE ${whereString}`;
        }
        query += "GROUP BY n.id ";
        if (orderBy) {
            query += ` ORDER BY ${orderBy} ${orderDirection} `;
        }
        if (limit) {
            query += ` LIMIT ?`;
            queryParams.push(limit);
            if (offset) {
                query += ` OFFSET ?`;
                queryParams.push(offset);
            }
        }
        const conn = await Database_1.db.getConnection();
        try {
            const [data] = await conn.query(query, queryParams);
            const [total] = await conn.query(`SELECT COUNT(*) as total from noticias`);
            return { data, total };
        }
        catch (e) {
            throw (new Error("error en la db al obtener los datos"), e);
        }
        finally {
            conn.release();
        }
    }
    async create({ date, title, description, cantFotos = 0, body, orden, }) {
        const conn = await Database_1.db.getConnection();
        try {
            const [result] = await conn.query("INSERT INTO noticias (date,title,description,cantFotos,body,orden) VALUES (?,?,?,?,?,?)", [date, title, description, cantFotos, body, orden]);
            if ("insertId" in result) {
                return result.insertId;
            }
            else {
                throw new Error("Error al obtener el ID insertado");
            }
        }
        catch (e) {
            throw (new Error("error en al db"), e);
        }
        finally {
            conn.release();
        }
    }
    async createImagesRegister({ id_noticia, filePaths = [], }) {
        const conn = await Database_1.db.getConnection();
        if (filePaths.length === 0) {
            throw new Error("No file paths provided");
        }
        // Construir la parte del query de VALUES (?, ?), (?, ?), ...
        let query = "INSERT INTO imagenes (noticia_id, imageUrl) VALUES ";
        const queryParts = [];
        const queryValues = [];
        // Crear las partes del query y los valores
        filePaths.forEach((filePath) => {
            queryParts.push("(?, ?)");
            queryValues.push(id_noticia, filePath);
        });
        // Unir las partes del query
        query += queryParts.join(", ");
        // Ejecutar el query
        try {
            await conn.query(query, queryValues);
        }
        catch (error) {
            console.error("Error al insertar imágenes:", error);
            throw error;
        }
        finally {
            conn.release();
        }
    }
    async getByid({ id }) {
        let query = `SELECT 
    n.id AS noticia_id,
    DATE_FORMAT(n.date, '%d-%m-%Y') AS date,
    DATE_FORMAT(n.date, '%Y-%m-%d') AS fecha_edit,
    n.title,
    n.description,
    n.cantFotos,
    n.body,
    n.orden,
    n.estado,
    GROUP_CONCAT(i.imageUrl SEPARATOR ';') AS imagenes
FROM 
    noticias n
LEFT JOIN 
    imagenes i ON n.id = i.noticia_id
WHERE 
    n.id = ?
GROUP BY 
    n.id, n.date, n.title, n.description, n.cantFotos, n.body, n.orden, n.estado`;
        const conn = await Database_1.db.getConnection();
        console.log(query);
        try {
            const [data] = await conn.query(query, [id]);
            return { data };
        }
        catch (e) {
            throw (new Error("error en la db al obtener los datos"), e);
        }
        finally {
            conn.release();
        }
    }
    async setActive({ id, estado }) {
        const conn = await Database_1.db.getConnection();
        try {
            await conn.query("UPDATE noticias SET estado = ? WHERE id = ?", [
                estado,
                id,
            ]);
        }
        catch (e) {
            throw (new Error("Error al publicar la noticia"), e);
        }
        finally {
            conn.release();
        }
    }
}
exports.default = new NoticiasModel();
