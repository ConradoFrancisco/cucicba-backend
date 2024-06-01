import { db } from "../../../db/Database";


class InmobiliariasIlegalesPenalModel {
    public async getAll({
        limit = undefined,
        offset = 0,
        input = "",
        estado = undefined,
        fecha = undefined,
        orderBy = "id", // Campo por defecto para ordenar
        orderDirection = "ASC", // Dirección por defecto para ordenar
    }: {
        limit?: number;
        offset?: number;
        input?: string;
        fecha?: string;
        estado?: string;
        orderBy?: string;
        orderDirection?: "ASC" | "DESC";
    }) {
        let queryParams: any = [];
        let queryParamsCount: any = [];

        let query = "SELECT id,nombre,direccion, DATE_FORMAT(fecha, '%d-%m-%Y') as fecha,DATE_FORMAT(fecha, '%Y-%m-%d') as fecha_edit,estado FROM InmobiliariasIlegales"
        let queryCount =
            "SELECT COUNT(*) AS total FROM InmobiliariasIlegales ";

        let whereClauses = ["causa = 1"];

        if (input) {
            whereClauses.push(`(nombre LIKE ? OR direccion LIKE ?)`);
            const searchPattern = `%${input}%`;
            queryParams.push(searchPattern, searchPattern);
            queryParamsCount.push(searchPattern, searchPattern);
        }

        if (estado !== undefined) {
            whereClauses.push(`estado = ?`);
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
        const conn = await db.getConnection();
        console.log(query);
        try {
            const [data] = await conn.query(query, queryParams);
            const [total] = await conn.query(queryCount, queryParamsCount);
            /* console.log(data, total);
            console.log("model",estado) */
            return { data, total };
        } catch (e) {
            console.log(e);
            throw new Error("Hubo un error con la db");
        } finally {
            conn.release();
        }
    }
    public async getAllNoCausa({
        limit = undefined,
        offset = 0,
        input = "",
        estado = undefined,
        fecha = undefined,
        orderBy = "id", // Campo por defecto para ordenar
        orderDirection = "ASC", // Dirección por defecto para ordenar
    }: {
        limit?: number;
        offset?: number;
        input?: string;
        fecha?: string;
        estado?: string;
        orderBy?: string;
        orderDirection?: "ASC" | "DESC";
    }) {
        let queryParams: any = [];
        let queryParamsCount: any = [];

        let query = "SELECT id,nombre,direccion, DATE_FORMAT(fecha, '%d-%m-%Y') as fecha,DATE_FORMAT(fecha, '%Y-%m-%d') as fecha_edit,estado FROM InmobiliariasIlegales"
        let queryCount =
            "SELECT COUNT(*) AS total FROM InmobiliariasIlegales ";

        let whereClauses = ["causa = 0"];

        if (input) {
            whereClauses.push(`(nombre LIKE ? OR direccion LIKE ?)`);
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
        const conn = await db.getConnection();
        console.log(query);
        try {
            const [data] = await conn.query(query, queryParams);
            const [total] = await conn.query(queryCount, queryParamsCount);
            return { data, total };
        } catch (e) {
            console.log(e);
            throw new Error("Hubo un error con la db");
        } finally {
            conn.release();
        }
    }
    public async create({
        nombre,
        direcion,
        fecha,
        causa = undefined,

    }: {
        nombre: string;
        direcion: string;
        fecha: string;
        causa?: number;

    }) {
        const conn = await db.getConnection();
        try {
            const result = await conn.query(
                "INSERT INTO InmobiliariasIlegales (nombre,direccion,fecha,causa) VALUES (?,?,?,?)",
                [nombre, direcion, fecha, causa]
            );
            return result;
        } catch (e) {
            console.error(e);
            throw new Error("Hubo un error con la db");
        } finally {
            conn.release();
        }
    }
    public async setActive({ id, estado }: { id: number; estado: number }) {
        const conn = await db.getConnection();
        try {
            await conn.query("UPDATE InmobiliariasIlegales SET estado = ? WHERE id = ?", [
                estado,
                id,
            ]);
        } catch (e) {
            throw (new Error("Error al publicar la inmobiliaria ilegall"), e);
        } finally {
            conn.release();
        }
    }
    public async delete({ id }: { id: number }) {
        const conn = await db.getConnection();
        try {
            const result = await conn.query("DELETE FROM InmobiliariasIlegales WHERE id = ?", [
                id,
            ]);
        } catch (e) {
            throw (new Error("Error al eliminar la inmobiliaria ilegal"), e);
        } finally {
            conn.release();
        }
    }
    public async update({
        id,
        nombre,
        direcion,
        fecha,
        causa = 1,

    }: {
        id: number;
        nombre: string;
        direcion: string;
        fecha: string;
        causa: number;

    }) {
        const conn = await db.getConnection();
        let params = { nombre, direcion, fecha, causa };
        let queryFragments: string[] = [];
        let queryParams = [];
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined) {
                queryFragments.push(`${key} = ?`);
                queryParams.push(value);
            }
        });
        const query = `UPDATE InmobiliariasIlegales SET ${queryFragments.join(
            ", "
        )} WHERE id = ?`;
        console.log(query);
        // Agregar el id al final de los parámetros
        queryParams.push(id);
        try {
            await conn.query(query, queryParams);
        } catch (e) {
            throw (new Error("Error al modificar el área"), e);
        } finally {
            conn.release();
        }
    }
}
export default new InmobiliariasIlegalesPenalModel();
