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

  public async setActive({id,estado}:{id:number,estado:number}){
    const conn = await db.getConnection();
    try{
      await conn.query("UPDATE areas SET estado = ? WHERE id = ?",[estado,id])
    } catch (e) {
      throw (new Error("Error al crear el área"), e);
    } finally {
      conn.release();
    }
  }
  public async delete({id}:{id:number}){
    const conn = await db.getConnection();
    try{
      const result = await conn.query("DELETE FROM areas WHERE id = ?",[id])
      
    } catch (e) {
      throw (new Error("Error al eliminar el área"), e);
    } finally {
      conn.release();
    }
  }
}

export default new AreasModel();
