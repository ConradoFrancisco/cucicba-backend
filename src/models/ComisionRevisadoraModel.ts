import { db } from "../db/Database";

class ComisionRevisadoraModel {
    public async getAll({
        limit = undefined,
        offset = 0,
        input = "",
        estado = undefined,
        posicion = undefined,
        orden = undefined,
        orderBy = "a.nombre", // Campo por defecto para ordenar
        orderDirection = "DESC", // Dirección por defecto para ordenar
    }: {
        limit?: number;
        offset?: number;
        input?: string;
        estado?: string;
        orden?: number;
        posicion?: string;
        orderBy?: string;
        puesto_id?: number
        orderDirection?: "ASC" | "DESC";
    }) {
        const conn = await db.getConnection()
        let query = ("SELECT * FROM comision_revisadora")
        let queryParams: any[] = []
        let queryParamsCount: any[] = []
        let whereClauses = [];

        let queryCount = ("SELECT COUNT(*) as total FROM comision_revisadora");
        if (input) {
            whereClauses.push(`(nombre LIKE ? OR apellido LIKE ?)`);
            const searchPattern = `%${input}%`;
            queryParams.push(searchPattern, searchPattern);
            queryParamsCount.push(searchPattern, searchPattern);
        }
        if (posicion) {
            whereClauses.push(`posicion = ?`)
            queryParams.push(posicion);
            queryParamsCount.push(posicion);
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

        if (whereClauses.length > 0) {
            const whereString = whereClauses.join(" AND ");
            query += ` WHERE ${whereString}`;
            queryCount += ` WHERE ${whereString}`;
        }
        if (orderBy) {
            query += ` ORDER BY ${orderBy} ${orderDirection}`;
        }
        if (limit) {
            if (limit) {
                query += ` LIMIT ?`;
                queryParams.push(limit);
                if (offset) {
                    query += ` OFFSET ?`;
                    queryParams.push(offset);
                }
            }
        }
        console.log("aca", queryCount)
        console.log("aca", queryParamsCount)
        try {
            const [data] = await conn.query(query, queryParams);
            const [total] = await conn.query(queryCount,queryParamsCount)
            return { data, total }
        } catch (e) {
            console.log(e)
            throw new Error("Error en la db al conseguirlos datos del tribunal de ética y disciplina")
        } finally {
            conn.release();
        }
    }
    public async create({
        nombre,
        apellido,
        orden,
        posicion
    }: {
        nombre: string;
        apellido: string;
        orden: number;
        posicion: string
    }) {
        const conn = await db.getConnection();
        try {
            const result = await conn.query(
                "INSERT INTO comision_revisadora (nombre,apellido,orden,posicion) VALUES (?,?,?,?)",
                [nombre, apellido, orden, posicion]
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
            await conn.query("UPDATE comision_revisadora SET estado = ? WHERE id = ?", [
                estado,
                id,
            ]);
        } catch (e) {
            throw (new Error("Error al activar la autoridad"), e);
        } finally {
            conn.release();
        }
    }
    public async delete({ id }: { id: number }) {
        const conn = await db.getConnection();
        try {
            await conn.query("DELETE FROM comision_revisadora WHERE id = ?", [
                id,
            ]);
        } catch (e) {
            throw (new Error("Error al eliminar la autoridad"));
        } finally {
            conn.release();
        }
    }
    public async update({
        id,
        nombre,
        apellido,
        orden,
        posicion
    }: {
        id: number;
        nombre?: string;
        apellido?: string;
        orden?: number;
        posicion?: string
    }) {
        const conn = await db.getConnection();
        let params = { nombre, apellido, orden, posicion };
        let queryFragments: string[] = [];
        let queryParams = [];
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined) {
                queryFragments.push(`${key} = ?`);
                queryParams.push(value);
            }
        });
        const query = `UPDATE comision_revisadora SET ${queryFragments.join(
            ", "
        )} WHERE id = ?`;
       
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
export default new ComisionRevisadoraModel();