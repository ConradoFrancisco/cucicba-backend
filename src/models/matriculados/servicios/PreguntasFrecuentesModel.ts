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
    if (category && input) {
      inputTxt = `WHERE pregunta like ?`;
      queryParams.push(input);
      queryParamsCount.push(input);

      categorytxt = `AND categoria_id = ?`;
      queryParams.push(category);
      queryParamsCount.push(category);
    } else if (category) {
      categorytxt = `WHERE categoria_id = ?`;
      queryParams.push(category);
      queryParamsCount.push(category);
    } else if (input) {
      inputTxt = `WHERE pregunta like ?`;
      queryParams.push(input);
      queryParamsCount.push(input);
    }

    if (limit) {
      limitTxt = "LIMIT ?";
      queryParams.push(limit);
      queryParamsCount.push(limit);
      if (offset) {
        offsetTxt = "OFFSET ?";
        queryParams.push(offset);
      }
    }

    const conn = await db.getConnection();

    const query = `SELECT pf.id as pregunta_id, pf.pregunta, pf.estado, pf.respuesta, pfc.titulo AS categoria, pfc.id as categoria_id
    FROM preguntas_frecuentes pf
    INNER JOIN preguntas_frecuentes_categorias pfc ON pf.categoria_id = pfc.id ${inputTxt} ${categorytxt} ${limitTxt} ${offsetTxt}`;
    const queryCount = `SELECT COUNT(*) AS total FROM preguntas_frecuentes ${inputTxt} ${categorytxt} `;
    console.log("queryresults:", query);
    console.log("queryparamsresults:", queryParams);
    console.log("querycant:", queryCount);
    console.log("queryparamscant:", queryParamsCount);
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
    try{
      await conn.query("INSERT INTO preguntas_frecuentes (pregunta,respuesta,categoria_id) VALUES (?,?,?)",[pregunta,respuesta,categoria])
    }catch(e){
      console.log(e)
      throw new Error("Error en la db al ingresar la pregunta frecuente")
    }
  }
}

export default new PreguntasFrecuentesModel();
