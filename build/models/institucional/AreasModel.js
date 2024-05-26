"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = require("../../db/Database");
class AreasModel {
    async getAll({ limit = undefined, offset = 0, input = undefined, estado = undefined, orden = undefined, orderBy = 'id', orderDirection = 'ASC' }) {
        let whereClauses = [];
        let queryParams = [];
        let queryParamsCount = [];
        // Añadir condiciones basadas en los filtros proporcionados
        if (input) {
            whereClauses.push(`title LIKE ?`);
            queryParams.push(`%${input}%`);
            queryParamsCount.push(`%${input}%`);
        }
        if (estado !== undefined) {
            whereClauses.push(`estado = ?`);
            queryParams.push(estado);
            queryParamsCount.push(estado);
        }
        if (orden !== undefined) {
            whereClauses.push(`orden = ?`);
            queryParams.push(orden);
            queryParamsCount.push(orden);
        }
        // Construir la parte WHERE de la consulta
        let whereTxt = whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";
        let orderTxt = `ORDER BY ${orderBy} ${orderDirection}`;
        let limitTxt = "";
        let offsetTxt = "";
        if (limit) {
            limitTxt = "LIMIT ?";
            queryParams.push(limit);
            queryParamsCount.push(limit);
            if (offset) {
                offsetTxt = "OFFSET ?";
                queryParams.push(offset);
            }
        }
        const conn = await Database_1.db.getConnection();
        try {
            const query = `SELECT * FROM areas ${whereTxt} ${orderTxt} ${limitTxt} ${offsetTxt}`;
            const queryCount = `SELECT COUNT(*) AS total FROM areas ${whereTxt}`;
            /* console.log(query);
            console.log(queryParams); */
            const [data] = await conn.query(query, queryParams);
            const [total] = await conn.query(queryCount, queryParamsCount);
            console.log("query:", queryCount);
            console.log("queryparams:", queryParamsCount);
            console.log("total:", total);
            return { data, total };
        }
        catch (e) {
            e;
            throw new Error("no se pudo conectar a la base de datos, intentelo mas tarde");
        }
        finally {
            conn.release();
        }
    }
    async create({ title, orden }) {
        const conn = await Database_1.db.getConnection();
        try {
            await conn.query("INSERT INTO areas (title,orden) VALUES (?,?)", [
                title,
                orden,
            ]);
            console.log("ingresado a la db");
        }
        catch (e) {
            throw (new Error("Error al crear el área"), e);
        }
        finally {
            conn.release();
        }
    }
    async setActive({ id, estado }) {
        const conn = await Database_1.db.getConnection();
        try {
            await conn.query("UPDATE areas SET estado = ? WHERE id = ?", [
                estado,
                id,
            ]);
        }
        catch (e) {
            throw (new Error("Error al activar el área"), e);
        }
        finally {
            conn.release();
        }
    }
    async update({ id, title, orden, }) {
        const conn = await Database_1.db.getConnection();
        try {
            await conn.query("UPDATE areas SET title = ?, orden = ? WHERE id = ?", [
                title,
                orden,
                id,
            ]);
        }
        catch (e) {
            throw (new Error("Error al modificar el área"), e);
        }
        finally {
            conn.release();
        }
    }
    async delete({ id }) {
        const conn = await Database_1.db.getConnection();
        try {
            const result = await conn.query("DELETE FROM areas WHERE id = ?", [id]);
        }
        catch (e) {
            throw (new Error("Error al eliminar el área"), e);
        }
        finally {
            conn.release();
        }
    }
    async getAreasNames() {
        const conn = await Database_1.db.getConnection();
        try {
            const [data] = await conn.query("select id,title from areas");
            return data;
        }
        catch (e) {
            throw (new Error("Error al conseguir las areas"));
        }
        finally {
            conn.release();
        }
    }
}
exports.default = new AreasModel();
