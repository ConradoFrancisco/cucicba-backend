import { db } from "../../../db/Database";

class RevistaCucicbaModel {
  async getAll({
    offset = 0,
    limit = 12,
  }: {
    offset?: number;
    limit?: number;
  }) {
    const conn = await db.getConnection();
    try {
      if (offset) {
        const [data, info] = await conn.query(
          "SELECT * FROM revista LIMIT ? OFFSET ?",
          [limit, offset]
        );

        return data;
      } else {
        const [data, info] = await conn.query("SELECT * FROM revista LIMIT ?", [
          limit,
        ]);

        return data;
      }
    } catch (e) {
      throw new Error(
        "No se pudieron obtener las revistas, intente de nuevo mas tarde"
      );
    } finally {
      conn.release();
    }
  }
}
export default new RevistaCucicbaModel();
