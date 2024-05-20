import { db } from "../../../db/Database";

class RevistaCucicbaModel {
  async getAll({
    offset = 0,
    limit = 12,
  }: {
    offset?: number;
    limit?: number;
  }) {
    console.log(offset);
    const conn = await db.getConnection();
    try {
      const [data] = await conn.query(
        "SELECT * FROM revista LIMIT ? OFFSET ?",
        [limit, offset]
      );
      const [countResult] = await conn.query(
        "SELECT COUNT(*) AS total FROM revista"
      );
      const total = countResult;
      return { data, total };
    } catch (e) {
      throw new Error(
        "No se pudieron obtener las revistas, intente de nuevo más tarde"
      );
    } finally {
      conn.release();
    }
  }
}
export default new RevistaCucicbaModel();
