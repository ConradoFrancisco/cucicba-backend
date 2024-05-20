"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = require("../../../db/Database");
class ServiciosModel {
    async getAll() {
        const conn = await Database_1.db.getConnection();
        const query = `SELECT * FROM services Where activo = 1`;
        try {
            const [data] = await conn.query(query);
            return data;
        }
        catch (e) {
            throw new Error("No se pudieron obtener los servicios, intente de nuevo mas tarde");
        }
        finally {
            conn.release();
        }
    }
}
exports.default = new ServiciosModel();
