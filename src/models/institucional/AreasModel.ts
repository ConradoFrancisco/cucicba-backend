import { db } from "../../db/Database";
class AreasModel {
  public async getAll({ limit = undefined, offset = 0, input = undefined, active = undefined }: { limit?: number, offset?: number, active?: number, input?: string }) {
    console.log(active)
    let inputTxt = "";
    let activetxt = "";
    let limitTxt = "";
    let offsetTxt = "";
    let queryParamsCount = [];
    let queryParams = [];
    if (active && input){     
      inputTxt = `WHERE title like ?`
      queryParams.push(input)
      queryParamsCount.push(input);
      activetxt = `AND estado = ?`;
      queryParams.push(active)
      queryParamsCount.push(active);
    }else if(active){
        activetxt = `WHERE estado = ?`;
        queryParams.push(active);
        queryParamsCount.push(active);
    }else if(input){
      inputTxt = `WHERE title like ?`
      queryParams.push(input);
      queryParamsCount.push(input);
    }
    if (limit) {
      limitTxt = "LIMIT ?";
      queryParams.push(limit);
      queryParamsCount.push(limit)
      if (offset) {
        offsetTxt = "OFFSET ?";
        queryParams.push(offset);
      }
    }
    const conn = await db.getConnection();
    try {
      const query = `SELECT * FROM areas ${inputTxt} ${activetxt} ${limitTxt} ${offsetTxt}`;
      console.log(query)
      console.log(queryParams)
      const [data] = await conn.query(query, queryParams)
      const [total] = await conn.query(`SELECT COUNT(*) AS total FROM areas ${inputTxt} ${activetxt}`,queryParamsCount)
      return ({ data, total })
    } catch (e) {
      e
      throw new Error(
        "no se pudo conectar a la base de datos, intentelo mas tarde"
      );
    } finally {
      conn.release();
    }
  }
  
  public async create({ title, orden }: { title: string; orden: number }) {
    const conn = await db.getConnection();
    try {
      await conn.query("INSERT INTO areas (title,orden) VALUES (?,?)", [
        title,
        orden,
      ]);
      console.log("ingresado a la db");
    } catch (e) {
      throw (new Error("Error al crear el área"), e);
    } finally {
      conn.release();
    }
  }

  public async setActive({ id, estado }: { id: number, estado: number }) {
    const conn = await db.getConnection();
    try {
      await conn.query("UPDATE areas SET estado = ? WHERE id = ?", [estado, id])
    } catch (e) {
      throw (new Error("Error al activar el área"), e);
    } finally {
      conn.release();
    }
  }

  public async update({ id, title, orden }: { id: number, title: string, orden: number }) {
    const conn = await db.getConnection();
    try {
      await conn.query("UPDATE areas SET title = ?, orden = ? WHERE id = ?", [title, orden, id])
    } catch (e) {
      throw (new Error("Error al modificar el área"), e);
    } finally {
      conn.release();
    }
  }
  public async delete({ id }: { id: number }) {
    const conn = await db.getConnection();
    try {
      const result = await conn.query("DELETE FROM areas WHERE id = ?", [id])

    } catch (e) {
      throw (new Error("Error al eliminar el área"), e);
    } finally {
      conn.release();
    }
  }
}

export default new AreasModel();
