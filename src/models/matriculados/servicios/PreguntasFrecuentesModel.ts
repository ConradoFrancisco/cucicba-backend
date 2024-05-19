import { db } from "../../../db/Database";

class PreguntasFrecuentesModel {
  public async getPreguntas({
    limit = undefined,
    offset = 0,
    category = undefined,
    input = undefined,
  }: {
    limit?: number;
    offset?: number;
    category?: number;
    input?: string;
  }) {
    let categorytxt = "";
    let inputTxt = "";
    let limitTxt = "";
    let offsetTxt = "";
    let queryParams = [];
    if (category) {
      categorytxt = "WHERE categoria_id = ?";
      queryParams.push(category);
    }
    if (limit) {
      limitTxt = "LIMIT ?";
      queryParams.push(limit);
    }
    if (offset) {
      offsetTxt = "OFFSET ?";
      queryParams.push(offset);
    }
    const conn = await db.getConnection();

    const query = `SELECT * FROM preguntas_frecuentes ${categorytxt} ${limitTxt} ${offsetTxt}`;
    console.log(query);
    console.log(queryParams)
    try {
      const [data] = await conn.query(query, queryParams);
      return data;
    } catch (e) {
      throw new Error(
        "No se pudieron obtener las preguntas frecuentes, intente de nuevo mas tarde"
      );
    } finally {
      conn.release();
    }
  }
}

export default new PreguntasFrecuentesModel();
