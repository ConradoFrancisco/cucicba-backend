import { db } from "../../../db/Database";

class ServiciosModel {
  public async getAll() {
    const conn = await db.getConnection();

    const query = `SELECT * FROM services Where activo = 1`;

    try {
      const [data] = await conn.query(query);
      return data;
    } catch (e) {
      throw new Error(
        "No se pudieron obtener los servicios, intente de nuevo mas tarde"
      );
    } finally {
      conn.release();
    }
  }
}

export default new ServiciosModel();
