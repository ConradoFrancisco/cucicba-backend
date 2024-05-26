"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = require("../db/Database");
class AutoridadesModel {
    async getAll({ limit = undefined, offset = 0, input = "", estado = undefined, area = undefined, orderBy = "a.id", // Campo por defecto para ordenar
    orderDirection = "ASC", // Dirección por defecto para ordenar
     }) {
        let queryParams = [];
        let queryParamsCount = [];
        let query = `SELECT a.id AS autoridad_id,a.estado as estado, a.nombre AS Nombre, a.apellido as Apellido, a.avatar AS avatar_autoridad, p.id AS puesto_id, p.nombre AS puesto FROM autoridades a JOIN autoridades_puestos p ON a.puesto_id = p.id`;
        let queryCount = "SELECT COUNT(*) AS total FROM autoridades a JOIN autoridades_puestos p ON a.puesto_id = p.id;";
        let whereClauses = [];
        if (input) {
            whereClauses.push(`(p.nombre LIKE ? OR p.apellido LIKE ? OR p.telefono LIKE ? OR p.cargo LIKE ?)`);
            const searchPattern = `%${input}%`;
            queryParams.push(searchPattern, searchPattern, searchPattern, searchPattern);
            queryParamsCount.push(searchPattern, searchPattern, searchPattern, searchPattern);
        }
        if (estado !== undefined) {
            whereClauses.push(`p.estado = ?`);
            queryParams.push(estado);
            queryParamsCount.push(estado);
        }
        if (area !== undefined) {
            whereClauses.push(`p.area = ?`);
            queryParams.push(area);
            queryParamsCount.push(area);
        }
        if (whereClauses.length > 0) {
            const whereString = whereClauses.join(" AND ");
            query += ` WHERE ${whereString}`;
            queryCount += ` WHERE ${whereString}`;
        }
        /* if (orderBy) {
          query += ` ORDER BY ${orderBy} ${orderDirection}`;
        } */
        if (limit) {
            query += ` LIMIT ?`;
            queryParams.push(limit);
            if (offset) {
                query += ` OFFSET ?`;
                queryParams.push(offset);
            }
        }
        console.log(query);
        console.log(queryParams);
        const conn = await Database_1.db.getConnection();
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
    async getCargos() {
        const conn = await Database_1.db.getConnection();
        try {
            const [data] = await conn.query("SELECT * FROM autoridades_puestos");
            return data;
        }
        catch (e) {
            throw new Error("Error al obtener los cargos");
        }
        finally {
            conn.release();
        }
    }
}
exports.default = new AutoridadesModel();
