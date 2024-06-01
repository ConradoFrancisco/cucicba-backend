import { db } from "../db/Database";

class AutoridadesModel {
  public async getAll({
    limit = undefined,
    offset = 0,
    input = "",
    estado = undefined,
    orden = undefined,
    puesto_id = undefined,
    orderBy = "orden", // Campo por defecto para ordenar
    orderDirection = "DESC", // Dirección por defecto para ordenar
  }: {
    limit?: number;
    offset?: number;
    input?: string;
    estado?: string;
    orden?: number;
    orderBy?: string;
    puesto_id?:number
    orderDirection?: "ASC" | "DESC";
  }) {
    let queryParams: any = [];
    let queryParamsCount: any = [];

    let query = `SELECT a.id,a.estado as estado, a.nombre AS Nombre, a.apellido as Apellido,a.orden as Orden, a.avatar AS avatar_autoridad, p.id AS puesto_id, p.nombre AS puesto FROM autoridades a JOIN autoridades_puestos p ON a.puesto_id = p.id`;
    let queryCount =
      "SELECT COUNT(*) AS total FROM autoridades a JOIN autoridades_puestos p ON a.puesto_id = p.id";

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
    if (puesto_id !== undefined) {
      whereClauses.push(`a.puesto_id = ?`);
      queryParams.push(puesto_id);
      queryParamsCount.push(puesto_id);
    }
    if (orden !== undefined) {
      whereClauses.push(`a.orden = ?`);
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
  public async getCargos() {
    const conn = await db.getConnection();
    try {
      const [data] = await conn.query("SELECT * FROM autoridades_puestos");
      return data;
    } catch (e) {
      throw new Error("Error al obtener los cargos");
    } finally {
      conn.release();
    }
  }
  public async create({
    nombre,
    apellido,
    avatar,
    puesto,
    orden,
  }: {
    nombre: string;
    apellido: string;
    avatar: string;
    puesto: number;
    orden: number;
  }) {
    const conn = await db.getConnection();
    try {
      const result = await conn.query(
        "INSERT INTO autoridades (nombre,apellido,puesto_id,avatar,orden) VALUES (?,?,?,?,?)",
        [nombre, apellido, puesto, avatar, orden]
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
      await conn.query("UPDATE autoridades SET estado = ? WHERE id = ?", [
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
      const result = await conn.query("DELETE FROM autoridades WHERE id = ?", [
        id,
      ]);
    } catch (e) {
      throw (new Error("Error al eliminar el área"), e);
    } finally {
      conn.release();
    }
  }
  public async update({
    id,
    nombre,
    apellido,
    avatar,
    puesto_id,
    orden,
  }: {
    id: number;
    nombre?: string;
    apellido?: string;
    avatar?: string;
    puesto_id?: number;
    orden?: number;
  }) {
    const conn = await db.getConnection();
    let params = { nombre, apellido, avatar, puesto_id, orden };
    let queryFragments: string[] = [];
    let queryParams = [];
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryFragments.push(`${key} = ?`);
        queryParams.push(value);
      }
    });
    const query = `UPDATE autoridades SET ${queryFragments.join(
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
export default new AutoridadesModel();
