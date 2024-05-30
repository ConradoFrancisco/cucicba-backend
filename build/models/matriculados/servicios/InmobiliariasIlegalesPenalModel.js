"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = require("../../../db/Database");
class InmobiliariasIlegalesPenalModel {
    async getAll({ limit = undefined, offset = 0, input = "", estado = undefined, fecha = undefined, orderBy = "id", // Campo por defecto para ordenar
    orderDirection = "ASC", // Dirección por defecto para ordenar
     }) {
        let queryParams = [];
        let queryParamsCount = [];
        let query = "SELECT * FROM InmobiliariasIlegales where causa = 1";
        let queryCount = "SELECT COUNT(*) AS total FROM InmobiliariasIlegales where causa = 1";
        let whereClauses = [];
        if (input) {
            whereClauses.push(`(a.nombre LIKE ? OR a.apellido LIKE ?)`);
            const searchPattern = `%${input}%`;
            queryParams.push(searchPattern, searchPattern);
            queryParamsCount.push(searchPattern, searchPattern);
        }
        if (estado !== undefined) {
            whereClauses.push(`a.estado = ?`);
            queryParams.push(estado);
            queryParamsCount.push(estado);
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
            /* console.log(data, total);
            console.log("model",estado) */
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
    async getAllNoCausa({ limit = undefined, offset = 0, input = "", estado = undefined, fecha = undefined, orderBy = "id", // Campo por defecto para ordenar
    orderDirection = "ASC", // Dirección por defecto para ordenar
     }) {
        let queryParams = [];
        let queryParamsCount = [];
        let query = "SELECT * FROM InmobiliariasIlegales where causa = 0";
        let queryCount = "SELECT COUNT(*) AS total FROM InmobiliariasIlegales where causa = 0";
        let whereClauses = [];
        if (input) {
            whereClauses.push(`(a.nombre LIKE ? OR a.apellido LIKE ?)`);
            const searchPattern = `%${input}%`;
            queryParams.push(searchPattern, searchPattern);
            queryParamsCount.push(searchPattern, searchPattern);
        }
        if (estado !== undefined) {
            whereClauses.push(`a.estado = ?`);
            queryParams.push(estado);
            queryParamsCount.push(estado);
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
            /* console.log(data, total);
            console.log("model",estado) */
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
    async create({ nombre, direcion, fecha, causa = 1, }) {
        const conn = await Database_1.db.getConnection();
        try {
            const result = await conn.query("INSERT INTO InmobiliariasIlegales (nombre,direccion,fecha,causa) VALUES (?,?,?,?)", [nombre, direcion, fecha, causa]);
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
            await conn.query("UPDATE InmobiliariasIlegales SET estado = ? WHERE id = ?", [
                estado,
                id,
            ]);
        }
        catch (e) {
            throw (new Error("Error al publicar la inmobiliaria ilegall"), e);
        }
        finally {
            conn.release();
        }
    }
    async delete({ id }) {
        const conn = await Database_1.db.getConnection();
        try {
            const result = await conn.query("DELETE FROM InmobiliariasIlegales WHERE id = ?", [
                id,
            ]);
        }
        catch (e) {
            throw (new Error("Error al eliminar la inmobiliaria ilegal"), e);
        }
        finally {
            conn.release();
        }
    }
    async update({ id, nombre, direcion, fecha, causa = 1, }) {
        const conn = await Database_1.db.getConnection();
        let params = { nombre, direcion, fecha, causa };
        let queryFragments = [];
        let queryParams = [];
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined) {
                queryFragments.push(`${key} = ?`);
                queryParams.push(value);
            }
        });
        const query = `UPDATE InmobiliariasIlegales SET ${queryFragments.join(", ")} WHERE id = ?`;
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
}
exports.default = new InmobiliariasIlegalesPenalModel();
