import { db } from "../../db/Database";

class PersonalModel {
  public async getAll({
    limit = undefined,
    offset = 0,
    input = "",
    estado = undefined,
    area = undefined,
    orderBy = "id", // Campo por defecto para ordenar
    orderDirection = "ASC", // Dirección por defecto para ordenar
  }: {
    limit?: number;
    offset?: number;
    input?: string;
    estado?: string;
    area?: number;
    orderBy?: string;
    orderDirection?: "ASC" | "DESC";
  }) {
    let queryParams: any = [];
    let queryParamsCount: any = [];

    let query = `SELECT p.id, CONCAT(p.nombre, ' ', p.apellido) AS nombre, p.telefono, p.email, p.cargo, p.estado, a.title AS area 
                       FROM personal p 
                       JOIN areas a ON p.area = a.id`;
    let queryCount = `SELECT COUNT(*) AS total FROM personal p 
                          JOIN areas a ON p.area = a.id`;

    let whereClauses = [];

    if (input) {
      whereClauses.push(
        `(p.nombre LIKE ? OR p.apellido LIKE ? OR p.telefono LIKE ? OR p.cargo LIKE ?)`
      );
      const searchPattern = `%${input}%`;
      queryParams.push(
        searchPattern,
        searchPattern,
        searchPattern,
        searchPattern
      );
      queryParamsCount.push(
        searchPattern,
        searchPattern,
        searchPattern,
        searchPattern
      );
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
    console.log(query);
    console.log(queryParams);
    const conn = await db.getConnection();
    try {
      const [data] = await conn.query(query, queryParams);
      const [total] = await conn.query(queryCount, queryParamsCount);
      /* console.log(data, total);
      console.log("model",estado) */
      return { data, total };
    } catch (e) {
      throw new Error("Hubo un error con la db");
    } finally {
      conn.release();
    }
  }
  public async create({
    nombre,
    apellido,
    telefono,
    email,
    cargo,
    area,
  }: {
    nombre: string;
    apellido: string;
    telefono?: number;
    email?: string;
    cargo: string;
    area: number;
  }) {
    let fields = ["nombre", "apellido", "cargo", "area"];
    let values = ["?", "?", "?", "?"];
    let queryParams = [nombre, apellido, cargo, area];

    if (telefono !== undefined) {
      fields.push("telefono");
      values.push("?");
      queryParams.push(telefono);
    }

    if (email !== undefined) {
      fields.push("email");
      values.push("?");
      queryParams.push(email);
    }

    const query = `INSERT INTO personal (${fields.join(
      ", "
    )}) VALUES (${values.join(", ")})`;
    console.log(query);
    console.log(queryParams);
    const conn = await db.getConnection();
    try {
      const result = await conn.query(query, queryParams);
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
      await conn.query("UPDATE personal SET estado = ? WHERE id = ?", [
        estado,
        id,
      ]);
    } catch (e) {
      throw (new Error("Error al activar el área"), e);
    } finally {
      conn.release();
    }
  }
  public async delete({ id }: { id: number }) {
    const conn = await db.getConnection();
    try {
      const result = await conn.query("DELETE FROM personal WHERE id = ?", [
        id,
      ]);
    } catch (e) {
      throw (new Error("Error al eliminar el personal"), e);
    } finally {
      conn.release();
    }
  }
  public async update({
    id,
    nombre,
    apellido,
    telefono,
    email,
    cargo,
    area,
  }: {
    id: number;
    nombre: string;
    apellido: string;
    telefono?: number;
    email?: string;
    cargo: string;
    area: number;
  }) {
    let fields = ["nombre", "apellido", "cargo", "area"];
    let values = ["?", "?", "?", "?", "?"];
    let queryParams = [nombre, apellido, cargo, area];

    if (telefono !== undefined) {
      fields.push("telefono");
      values.push("?");
      queryParams.push(telefono);
    }

    if (email !== undefined) {
      fields.push("email");
      values.push("?");
      queryParams.push(email);
    }

    const query = `UPDATE personal (${fields.join(", ")}) VALUES (${values.join(
      ", "
    )}) where id = ?`;
    console.log(query);
    console.log(queryParams);
    const conn = await db.getConnection();
    try {
      const result = await conn.query(query, queryParams);
      return result;
    } catch (e) {
      console.error(e);
      throw new Error("Hubo un error con la db");
    } finally {
      conn.release();
    }
  }
}

export default new PersonalModel();
