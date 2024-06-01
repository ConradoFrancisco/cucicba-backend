import { db } from "../../../db/Database";

class PreguntasFrecuentesModel {
  public async getPreguntas({
    limit = undefined,
    offset = 0,
    estado = undefined,
    category = undefined,
    input = undefined,
    orderBy = "id", // Campo por defecto para ordenar
    orderDirection = "ASC", // Dirección por defecto para ordenar
  }: {
    estado?: number;
    limit?: number;
    offset?: number;
    category?: number;
    input?: string;
    orderBy?: string;
    orderDirection?: "ASC" | "DESC";
  }) {
    let query = `SELECT pf.id as id, pf.pregunta, pf.estado, pf.respuesta, pfc.titulo AS categoria, pfc.id as categoria_id
    FROM preguntas_frecuentes pf
    INNER JOIN preguntas_frecuentes_categorias pfc ON pf.categoria_id = pfc.id`;
    let queryCount = `SELECT COUNT(*) AS total, pf.pregunta AS pregunta 
    FROM preguntas_frecuentes pf 
    JOIN preguntas_frecuentes_categorias pfc ON pf.categoria_id = pfc.id `;
    let whereClauses = [];
    let queryParams: any = [];
    let queryParamsCount: any = [];
    if (input) {
      whereClauses.push(
        `pf.pregunta LIKE ?`
      );
      const searchPattern = `%${input}%`;
      queryParams.push(
        searchPattern,
      );
      queryParamsCount.push(
        searchPattern,
      );
    }

    if (estado !== undefined) {
      whereClauses.push(`pf.estado = ?`);
      queryParams.push(estado);
      queryParamsCount.push(estado);
    }
    if (category !== undefined) {
      whereClauses.push(`pf.categoria_id = ?`);
      queryParams.push(category);
      queryParamsCount.push(category);
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
    console.log(category)
    const conn = await db.getConnection();


    try {
      const [data] = await conn.query(query, queryParams);
      const [total] = await conn.query(queryCount, queryParamsCount);
      return { data, total };
    } catch (e) {
      throw (
        (new Error(
          "No se pudieron obtener las preguntas frecuentes, intente de nuevo mas tarde: "
        ),
          e)
      );
    } finally {
      conn.release();
    }
  }

  public async getCategorys() {
    const conn = await db.getConnection();
    try {
      const [data] = await conn.query(
        "SELECT * FROM preguntas_frecuentes_categorias"
      );
      return data;
    } catch (e) {
      console.error("error al obtener las categorias: ", e);
    } finally {
      conn.release();
    }
  }
  public async create({
    pregunta,
    respuesta,
    categoria,
  }: {
    pregunta: string;
    respuesta: string;
    categoria: number;
  }) {
    const conn = await db.getConnection();
    try {
      await conn.query("INSERT INTO preguntas_frecuentes (pregunta,respuesta,categoria_id) VALUES (?,?,?)", [pregunta, respuesta, categoria])
    } catch (e) {
      console.log(e)
      throw new Error("Error en la db al ingresar la pregunta frecuente")
    }
  }
  public async update({
    id,
    pregunta,
    respuesta,
    categoria,
  }: {
    id: number
    pregunta: string;
    respuesta: string;
    categoria: number;
  }) {
    const query = "UPDATE preguntas_frecuentes set pregunta = ? , respuesta = ?, categoria_id = ? WHERE id = ?";
    const queryParams = [pregunta, respuesta, categoria, id]
    const conn = await db.getConnection();
    try {
      await conn.query(query, queryParams)
    } catch (e) {
      console.log(e)
      throw new Error("Error en la db al ingresar la pregunta frecuente")
    } finally {
      conn.release();
    }
  }
  public async setActive({ id, estado }: { id: number; estado: number }) {
    const conn = await db.getConnection();
    try {
      await conn.query("UPDATE preguntas_frecuentes SET estado = ? WHERE id = ?", [
        estado,
        id,
      ]);
    } catch (e) {
      throw (new Error("Error al activar la pregunta frecuente"));
    } finally {
      conn.release();
    }
  }
  public async delete({ id }: { id: number }) {
    const conn = await db.getConnection();
    try {
      const result = await conn.query("DELETE FROM preguntas_frecuentes WHERE id = ?", [
        id,
      ]);
    } catch (e) {
      throw (new Error("Error al eliminar el la pregunta"), e);
    } finally {
      conn.release();
    }
  }
}

export default new PreguntasFrecuentesModel();
