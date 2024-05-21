import { db } from "../../db/Database";
class AreasModel {
  public async getAll() {
    const conn = await db.getConnection();
    try {
      const [data] = await conn.query("SELECT * FROM areas");
      return data;
    } catch (e) {
      throw new Error(
        "no se pudo conectar a la base de datos, intentelo mas tarde"
      );
    } finally {
      conn.release();
    }
  }

  public async create({ title, order }: { title: string; order: number }) {
    const conn = await db.getConnection();
    try {
      await conn.query("INSERT INTO areas (title,orden) VALUES (?,?)", [
        title,
        order,
      ]);
      console.log("ingresado a la db");
    } catch (e) {
      throw (new Error("Error al crear el área"), e);
    } finally {
      conn.release();
    }
  }
}

export default new AreasModel();
