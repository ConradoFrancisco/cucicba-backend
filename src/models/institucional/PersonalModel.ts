import { db } from "../../db/Database";

class PersonalModel {
  public async getAll({ limit = undefined,offset=0 }:{limit?:number,offset?:number}) {
    let queryParams: any = [];
    let queryParamsCount: any = [];

    let query = `SELECT p.id, CONCAT(p.nombre, ' ', p.apellido) AS nombre, p.telefono, p.email, p.cargo,p.estado, a.title AS area 
                   FROM personal p 
                   JOIN areas a ON p.area = a.id`;
    let queryCount = `SELECT COUNT(*) AS total FROM personal `;

    if (limit) {
      query += ` LIMIT ?`;
      queryParams.push(limit);
      queryParamsCount.push(limit);
      queryCount += ` LIMIT ?`;
      if (offset) {
        query += ` OFFSET ?`;
        queryParams.push(offset);
      }
    }

    const conn = await db.getConnection();
    try {
      const [data] = await conn.query(query, queryParams);
      const [total] = await conn.query(queryCount, queryParamsCount);
      console.log(data,total)
      return {data,total};
    } catch (e) {
      throw new Error("Hubo un error con la db");
    } finally {
      conn.release();
    }
  }
}

export default new PersonalModel();
