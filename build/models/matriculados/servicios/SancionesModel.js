"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = require("../../../db/Database");
class SancionesModel {
    async getAll({ limit = undefined, offset = 0, input = "", estado = undefined, fecha = undefined, categoria = undefined, orderBy = "id", // Campo por defecto para ordenar
    orderDirection = "ASC", // Dirección por defecto para ordenar
     }) {
        let queryParams = [];
        let queryParamsCount = [];
        let query = "select st.id as id, cs.nombre as categoria,st.categoria_sancion_id as categoria_id, st.fecha as fecha, st.descripcion as descripcion,st.estado as estado, st.pdf as pdf from sanciones_tribunal st join categoria_sanciones cs on st.categoria_sancion_id = cs.id";
        let queryCount = "SELECT COUNT(*) AS total FROM sanciones_tribunal join categoria_sanciones st on categoria_sancion_id = st.id";
        let whereClauses = [];
        if (input) {
            whereClauses.push(`(descripcion LIKE ?)`);
            const searchPattern = `%${input}%`;
            queryParams.push(searchPattern);
            queryParamsCount.push(searchPattern);
        }
        if (estado !== undefined) {
            whereClauses.push(`estado = ?`);
            queryParams.push(estado);
            queryParamsCount.push(estado);
        }
        if (categoria) {
            whereClauses.push(`categoria_sancion_id = ?`);
            queryParams.push(categoria);
            queryParamsCount.push(categoria);
        }
        if (whereClauses.length > 0) {
            const whereString = whereClauses.join(" AND ");
            query += ` WHERE ${whereString}`;
            queryCount += ` WHERE ${whereString}`;
        }
        if (orderBy) {
            query += ` ORDER BY ${orderBy} ${orderDirection}`;
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
        console.log(query);
        try {
            const [data] = await conn.query(query, queryParams);
            const [total] = await conn.query(queryCount, queryParamsCount);
            return { data, total };
        }
        catch (e) {
            console.log(e);
            throw new Error("Hubo un error con la db");
        }
        finally {
            conn.release();
        }
    }
    async create({ categoria, descripcion, fecha, pdf = '', }) {
        const conn = await Database_1.db.getConnection();
        try {
            const result = await conn.query("INSERT INTO sanciones_tribunal (categoria_sancion_id,descripcion,fecha,pdf) VALUES (?,?,?,?)", [categoria, descripcion, fecha, pdf]);
            return result;
        }
        catch (e) {
            console.error(e);
            throw new Error("Hubo un error con la db");
        }
        finally {
            conn.release();
        }
    }
    async setActive({ id, estado }) {
        const conn = await Database_1.db.getConnection();
        try {
            await conn.query("UPDATE sanciones_tribunal SET estado = ? WHERE id = ?", [
                estado,
                id,
            ]);
        }
        catch (e) {
            throw (new Error("Error al publicar la sancion"), e);
        }
        finally {
            conn.release();
        }
    }
    async delete({ id }) {
        const conn = await Database_1.db.getConnection();
        try {
            const result = await conn.query("DELETE FROM sanciones_tribunal WHERE id = ?", [
                id,
            ]);
        }
        catch (e) {
            throw (new Error("Error al eliminar la sancion"), e);
        }
        finally {
            conn.release();
        }
    }
    async update({ id, categoria_sancion_id, descripcion, fecha, pdf = '', }) {
        const conn = await Database_1.db.getConnection();
        let params = { categoria_sancion_id, descripcion, fecha, pdf };
        let queryFragments = [];
        let queryParams = [];
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined) {
                queryFragments.push(`${key} = ?`);
                queryParams.push(value);
            }
        });
        const query = `UPDATE sanciones_tribunal SET ${queryFragments.join(", ")} WHERE id = ?`;
        console.log(query);
        // Agregar el id al final de los parámetros
        queryParams.push(id);
        try {
            await conn.query(query, queryParams);
        }
        catch (e) {
            throw (new Error("Error al modificar el área"), e);
        }
        finally {
            conn.release();
        }
    }
    async getCategorys() {
        const conn = await Database_1.db.getConnection();
        try {
            const [data] = await conn.query("select * from categoria_sanciones");
            return data;
        }
        catch (e) {
            throw new Error("error en la db al obtener las categorias");
        }
        finally {
            conn.release();
        }
    }
}
exports.default = new SancionesModel();
