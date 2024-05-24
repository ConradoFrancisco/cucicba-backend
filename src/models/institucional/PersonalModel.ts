import { db } from "../../db/Database";

class PersonalModel {
  public async getAll({ limit = undefined }) {
    let queryParams: any = [];
    let queryParamsCount: any = [];

    let query = `SELECT p.id, p.name, p.lastname, p.phone, p.email, p.position, a.title AS area 
                   FROM personal p 
                   JOIN areas a ON p.area = a.id`;
    let queryCount = `SELECT COUNT(*) AS total FROM areas `;

    if (limit) {
      query += ` LIMIT ?`;
      queryParams.push(limit);
      queryParamsCount.push(limit);
      queryCount += ` LIMIT ?`;
      
    }

    const conn = await db.getConnection();
    try {
      const [data] = await conn.query(query, queryParams);
      const [total] = await conn.query(queryCount, queryParamsCount);
      return {data,total};
    } catch (e) {
      throw new Error("Hubo un error con la db");
    } finally {
      conn.release();
    }
  }
}

export default new PersonalModel();
