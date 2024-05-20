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
    let queryParamsCount = [];
    let queryParams = [];
    if (category) {
      categorytxt = `WHERE categoria_id = ${category}`;
      queryParams.push(category);
      queryParamsCount.push(category);
    }
    if (limit) {
      limitTxt = "LIMIT ?";
      queryParams.push(limit);
      if (offset) {
        offsetTxt = "OFFSET ?";
        queryParams.push(offset);
      }
    }

    const conn = await db.getConnection();

    const queryCount = `SELECT COUNT(*) AS total FROM preguntas_frecuentes ${categorytxt}`;
    const query = `SELECT * FROM preguntas_frecuentes ${categorytxt} ${limitTxt} ${offsetTxt}`;
    console.log(query);
    console.log(queryParams);
    try {
      const [data] = await conn.query(query, queryParams);
      const [total] = await conn.query(queryCount);
      return { data, total };
    } catch (e) {
      throw new Error(
        "No se pudieron obtener las preguntas frecuentes, intente de nuevo mas tarde"
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
}

export default new PreguntasFrecuentesModel();
