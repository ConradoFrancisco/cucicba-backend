"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = require("../../../db/Database");
class RevistaCucicbaModel {
    async getAll({ offset, limit }) {
        const conn = await Database_1.db.getConnection();
        try {
            if (offset) {
                const [data, info] = await conn.query("SELECT * FROM revista LIMIT = ? OFFSET = ?", [limit, offset]);
                console.log(data);
                return data;
            }
            else {
                const [data, info] = await conn.query("SELECT * FROM revista LIMIT = ?", [limit]);
                console.log(data);
                return data;
            }
        }
        catch (e) {
            throw new Error("No se pudieron obtener las revistas, intente de nuevo mas tarde");
        }
        finally {
            conn.release();
        }
    }
}
exports.default = new RevistaCucicbaModel();
