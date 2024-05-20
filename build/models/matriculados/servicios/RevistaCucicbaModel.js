"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = require("../../../db/Database");
class RevistaCucicbaModel {
    async getAll({ offset = 0, limit = 12, }) {
        console.log(offset);
        const conn = await Database_1.db.getConnection();
        try {
            const [data] = await conn.query("SELECT * FROM revista LIMIT ? OFFSET ?", [limit, offset]);
            const [countResult] = await conn.query("SELECT COUNT(*) AS total FROM revista");
            const total = countResult;
            return { data, total };
        }
        catch (e) {
            throw new Error("No se pudieron obtener las revistas, intente de nuevo más tarde");
        }
        finally {
            conn.release();
        }
    }
}
exports.default = new RevistaCucicbaModel();
